type DrawerSide = 'left' | 'right' | 'top' | 'bottom';

interface GestureCallbacks {
  readonly onOpenChange: (open: boolean) => void;
  readonly setDragStyle: (cssVar: string, value: string) => void;
  readonly removeDragStyle: (cssVar: string) => void;
  readonly getDimension: () => number;
  readonly setPointerCapture: (pointerId: number) => void;
  readonly setAttribute: (name: string, value: string) => void;
  readonly removeAttribute: (name: string) => void;
  readonly setOverscrollStyle: (sizePx: number) => void;
  readonly removeOverscrollStyle: () => void;
}

const FLING_VELOCITY_THRESHOLD = 0.5;
const CLOSE_THRESHOLD_RATIO = 0.3;
const CLOSE_THRESHOLD_MIN = 80;
const LOCK_THRESHOLD = 5;

const OVERSCROLL_DAMP_RATE = 0.003;
const OVERSCROLL_MAX_CAP = 120;

class DrawerGesture {
  private startX = 0;
  private startY = 0;
  private dragCandidate = false;
  private dragLocked = false;
  private offset = 0;
  private startTime = 0;
  private lastMoveTime = 0;
  private lastMoveX = 0;
  private lastMoveY = 0;
  private baseHeight = 0;
  private restDimension = 0;
  private currentSnapHeight = 0;
  private sortedSnapPixels: number[] = [];

  get isLocked(): boolean {
    return this.dragLocked;
  }

  get snapHeight(): number {
    return this.currentSnapHeight;
  }

  get hasSnaps(): boolean {
    return this.sortedSnapPixels.length > 0;
  }

  get maxSnap(): number {
    if (this.sortedSnapPixels.length === 0) return 0;
    return this.sortedSnapPixels[this.sortedSnapPixels.length - 1];
  }

  pointerDown(event: PointerEvent, side: DrawerSide, isVertical: boolean, cb: GestureCallbacks): void {
    cb.setPointerCapture(event.pointerId);
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.dragCandidate = true;
    this.dragLocked = false;
    this.offset = 0;
    this.startTime = Date.now();
    this.lastMoveTime = this.startTime;
    this.lastMoveX = event.clientX;
    this.lastMoveY = event.clientY;
    this.restDimension = cb.getDimension();

    if (isVertical && this.sortedSnapPixels.length > 0) {
      this.baseHeight = this.currentSnapHeight;
    }
  }

  pointerMove(event: PointerEvent, side: DrawerSide, isVertical: boolean, cb: GestureCallbacks): { handled: boolean } {
    if (!this.dragCandidate) return { handled: false };

    const dx = event.clientX - this.startX;
    const dy = event.clientY - this.startY;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (!this.dragLocked) {
      if (absDx < LOCK_THRESHOLD && absDy < LOCK_THRESHOLD) return { handled: false };

      const isHorizontal = absDx > absDy;
      const sideAxis = side === 'left' || side === 'right' ? 'x' : 'y';
      const movementAxis = isHorizontal ? 'x' : 'y';

      if (sideAxis !== movementAxis) {
        this.dragCandidate = false;
        return { handled: false };
      }

      this.dragLocked = true;
      cb.setAttribute('data-swiping', '');
    }

    this.lastMoveTime = Date.now();
    this.lastMoveX = event.clientX;
    this.lastMoveY = event.clientY;

    if (isVertical && this.sortedSnapPixels.length > 0) {
      this.verticalSnapDrag(dy, side, cb);
    } else {
      this.transformDrag(dx, dy, side, cb);
    }

    return { handled: true };
  }

  pointerUp(pointerId: number, side: DrawerSide, isVertical: boolean, cb: GestureCallbacks): void {
    if (!this.dragLocked) {
      this.dragCandidate = false;
      return;
    }

    const velocity = this.computeVelocity();
    this.finishDrag(side, isVertical, velocity, cb);
  }

  pointerCancel(pointerId: number, side: DrawerSide, isVertical: boolean, cb: GestureCallbacks): void {
    if (!this.dragLocked) {
      this.dragCandidate = false;
      return;
    }
    this.finishDrag(side, isVertical, { x: 0, y: 0 }, cb);
  }

  resolveSnapPoints(snapPoints: (number | string)[]): number[] {
    const vh = window.innerHeight;
    this.sortedSnapPixels = snapPoints
      .map(snap => {
        if (typeof snap === 'string') {
          const px = parseFloat(snap);
          return Number.isNaN(px) ? 0 : px;
        }
        return snap <= 1 ? snap * vh : snap;
      })
      .filter(px => px > 0)
      .sort((a, b) => a - b);
    return this.sortedSnapPixels;
  }

  initSnapHeight(initial?: number | string): number {
    if (this.sortedSnapPixels.length === 0) return 0;
    const maxSnap = this.sortedSnapPixels[this.sortedSnapPixels.length - 1];
    let target = maxSnap;

    if (initial !== undefined) {
      const vh = window.innerHeight;
      const px = typeof initial === 'string' ? parseFloat(initial) : initial <= 1 ? initial * vh : initial;
      target = this.findNearestSnap(px);
    }

    this.currentSnapHeight = target;
    return target;
  }

  private transformDrag(dx: number, dy: number, side: DrawerSide, cb: GestureCallbacks): void {
    let closeDist: number;

    switch (side) {
      case 'right':
        closeDist = dx;
        break;
      case 'left':
        closeDist = -dx;
        break;
      case 'bottom':
        closeDist = dy;
        break;
      case 'top':
        closeDist = -dy;
        break;
    }

    if (closeDist < 0) {
      const ext = this.dampOverscroll(-closeDist);
      this.offset = 0;
      cb.removeDragStyle('--zen-drawer-drag');
      cb.setOverscrollStyle(this.restDimension + ext);
    } else {
      this.offset = closeDist;
      cb.removeOverscrollStyle();
      cb.setDragStyle('--zen-drawer-drag', `${(closeDist / this.restDimension) * 100}%`);
    }
  }

  private verticalSnapDrag(dy: number, side: DrawerSide, cb: GestureCallbacks): void {
    const closeDelta = side === 'bottom' ? dy : -dy;
    const newHeight = this.baseHeight - closeDelta;

    if (newHeight > this.maxSnap) {
      const ext = this.dampOverscroll(newHeight - this.maxSnap);
      this.currentSnapHeight = this.maxSnap;
      cb.setOverscrollStyle(this.maxSnap + ext);
      cb.removeDragStyle('--zen-drawer-drag');
    } else {
      this.currentSnapHeight = Math.max(0, newHeight);
      cb.removeOverscrollStyle();
      cb.setDragStyle('--zen-drawer-height', `${this.currentSnapHeight}px`);
    }

    this.offset = Math.abs(closeDelta);
  }

  private dampOverscroll(dist: number): number {
    const maxOverscroll = Math.min(OVERSCROLL_MAX_CAP, this.restDimension * 0.25);
    return maxOverscroll * (1 - Math.exp(-dist * OVERSCROLL_DAMP_RATE));
  }

  private finishDrag(
    side: DrawerSide,
    isVertical: boolean,
    velocity: { x: number; y: number },
    cb: GestureCallbacks
  ): void {
    cb.removeAttribute('data-swiping');
    cb.removeOverscrollStyle();

    const hasSnaps = isVertical && this.sortedSnapPixels.length > 0;

    if (!hasSnaps) {
      const dimension = cb.getDimension();
      const threshold = Math.max(CLOSE_THRESHOLD_MIN, dimension * CLOSE_THRESHOLD_RATIO);
      const flingInCloseDirection = this.isFlingInCloseDirection(side, velocity);

      if (this.offset >= threshold || flingInCloseDirection) {
        cb.onOpenChange(false);
      } else {
        cb.removeDragStyle('--zen-drawer-drag');
      }
    } else {
      const lowestSnap = this.sortedSnapPixels[0];

      if (this.currentSnapHeight < lowestSnap) {
        cb.onOpenChange(false);
      } else {
        const targetSnap = this.findNearestSnap(this.currentSnapHeight);
        this.currentSnapHeight = targetSnap;
        cb.setDragStyle('--zen-drawer-height', `${targetSnap}px`);
      }
    }

    this.dragCandidate = false;
    this.dragLocked = false;
    this.offset = 0;
    this.baseHeight = 0;
    this.restDimension = 0;
  }

  private computeVelocity(): { x: number; y: number } {
    const dt = this.lastMoveTime - this.startTime;
    if (dt <= 0) return { x: 0, y: 0 };
    return {
      x: (this.lastMoveX - this.startX) / dt,
      y: (this.lastMoveY - this.startY) / dt,
    };
  }

  private isFlingInCloseDirection(side: DrawerSide, velocity: { x: number; y: number }): boolean {
    const v = FLING_VELOCITY_THRESHOLD;
    if (side === 'right') return velocity.x > v;
    if (side === 'left') return velocity.x < -v;
    if (side === 'bottom') return velocity.y > v;
    if (side === 'top') return velocity.y < -v;
    return false;
  }

  private maxSnapHeight(): number {
    return this.sortedSnapPixels.length > 0
      ? this.sortedSnapPixels[this.sortedSnapPixels.length - 1]
      : window.innerHeight * 0.9;
  }

  private findNearestSnap(currentHeight: number): number {
    if (this.sortedSnapPixels.length === 0) return currentHeight;

    let nearest = this.sortedSnapPixels[0];
    let minDist = Math.abs(currentHeight - nearest);

    for (const snap of this.sortedSnapPixels) {
      const dist = Math.abs(currentHeight - snap);
      if (dist < minDist) {
        minDist = dist;
        nearest = snap;
      }
    }

    return nearest;
  }
}

export type { GestureCallbacks };
export { DrawerGesture };
