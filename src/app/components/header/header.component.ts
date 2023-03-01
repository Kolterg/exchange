import { Component, Input, OnInit } from '@angular/core';
import ExchangeRate from 'src/app/models/Exchange';
import { ExchangeService } from 'src/app/services/exchange.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  exchangeRateUSD: ExchangeRate;
  exchangeRateEUR: ExchangeRate;

  constructor(private exchangeService: ExchangeService) { }

  ngOnInit(): void {
    this.exchangeService.getExchangeRateByCC("USD").subscribe(value => {
      this.exchangeRateUSD = value[0];
    })

    this.exchangeService.getExchangeRateByCC("EUR").subscribe(value => {
      this.exchangeRateEUR = value[0];
    })
  }
}
