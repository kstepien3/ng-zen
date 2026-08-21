import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { DrawerGesture, GestureCallbacks } from './drawer-gesture';

const W = 384;

function mockCb(): GestureCallbacks & { el: { style: Record<string, string> } } {
  const el = { style: {} as Record<string, string> };

  return {
    el,
    onOpenChange: vi.fn(),
    setDragStyle: vi.fn((_cssVar: string, value: string) => {
      el.style[_cssVar] = value;
    }),
    removeDragStyle: vi.fn((cssVar: string) => {
      delete el.style[cssVar];
    }),
    getDimension: vi.fn(() => W),
    setPointerCapture: vi.fn(),
    setAttribute: vi.fn(),
    removeAttribute: vi.fn(),
    setOverscrollStyle: vi.fn((sizePx: number) => {
      el.style['width'] = `${sizePx}px`;
    }),
    removeOverscrollStyle: vi.fn(() => {
      delete el.style['width'];
    }),
  };
}

function down(g: DrawerGesture, x: number, cb: GestureCallbacks): void {
  g.pointerDown({ clientX: x, clientY: 200, pointerId: 1, button: 0 } as PointerEvent, 'right', false, cb);
}

function move(g: DrawerGesture, x: number, cb: GestureCallbacks): void {
  g.pointerMove({ clientX: x, clientY: 200 } as PointerEvent, 'right', false, cb);
}

function up(g: DrawerGesture, cb: GestureCallbacks): void {
  g.pointerUp(1, 'right', false, cb);
}

function downBottom(g: DrawerGesture, y: number, cb: GestureCallbacks): void {
  g.pointerDown({ clientX: 300, clientY: y, pointerId: 1, button: 0 } as PointerEvent, 'bottom', true, cb);
}

function moveBottom(g: DrawerGesture, y: number, cb: GestureCallbacks): void {
  g.pointerMove({ clientX: 300, clientY: y } as PointerEvent, 'bottom', true, cb);
}

function upBottom(g: DrawerGesture, cb: GestureCallbacks): void {
  g.pointerUp(1, 'bottom', true, cb);
}

describe('DrawerGesture', () => {
  describe('overscroll → close reversal', () => {
    it('overscroll extends width, not translate', () => {
      const g = new DrawerGesture();
      const cb = mockCb();

      down(g, 500, cb);
      move(g, 400, cb); // -100px into page

      expect(cb.el.style['width']).toBeTruthy();
      expect(cb.el.style['--zen-drawer-drag']).toBeUndefined();
    });

    it('reversal closes without width jump', () => {
      const g = new DrawerGesture();
      const cb = mockCb();

      // Overscroll deep
      down(g, 500, cb);
      move(g, 400, cb); // -100px
      const w1 = parseFloat(cb.el.style['width'] ?? '0');
      expect(w1).toBeGreaterThan(W);

      // Partial reversal — still overscroll side
      move(g, 480, cb); // -20px
      const w2 = parseFloat(cb.el.style['width'] ?? '0');
      // Width should NOT snap up to peak — should shrink from w1
      expect(w2).toBeLessThanOrEqual(w1);

      // Cross into close side
      move(g, 510, cb); // +10px
      // Now in close mode: width removed, translate set
      expect(cb.el.style['width']).toBeUndefined();
      expect(cb.el.style['--zen-drawer-drag']).toBeDefined();
    });

    it('close translate is 1:1 with pointer', () => {
      const g = new DrawerGesture();
      const cb = mockCb();

      down(g, 500, cb);
      move(g, 530, cb); // +30

      const pct = parseFloat(cb.el.style['--zen-drawer-drag'] ?? '0');
      expect(pct).toBeCloseTo((30 / W) * 100, 2);
    });

    it('release during overscroll stays open', () => {
      const g = new DrawerGesture();
      const cb = mockCb();

      down(g, 500, cb);
      move(g, 400, cb); // overscroll
      up(g, cb);

      expect(cb.onOpenChange).not.toHaveBeenCalled();
      expect(cb.el.style['width']).toBeUndefined();
      expect(cb.el.style['--zen-drawer-drag']).toBeUndefined();
    });
  });

  describe('snap dragging', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(0);
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('slow drag up from first snap snaps to nearest higher snap', () => {
      const g = new DrawerGesture();
      const cb = mockCb();

      g.resolveSnapPoints(['300', '600', '900']);
      g.initSnapHeight(); // 300 (first snap)

      downBottom(g, 300, cb);

      // Drag up: move to lower Y values → increases height
      for (let i = 1; i <= 10; i++) {
        vi.advanceTimersByTime(100);
        moveBottom(g, 300 - i * 20, cb);
      }
      vi.advanceTimersByTime(100);
      upBottom(g, cb);

      expect(cb.onOpenChange).not.toHaveBeenCalled();
      expect(cb.el.style['--zen-drawer-height']).toBe('600px');
    });

    it('fast fling up from first snap snaps to nearest higher snap', () => {
      const g = new DrawerGesture();
      const cb = mockCb();

      g.resolveSnapPoints(['300', '600', '900']);
      g.initSnapHeight(); // 300

      downBottom(g, 300, cb);

      for (let i = 1; i <= 5; i++) {
        vi.advanceTimersByTime(5);
        moveBottom(g, 300 - i * 100, cb);
      }
      vi.advanceTimersByTime(5);
      upBottom(g, cb);

      expect(cb.onOpenChange).not.toHaveBeenCalled();
      expect(cb.el.style['--zen-drawer-height']).toBe('900px');
    });

    it('drag down below lowest snap closes', () => {
      const g = new DrawerGesture();
      const cb = mockCb();

      g.resolveSnapPoints(['300', '600', '900']);
      g.initSnapHeight(); // 300

      downBottom(g, 300, cb);

      for (let i = 1; i <= 8; i++) {
        vi.advanceTimersByTime(100);
        moveBottom(g, 300 + i * 100, cb);
      }
      vi.advanceTimersByTime(100);
      upBottom(g, cb);

      expect(cb.onOpenChange).toHaveBeenCalledWith(false);
    });

    it('drag down partially then release snaps back', () => {
      const g = new DrawerGesture();
      const cb = mockCb();

      g.resolveSnapPoints(['300', '600', '900']);
      g.initSnapHeight(); // 300

      downBottom(g, 300, cb);

      // Drag down 50px → height = 250, below lowest snap (300) → closes
      moveBottom(g, 350, cb);
      vi.advanceTimersByTime(100);
      upBottom(g, cb);

      expect(cb.onOpenChange).toHaveBeenCalledWith(false);
    });

    it('drag up from lowest then down snaps back to lowest', () => {
      const g = new DrawerGesture();
      const cb = mockCb();

      g.resolveSnapPoints(['300', '600', '900']);
      g.initSnapHeight(); // 300

      downBottom(g, 300, cb);

      // Drag up 100px → height = 400
      moveBottom(g, 200, cb);
      // Drag back to where height is between snaps → snaps to nearest (300)
      moveBottom(g, 260, cb); // dy=-40, newHeight=340, nearest snap=300
      vi.advanceTimersByTime(100);
      upBottom(g, cb);

      expect(cb.onOpenChange).not.toHaveBeenCalled();
      expect(cb.el.style['--zen-drawer-height']).toBe('300px');
    });
  });

  describe('initSnapHeight', () => {
    it('defaults to first snap when no initial provided', () => {
      const g = new DrawerGesture();
      g.resolveSnapPoints(['300', '600', '900']);
      expect(g.initSnapHeight()).toBe(300);
      expect(g.snapHeight).toBe(300);
    });

    it('opens at first snap with mixed values', () => {
      const g = new DrawerGesture();
      g.resolveSnapPoints(['600', '900']);
      expect(g.initSnapHeight()).toBe(600);
    });

    it('returns 0 when no snaps defined', () => {
      const g = new DrawerGesture();
      expect(g.initSnapHeight()).toBe(0);
    });
  });
});
