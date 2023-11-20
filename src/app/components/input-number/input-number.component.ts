import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss', '../../styles/font-awesome.scss'],
})
export class InputNumberComponent {
  @Input() min: number = 0;
  @Input() max: number = 99
  @Input() value: number = 0;
  @Input() placeholder: string = '0';
  @Output() valueChanged = new EventEmitter<number>();

  @ViewChild('quantityDiv') quantityDiv: ElementRef | undefined;

  constructor(private renderer: Renderer2) {}

  incrementValue(): void {
    if (!this.value) {
      this.value = this.min;
      this.emitValueChanged();
    } else
    if (this.value < this.max) {
      this.value++;
      this.emitValueChanged();
    }
  }

  decrementValue(): void {
    if (!this.value) {
      this.value = this.min;
      this.emitValueChanged();
    } else
    if (this.value > this.min) {
      this.value--;
      this.emitValueChanged();
    }
  }

  onInputChange(): void {
    if (this.value < this.min) {
      this.value = this.min;
      console.log(this.value);
    } else if (this.value > this.max) {
      this.value = this.max;
    }
    this.emitValueChanged();
  }

  onBlur(): void {
    this.onInputChange(); // Actualiza el valor cuando se pierde el foco
  }

  private emitValueChanged(): void {
    this.valueChanged.emit(this.value);
  }
}
