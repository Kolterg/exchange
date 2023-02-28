import { Component, Input, OnInit } from '@angular/core';
import ExchangeRate from 'src/app/models/Exchange';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  exchangeRateEUR: ExchangeRate;
  @Input()
  exchangeRateUSD: ExchangeRate;

  constructor() {}

  ngOnInit(): void {}
}
