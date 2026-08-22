import { describe, expect, it, vi } from 'vitest';

import { GestureCallbacks } from './drawer.types';
import { DrawerGesture } from './drawer-gesture';

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
  g.pointerDown({ clientX: x, clientY: 200, pointerId: 1, button: 0 } as PointerEvent, 'right', cb);
}

function move(g: DrawerGesture, x: number, cb: GestureCallbacks): void {
  g.pointerMove({ clientX: x, clientY: 200 } as PointerEvent, 'right', cb);
}

function up(g: DrawerGesture, cb: GestureCallbacks): void {
  g.pointerUp(1, 'right', cb);
}

describe('DrawerGesture', () => {
  describe('overscroll → close reversal', () => {
    it('overscroll extends width, not translate', () => {
      const g = new DrawerGesture();
      const cb = mockCb();

      down(g, 500, cb);
      move(g, 400, cb);

      expect(cb.el.style['width']).toBeTruthy();
      expect(cb.el.style['--zen-drawer-drag']).toBeUndefined();
    });

    it('reversal closes without width jump', () => {
      const g = new DrawerGesture();
      const cb = mockCb();

      down(g, 500, cb);
      move(g, 400, cb);
      const w1 = parseFloat(cb.el.style['width'] ?? '0');
      expect(w1).toBeGreaterThan(W);

      move(g, 480, cb);
      const w2 = parseFloat(cb.el.style['width'] ?? '0');
      expect(w2).toBeLessThanOrEqual(w1);

      move(g, 510, cb);
      expect(cb.el.style['width']).toBeUndefined();
      expect(cb.el.style['--zen-drawer-drag']).toBeDefined();
    });

    it('close translate is 1:1 with pointer', () => {
      const g = new DrawerGesture();
      const cb = mockCb();

      down(g, 500, cb);
      move(g, 530, cb);

      const pct = parseFloat(cb.el.style['--zen-drawer-drag'] ?? '0');
      expect(pct).toBeCloseTo((30 / W) * 100, 2);
    });

    it('release during overscroll stays open', () => {
      const g = new DrawerGesture();
      const cb = mockCb();

      down(g, 500, cb);
      move(g, 400, cb);
      up(g, cb);

      expect(cb.onOpenChange).not.toHaveBeenCalled();
      expect(cb.el.style['width']).toBeUndefined();
      expect(cb.el.style['--zen-drawer-drag']).toBeUndefined();
    });
  });
});
