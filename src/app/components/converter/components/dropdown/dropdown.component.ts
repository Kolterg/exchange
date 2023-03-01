import { Component, EventEmitter, Input, Output } from '@angular/core';
import ExchangeRate from 'src/app/models/Exchange';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {

  @Input()
  exchangeRate: ExchangeRate;

  @Output() voted = new EventEmitter<ExchangeRate>();
  target = {};

  constructor() { }

  getTarget() {
    this.voted.emit(this.exchangeRate);
  }

}
