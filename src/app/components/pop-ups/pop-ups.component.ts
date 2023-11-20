import { Component, OnInit } from "@angular/core";
import { Popup } from "./pop-ups.model";
import { PopupService } from "./pop-ups.service";
import { configPopup } from "./pop-ups.model";

@Component({
  selector: "pop-ups",
  templateUrl: "./pop-ups.component.html",
  styleUrls: ["./pop-ups.component.scss", './../../styles/font-awesome.scss']
})
export class PopUpsComponent implements OnInit {
  public configPopup = configPopup;

  constructor(public popupService: PopupService) {}
  ngOnInit(): void {
  }

  closePopup(popup: Popup): void {
    this.popupService.closePopup(popup);
  }
}
