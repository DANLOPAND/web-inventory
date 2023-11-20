import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from "@angular/core";

@Component({
  selector: "search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss" , './../../styles/font-awesome.scss']
})
export class SearchBarComponent implements OnInit, OnChanges {
  @Input() placeholder: string = "";
  @Input() items: any[] = [];
  @Input() loadingSearch: boolean = false;
  @Input() onKeyPress: boolean = true;
  @Input() searchQuery: any = "";
  @Input() displayProperty: string = "";
  @Output() searchQueryEmit: EventEmitter<string> = new EventEmitter<string>();
  @Output() itemSelected: EventEmitter<any> = new EventEmitter<any>();
  public showItems: boolean = false;

  constructor() {}

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.searchQuery === "") {
      this.showItems = false;
    }
  }

  selectSearch() {
    this.searchQueryEmit.emit(this.searchQuery);
  }

  onKeyDown(event: any) {
    if (event.key === "Enter") {
      this.selectSearch();
    }
  }

  showCourseToggle(): void {
    this.showItems = !this.showItems;
  }

  onSearchQuery(searchText: any): void {
    if (this.onKeyPress) {
      this.searchQueryEmit.emit(searchText);
    }
  }

  onItemSelected(item: any): void {
    this.itemSelected.emit(item);
  }

  onButtonClick(event: Event): void {
    event.stopPropagation();
    this.selectSearch();
  }
}
