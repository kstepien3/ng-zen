type DrawerSide = 'left' | 'right' | 'top' | 'bottom';

interface GestureCallbacks {
  readonly onOpenChange: (open: boolean) => void;
  readonly setDragStyle: (cssVar: string, value: string) => void;
  readonly removeDragStyle: (cssVar: string) => void;
  readonly getDimension: () => number;
  readonly setPointerCapture: (pointerId: number) => void;
  readonly releasePointerCapture: (pointerId: number) => void;
  readonly setAttribute: (name: string, value: string) => void;
  readonly removeAttribute: (name: string) => void;
}

const FLING_VELOCITY_THRESHOLD = 0.5;
const CLOSE_THRESHOLD_RATIO = 0.3;
const CLOSE_THRESHOLD_MIN = 80;
const LOCK_THRESHOLD = 5;

class DrawerGesture {
  private startX = 0;
  private startY = 0;
  private dragCandidate = false;
  private dragLocked = false;
  private offset = 0;
  private lastMoveTime = 0;
  private lastMoveX = 0;
  private lastMoveY = 0;
  private baseHeight = 0;
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

  onPointerDown(event: PointerEvent, side: DrawerSide, isVertical: boolean): void {
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.dragCandidate = true;
    this.dragLocked = false;
    this.offset = 0;
    this.lastMoveTime = Date.now();
    this.lastMoveX = event.clientX;
    this.lastMoveY = event.clientY;

    if (isVertical && this.sortedSnapPixels.length > 0) {
      this.baseHeight = this.currentSnapHeight;
    }
  }

  onPointerMove(
    event: PointerEvent,
    side: DrawerSide,
    isVertical: boolean,
    cb: GestureCallbacks
  ): { handled: boolean } {
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
      this.handleVerticalSnapDrag(dy, side, cb);
    } else {
      this.handleTransformDrag(dx, dy, side, cb);
    }

    return { handled: true };
  }

  onPointerUp(pointerId: number, side: DrawerSide, isVertical: boolean, cb: GestureCallbacks): void {
    if (!this.dragLocked) {
      this.dragCandidate = false;
      return;
    }

    const velocity = this.computeVelocity();
    this.finishDrag(pointerId, side, isVertical, velocity, cb);
  }

  onPointerCancel(pointerId: number, side: DrawerSide, isVertical: boolean, cb: GestureCallbacks): void {
    if (!this.dragLocked) {
      this.dragCandidate = false;
      return;
    }
    this.finishDrag(pointerId, side, isVertical, { x: 0, y: 0 }, cb);
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

  initSnapHeight(): number {
    if (this.sortedSnapPixels.length === 0) return 0;
    const maxSnap = this.sortedSnapPixels[this.sortedSnapPixels.length - 1];
    this.currentSnapHeight = maxSnap;
    return maxSnap;
  }

  private handleTransformDrag(dx: number, dy: number, side: DrawerSide, cb: GestureCallbacks): void {
    if (side === 'right') this.offset = Math.max(0, dx);
    else if (side === 'left') this.offset = Math.max(0, -dx);
    else if (side === 'bottom') this.offset = Math.max(0, dy);
    else if (side === 'top') this.offset = Math.max(0, -dy);

    const dimension = cb.getDimension();
    this.offset = Math.min(this.offset, dimension);

    const pct = (this.offset / dimension) * 100;
    cb.setDragStyle('--zen-drawer-drag', `${pct}%`);
  }

  private handleVerticalSnapDrag(dy: number, side: DrawerSide, cb: GestureCallbacks): void {
    const closeDelta = side === 'bottom' ? dy : -dy;
    const newHeight = Math.max(0, this.baseHeight - closeDelta);
    const maxHeight = this.maxSnapHeight();

    this.currentSnapHeight = Math.min(newHeight, maxHeight);
    cb.setDragStyle('--zen-drawer-height', `${this.currentSnapHeight}px`);
    this.offset = Math.abs(closeDelta);
  }

  private finishDrag(
    pointerId: number,
    side: DrawerSide,
    isVertical: boolean,
    velocity: { x: number; y: number },
    cb: GestureCallbacks
  ): void {
    cb.removeAttribute('data-swiping');
    cb.releasePointerCapture(pointerId);

    const hasSnaps = isVertical && this.sortedSnapPixels.length > 0;
    const flingInCloseDirection = this.isFlingInCloseDirection(side, velocity);

    if (!hasSnaps) {
      const dimension = cb.getDimension();
      const threshold = Math.max(CLOSE_THRESHOLD_MIN, dimension * CLOSE_THRESHOLD_RATIO);

      if (this.offset >= threshold || flingInCloseDirection) {
        cb.onOpenChange(false);
      } else {
        cb.removeDragStyle('--zen-drawer-drag');
      }
    } else if (flingInCloseDirection) {
      cb.onOpenChange(false);
    } else {
      const targetSnap = this.findNearestSnap(this.currentSnapHeight);
      this.currentSnapHeight = targetSnap;
      cb.setDragStyle('--zen-drawer-height', `${targetSnap}px`);
    }

    this.dragCandidate = false;
    this.dragLocked = false;
    this.offset = 0;
    this.baseHeight = 0;
  }

  private computeVelocity(): { x: number; y: number } {
    const dt = Date.now() - this.lastMoveTime;
    if (dt === 0) return { x: 0, y: 0 };
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
