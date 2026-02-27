import { Component, input, output, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ZenDialog } from './dialog';
import { ZenDialogService } from './dialog.service';

@Component({
  template: `
    <dialog [header]="header()" [size]="size()" [(open)]="isOpen" zen-dialog>
      <p>Dialog content</p>
    </dialog>
  `,
  standalone: true,
  imports: [ZenDialog],
})
class DialogTestComponent {
  readonly isOpen = signal(false);
  readonly header = signal('Test Dialog');
  readonly size = signal<'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');
}

@Component({
  template: `
    <p>{{ message() }}</p>
    <button (click)="onConfirm()">Confirm</button>
    <button (click)="onCancel()">Cancel</button>
  `,
  standalone: true,
})
class TestDialogContent {
  readonly message = input.required<string>();
  readonly confirmClick = output<string>();
  readonly cancelClick = output<void>();

  onConfirm(): void {
    this.confirmClick.emit('confirmed');
  }

  onCancel(): void {
    this.cancelClick.emit();
  }
}

function getDialogEl(fixture: ComponentFixture<unknown>): HTMLDialogElement | null {
  return fixture.nativeElement.querySelector('dialog[zen-dialog]') as HTMLDialogElement | null;
}

function getDialogElFromBody(): HTMLDialogElement | null {
  return document.body.querySelector('dialog[zen-dialog]') as HTMLDialogElement | null;
}

describe('ZenDialog', () => {
  beforeEach(async () => {
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
  });

  describe('Component usage', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [DialogTestComponent],
        providers: [provideZonelessChangeDetection()],
      }).compileComponents();
    });

    it('should create', () => {
      const fixture = TestBed.createComponent(DialogTestComponent);
      fixture.detectChanges();
      expect(getDialogEl(fixture)).toBeTruthy();
    });

    it('should call showModal when open is set to true', async () => {
      const fixture = TestBed.createComponent(DialogTestComponent);
      fixture.detectChanges();

      const dialogEl = getDialogEl(fixture)!;
      expect(dialogEl.showModal).not.toHaveBeenCalled();

      fixture.componentInstance.isOpen.set(true);
      fixture.detectChanges();
      await fixture.whenStable();

      expect(dialogEl.showModal).toHaveBeenCalledTimes(1);
    });

    it('should call close when open is set to false', async () => {
      const fixture = TestBed.createComponent(DialogTestComponent);
      fixture.componentInstance.isOpen.set(true);
      fixture.detectChanges();
      await fixture.whenStable();

      const dialogEl = getDialogEl(fixture)!;
      Object.defineProperty(dialogEl, 'open', { value: true, writable: true });

      fixture.componentInstance.isOpen.set(false);
      fixture.detectChanges();
      await fixture.whenStable();

      expect(dialogEl.close).toHaveBeenCalled();
    });

    it('should render header when provided', () => {
      const fixture = TestBed.createComponent(DialogTestComponent);
      fixture.detectChanges();

      const header = fixture.nativeElement.querySelector('.zen-dialog-header h2');
      expect(header?.textContent).toBe('Test Dialog');
    });

    it('should apply size attribute', () => {
      const fixture = TestBed.createComponent(DialogTestComponent);
      fixture.componentInstance.size.set('lg');
      fixture.detectChanges();

      const dialogEl = getDialogEl(fixture)!;
      expect(dialogEl.getAttribute('data-size')).toBe('lg');
    });

    it('should close when close button is clicked', async () => {
      const fixture = TestBed.createComponent(DialogTestComponent);
      fixture.componentInstance.isOpen.set(true);
      fixture.detectChanges();
      await fixture.whenStable();

      const closeBtn = fixture.nativeElement.querySelector('.zen-dialog-close') as HTMLButtonElement;
      closeBtn?.click();
      fixture.detectChanges();

      expect(fixture.componentInstance.isOpen()).toBe(false);
    });
  });
});

describe('ZenDialogService', () => {
  beforeEach(async () => {
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();

    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection(), ZenDialogService],
    }).compileComponents();
  });

  afterEach(() => {
    const dialogEl = getDialogElFromBody();
    if (dialogEl) {
      dialogEl.remove();
    }
  });

  it('should open dialog with component', () => {
    const service = TestBed.inject(ZenDialogService);

    const ref = service.open(TestDialogContent, { header: 'Service Dialog' });

    expect(ref).toBeDefined();
    expect(ref.componentInstance).toBeInstanceOf(TestDialogContent);
  });

  it('should pass inputs to component', () => {
    const service = TestBed.inject(ZenDialogService);

    const ref = service.open(TestDialogContent, {
      inputs: { message: 'Hello from service' } as Record<string, unknown>,
    });

    expect(ref.componentInstance.message()).toBe('Hello from service');
  });

  it('should subscribe to outputs', () => {
    const service = TestBed.inject(ZenDialogService);
    const confirmHandler = vi.fn();
    const cancelHandler = vi.fn();

    service.open(TestDialogContent, {
      outputs: {
        confirmClick: confirmHandler,
        cancelClick: cancelHandler,
      },
    });

    const confirmBtn = document.body.querySelector('button') as HTMLButtonElement;
    confirmBtn?.click();

    expect(confirmHandler).toHaveBeenCalledWith('confirmed');
  });

  it('should close dialog via DialogRef', async () => {
    const service = TestBed.inject(ZenDialogService);

    const ref = service.open(TestDialogContent);

    ref.close();

    const dialogEl = getDialogElFromBody();
    expect(dialogEl).toBeNull();
  });
});
