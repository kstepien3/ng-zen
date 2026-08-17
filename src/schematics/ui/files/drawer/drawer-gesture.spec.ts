import { describe, expect, it, vi } from 'vitest';

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
});
