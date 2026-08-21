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
  private baseDimension = 0;
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

    if (this.sortedSnapPixels.length > 0) {
      this.baseDimension = this.currentSnapHeight;
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
      cb.setPointerCapture(event.pointerId);
      cb.setAttribute('data-swiping', '');
    }

    this.lastMoveTime = Date.now();
    this.lastMoveX = event.clientX;
    this.lastMoveY = event.clientY;

    if (this.sortedSnapPixels.length > 0) {
      this.snapDrag(dx, dy, side, isVertical, cb);
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

  resolveSnapPoints(snapPoints: (number | string)[], isVertical = true): number[] {
    const dim = isVertical ? window.innerHeight : window.innerWidth;
    this.sortedSnapPixels = snapPoints
      .map(snap => {
        if (typeof snap === 'string') {
          const px = parseFloat(snap);
          return Number.isNaN(px) ? 0 : px;
        }
        return snap <= 1 ? snap * dim : snap;
      })
      .filter(px => px > 0)
      .sort((a, b) => a - b);
    return this.sortedSnapPixels;
  }

  initSnapHeight(): number {
    if (this.sortedSnapPixels.length === 0) return 0;
    const firstSnap = this.sortedSnapPixels[0];
    this.currentSnapHeight = firstSnap;
    return firstSnap;
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

  private snapDrag(dx: number, dy: number, side: DrawerSide, isVertical: boolean, cb: GestureCallbacks): void {
    let closeDelta: number;

    switch (side) {
      case 'bottom':
        closeDelta = dy;
        break;
      case 'top':
        closeDelta = -dy;
        break;
      case 'right':
        closeDelta = dx;
        break;
      case 'left':
        closeDelta = -dx;
        break;
    }

    const newDimension = this.baseDimension - closeDelta;
    const cssVar = isVertical ? '--zen-drawer-height' : '--zen-drawer-width';
    const lowestSnap = this.sortedSnapPixels[0];

    if (newDimension > this.maxSnap) {
      const ext = this.dampOverscroll(newDimension - this.maxSnap);
      this.currentSnapHeight = this.maxSnap;
      cb.setOverscrollStyle(this.maxSnap + ext);
      cb.removeDragStyle('--zen-drawer-drag');
    } else if (newDimension < lowestSnap) {
      this.currentSnapHeight = newDimension;
      const slidePx = lowestSnap - newDimension;
      cb.removeOverscrollStyle();
      cb.setDragStyle(cssVar, `${lowestSnap}px`);
      cb.setDragStyle('--zen-drawer-drag', `${slidePx}px`);
    } else {
      this.currentSnapHeight = newDimension;
      cb.removeOverscrollStyle();
      cb.removeDragStyle('--zen-drawer-drag');
      cb.setDragStyle(cssVar, `${newDimension}px`);
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

    const hasSnaps = this.sortedSnapPixels.length > 0;

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
      const cssVar = isVertical ? '--zen-drawer-height' : '--zen-drawer-width';
      const flingInCloseDirection = this.isFlingInCloseDirection(side, velocity);
      const flingInOpenDirection = this.isFlingInOpenDirection(side, velocity);

      const isBelowLowestThreshold = this.currentSnapHeight < lowestSnap * 0.6;
      const isFlingFromLowest = flingInCloseDirection && this.baseDimension <= lowestSnap + 10;
      const isBelowLowestWithFling = flingInCloseDirection && this.currentSnapHeight < lowestSnap;

      if (isBelowLowestThreshold || isFlingFromLowest || isBelowLowestWithFling) {
        cb.onOpenChange(false);
      } else {
        let targetSnap: number;

        if (flingInCloseDirection) {
          const lowerSnaps = this.sortedSnapPixels.filter(s => s < this.baseDimension - 5);
          targetSnap = lowerSnaps.length > 0 ? lowerSnaps[lowerSnaps.length - 1] : lowestSnap;
        } else if (flingInOpenDirection) {
          const higherSnaps = this.sortedSnapPixels.filter(s => s > this.baseDimension + 5);
          targetSnap = higherSnaps.length > 0 ? higherSnaps[0] : this.maxSnap;
        } else {
          targetSnap = this.findNearestSnap(this.currentSnapHeight);
        }

        this.currentSnapHeight = targetSnap;
        cb.setDragStyle(cssVar, `${targetSnap}px`);
        cb.removeDragStyle('--zen-drawer-drag');
      }
    }

    this.dragCandidate = false;
    this.dragLocked = false;
    this.offset = 0;
    this.baseDimension = 0;
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

  private isFlingInOpenDirection(side: DrawerSide, velocity: { x: number; y: number }): boolean {
    const v = FLING_VELOCITY_THRESHOLD;
    if (side === 'right') return velocity.x < -v;
    if (side === 'left') return velocity.x > v;
    if (side === 'bottom') return velocity.y < -v;
    if (side === 'top') return velocity.y > v;
    return false;
  }

  private findNearestSnap(currentDimension: number): number {
    if (this.sortedSnapPixels.length === 0) return currentDimension;

    let nearest = this.sortedSnapPixels[0];
    let minDist = Math.abs(currentDimension - nearest);

    for (const snap of this.sortedSnapPixels) {
      const dist = Math.abs(currentDimension - snap);
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
