import { Component, Input, OnInit } from '@angular/core';
import ExchangeRate from 'src/app/models/Exchange';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {

  @Input()
  get exchangeRates(): ExchangeRate[] {
    return this._exchangeRates
  }
  set exchangeRates(exchangeRates: ExchangeRate[]) {
    this._exchangeRates = exchangeRates;
  }
  private _exchangeRates: ExchangeRate[];

  firstTarget: ExchangeRate = {
    "r030": 0,
    "txt": "Гривня",
    "rate": 1,
    "cc": "UAH",
    "exchangedate": ""
  };
  secondTarget: ExchangeRate = {
    "r030": 0,
    "txt": "Долар США",
    "rate": 38,
    "cc": "USD",
    "exchangedate": ""
  };

  firstNum: number;
  secondNum: number;

  constructor() { }

  ngOnInit(): void { }

  onTarget1(target: ExchangeRate): void {
    this.firstTarget = target;
  }
  onTarget2(target: ExchangeRate): void {
    this.secondTarget = target;
  }

  convert(num: number) {
    switch (num) {
      case 0:
        this.secondNum = this.firstTarget.rate / this.secondTarget.rate * this.firstNum;
        break;

      case 1:
        this.firstNum = this.secondTarget.rate / this.firstTarget.rate * this.secondNum;
        break;

      default:
        break;
    }
  }
}
