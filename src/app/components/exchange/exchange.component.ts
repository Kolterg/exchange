import { Component, Input } from '@angular/core';
import ExchangeRate from 'src/app/models/Exchange';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss']
})
export class ExchangeComponent {

  @Input()
  exchangeRate: ExchangeRate;
}
