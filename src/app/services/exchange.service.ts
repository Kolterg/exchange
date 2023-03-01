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
  exchangeRateEUR: ExchangeRate[];
  exchangeRatePLN: ExchangeRate[];
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
      this.exchangeRatePLN = exchangeRates.splice(32, 1);
      exchangeRates.unshift(this.exchangeRatePLN[0]);
      this.exchangeRateEUR = exchangeRates.splice(32, 1);
      exchangeRates.unshift(this.exchangeRateEUR[0]);
      this.exchangeRateUSD = exchangeRates.splice(26, 1);
      exchangeRates.unshift(this.exchangeRateUSD[0]);
      exchangeRates.unshift(this.exchangeRateUAH);
      return exchangeRates;
    }));
  }

  getExchangeRateByCC(name: string): Observable<ExchangeRate[]> {
    return this.httpClient.get<ExchangeRate[]>(this.url).pipe(map(exchangeRates => exchangeRates.filter(value => value.cc === name)));
  }
}
