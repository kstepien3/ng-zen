import { DrawerSide, GestureCallbacks } from './drawer.types';

const FLING_VELOCITY_THRESHOLD = 0.5;
const CLOSE_THRESHOLD_RATIO = 0.3;
const CLOSE_THRESHOLD_MIN = 80;
const LOCK_THRESHOLD = 5;

const OVERSCROLL_DAMP_RATE = 0.003;
const OVERSCROLL_MAX_CAP = 120;

export class DrawerGesture {
  private startX = 0;
  private startY = 0;
  private dragCandidate = false;
  private dragLocked = false;
  private offset = 0;
  private startTime = 0;
  private lastMoveTime = 0;
  private lastMoveX = 0;
  private lastMoveY = 0;
  private restDimension = 0;

  get isLocked(): boolean {
    return this.dragLocked;
  }

  pointerDown(event: PointerEvent, side: DrawerSide, cb: GestureCallbacks): void {
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
  }

  pointerMove(event: PointerEvent, side: DrawerSide, cb: GestureCallbacks): void {
    if (!this.dragCandidate) return;

    const dx = event.clientX - this.startX;
    const dy = event.clientY - this.startY;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (!this.dragLocked) {
      if (absDx < LOCK_THRESHOLD && absDy < LOCK_THRESHOLD) return;

      const isHorizontal = absDx > absDy;
      const sideAxis = side === 'left' || side === 'right' ? 'x' : 'y';
      const movementAxis = isHorizontal ? 'x' : 'y';

      if (sideAxis !== movementAxis) {
        this.dragCandidate = false;
        return;
      }

      this.dragLocked = true;
      cb.setPointerCapture(event.pointerId);
      cb.setAttribute('data-swiping', '');
    }

    this.lastMoveTime = Date.now();
    this.lastMoveX = event.clientX;
    this.lastMoveY = event.clientY;

    this.transformDrag(dx, dy, side, cb);
  }

  pointerUp(pointerId: number, side: DrawerSide, cb: GestureCallbacks): void {
    if (!this.dragLocked) {
      this.dragCandidate = false;
      return;
    }

    const velocity = this.computeVelocity();
    this.finishDrag(side, velocity, cb);
  }

  pointerCancel(pointerId: number, side: DrawerSide, cb: GestureCallbacks): void {
    if (!this.dragLocked) {
      this.dragCandidate = false;
      return;
    }
    this.finishDrag(side, { x: 0, y: 0 }, cb);
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

  private dampOverscroll(dist: number): number {
    const maxOverscroll = Math.min(OVERSCROLL_MAX_CAP, this.restDimension * 0.25);
    return maxOverscroll * (1 - Math.exp(-dist * OVERSCROLL_DAMP_RATE));
  }

  private finishDrag(side: DrawerSide, velocity: { x: number; y: number }, cb: GestureCallbacks): void {
    cb.removeAttribute('data-swiping');
    cb.removeOverscrollStyle();

    const dimension = cb.getDimension();
    const threshold = Math.max(CLOSE_THRESHOLD_MIN, dimension * CLOSE_THRESHOLD_RATIO);
    const flingInCloseDirection = this.isFlingInCloseDirection(side, velocity);

    if (this.offset >= threshold || flingInCloseDirection) {
      cb.onOpenChange(false);
    } else {
      cb.removeDragStyle('--zen-drawer-drag');
    }

    this.dragCandidate = false;
    this.dragLocked = false;
    this.offset = 0;
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
}
