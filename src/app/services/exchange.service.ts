import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import ExchangeRate from '../models/Exchange';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  private url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

  exchangeRateUSD: ExchangeRate[];
  USDIndex: number;
  exchangeRateEUR: ExchangeRate[];
  EURIndex: number;
  exchangeRatePLN: ExchangeRate[];
  PLNIndex: number;
  private exchangeRateUAH: ExchangeRate = {
    "r030": 0,
    "txt": "Гривня",
    "rate": 1,
    "cc": "UAH",
    "exchangedate": ""
  }

  constructor(private httpClient: HttpClient) { }

  getExchangeRate(): Observable<ExchangeRate[]> {
    return this.httpClient.get<ExchangeRate[]>(this.url).pipe(map(exchangeRates => {
      this.PLNIndex = exchangeRates.findIndex(el => el.cc === "PLN");
      this.exchangeRatePLN = exchangeRates.splice(this.PLNIndex, 1);
      exchangeRates.unshift(this.exchangeRatePLN[0]);
      this.EURIndex = exchangeRates.findIndex(el => el.cc === "EUR");
      this.exchangeRateEUR = exchangeRates.splice(this.EURIndex, 1);
      exchangeRates.unshift(this.exchangeRateEUR[0]);
      this.USDIndex = exchangeRates.findIndex(el => el.cc === "USD");
      this.exchangeRateUSD = exchangeRates.splice(this.USDIndex, 1);
      exchangeRates.unshift(this.exchangeRateUSD[0]);
      exchangeRates.unshift(this.exchangeRateUAH);
      return exchangeRates;
    }));
  }

  getExchangeRateByCC(name: string): Observable<ExchangeRate[]> {
    return this.httpClient.get<ExchangeRate[]>(this.url).pipe(map(exchangeRates => exchangeRates.filter(value => value.cc === name)));
  }
}
