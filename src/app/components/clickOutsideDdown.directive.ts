/* tslint:disable:member-ordering */
import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[clickOutsideDdown]'
})
export class ClickOutsideDdownDirective {

  constructor(private _elementRef: ElementRef) { }

  @Output('clickOutsideDdown') clickOutsideDdown: EventEmitter<any> = new EventEmitter();

  @HostListener('document:click', ['$event.target']) onMouseEnter(targetElement:any) {
    // (targetElement.id == 'lbl-settings') ||
    if (targetElement) {
      const clickedInside = this._elementRef.nativeElement.contains(targetElement);
      
      if (!clickedInside) {        
        this.clickOutsideDdown.emit(true);
      }
      // if (targetElement.id == 'settings') {
      //   this.clickOutside.emit(false);
      // }
    }

  }


}