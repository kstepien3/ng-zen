import { Injectable } from '@angular/core';

import { ZenRadio } from './radio';

@Injectable({ providedIn: 'root' })
export class ZenRadioRegistry {
  private readonly radios = new Map<string, ZenRadio[]>();

  add(name: string, radio: ZenRadio): void {
    if (!this.radios.has(name)) {
      this.radios.set(name, []);
    }
    this.radios.get(name)!.push(radio);
  }

  remove(name: string, radio: ZenRadio): void {
    const group = this.radios.get(name);
    if (!group) return;

    const index = group.indexOf(radio);
    if (index > -1) {
      group.splice(index, 1);
    }
  }

  select(name: string, value: string): void {
    const group = this.radios.get(name);
    if (!group) return;

    group.forEach(radio => {
      radio.onInput(value);
    });
  }
}
