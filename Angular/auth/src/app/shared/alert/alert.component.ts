import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "alert-component",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.css"]
})
export class AlertComponent implements OnInit {
  @Input() message: string;
  @Output() close = new EventEmitter<void>();
  constructor() {}

  ngOnInit() {}

  onClose() {
    this.close.emit();
  }
}
