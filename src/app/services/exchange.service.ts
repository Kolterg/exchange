import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import ExchangeRate from '../models/Exchange';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  private url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json'

  constructor(private httpClient: HttpClient) { }

  getExchangeRate(): Observable<ExchangeRate[]> {
    return this.httpClient.get<ExchangeRate[]>(this.url);
  }

  getExchangeRateByCC(name: string): Observable<ExchangeRate[]> {
    return this.httpClient.get<ExchangeRate[]>(this.url).pipe(map(exchangeRate => exchangeRate.filter(value => value.cc === name)));
  }
}
