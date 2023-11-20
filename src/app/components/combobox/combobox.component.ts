import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
  ElementRef,
  Renderer2,
  forwardRef,
  AfterContentInit,
  ViewChild,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "combobox",
  templateUrl: "combobox.component.html",
  styleUrls: ["combobox.component.scss", './../../styles/font-awesome.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComboboxComponent),
      multi: true,
    },
  ],
})
export class ComboboxComponent
  implements ControlValueAccessor, AfterContentInit, OnChanges
{
  @ViewChild("comboBox") comboBox: ElementRef | undefined;

  @Input() items: any[] = [];
  @Input() displayProperty: string | undefined;
  @Input() startItem: any = null;
  @Input() disabled: boolean = false;
  @Input() placeholder: any = "Seleccione una opción";
  @Input() id: any = "item";
  @Output() itemSelected: EventEmitter<any> = new EventEmitter<any>();
  public selectedItem: any;
  public showOptions: boolean = false;
  public userInput: string = "";
  public selectedFocusItemIndex: number | undefined;
  public matchingIndex: number | undefined;
  public timerId: any;
  public loading: boolean = true;

  writeValue(value: any): void {
    if (value !== undefined) {
      this.selectedItem = value;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
   //check if startItem has changed
    if (changes['startItem'] && !changes['startItem'].firstChange) {
      this.selectedItem = changes['startItem'].currentValue;
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Implementa lógica para deshabilitar el componente si es necesario
    // Por ejemplo, puedes agregar atributos o clases CSS para deshabilitarlo visualmente.
    if (isDisabled) {
      this.renderer.setAttribute(
        this.elementRef.nativeElement,
        "disabled",
        "true"
      );
    } else {
      this.renderer.removeAttribute(this.elementRef.nativeElement, "disabled");
    }
  }

  // Implementación de ControlValueAccessor
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterContentInit() {
    if (this.items) {
      console.log(this.items);
      if (this.startItem) {
        this.selectItem(this.startItem);
      } else {
        this.selectedItem = this.displayProperty
          ? {
              id: "unselected",
              [this.displayProperty]: this.placeholder,
            }
          : this.placeholder;
          this.loading = false;
      }
    }
  }

  showOptionsToggle() {
    if (!this.disabled) {
      this.showOptions = !this.showOptions;
    }
  }

  selectItem(item: any) {
    this.selectedItem = item;
    this.showOptions = false;
    this.onChange(item); // Notificar cambios al formulario
    this.onTouched(); // Marcar como tocado
    if (!this.loading) {
      this.itemSelected.emit(item);
    }
    this.loading = false;
  }

  onComboBoxKeyPress(event: KeyboardEvent) {
    if (event.key.length === 1) {
      this.userInput += event.key;
      this.focusMatchingItem();
    } else if (event.key === "Backspace") {
      this.userInput = this.userInput.slice(0, -1);
      this.focusMatchingItem();
    }

    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => {
      this.userInput = "";
    }, 1000);
  }

  focusMatchingItem() {
    const oldItem = document.getElementById(
      "option-" + this.id + "-" + this.matchingIndex
    );
    if (oldItem) {
      oldItem.classList.remove("focused");
    }

    const matchingIndex = this.items.findIndex((item) =>
      (this.displayProperty ? item[this.displayProperty] : item)
        .toLowerCase()
        .includes(this.userInput.toLowerCase())
    );

    if (matchingIndex !== -1) {
      const item = document.getElementById(
        "option-" + this.id + "-" + matchingIndex
      );
      item?.classList.add("focused");
      item?.focus();
      this.comboBox?.nativeElement.focus();
      this.matchingIndex = matchingIndex;
    }

    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => {
      this.userInput = '';
    }, 1000);
  }
}
