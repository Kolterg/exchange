import { Component, OnInit } from '@angular/core';
import ExchangeRate from './models/Exchange';
import { ExchangeService } from './services/exchange.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  exchangeRates: ExchangeRate[];
  exchangeRateUSD: any;
  exchangeRateEUR: any;

  constructor(private exchangeService: ExchangeService) {}
  
  ngOnInit(): void {
    this.exchangeService.getExchangeRate().subscribe(value => {
      this.exchangeRates = value;
      
      this.exchangeRateUSD = this.exchangeRates.find(value => value.cc === "USD");
      this.exchangeRateEUR = this.exchangeRates.find(value => value.cc === "EUR");
    });
    
  }
}
