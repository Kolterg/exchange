import { Component, Input, OnInit } from '@angular/core';
import ExchangeRate from 'src/app/models/Exchange';
import { ExchangeService } from 'src/app/services/exchange.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {
  exchangeRates: ExchangeRate[];

  firstTarget: ExchangeRate;
  secondTarget: ExchangeRate;

  firstNum: number;
  secondNum: number;

  constructor(private exchangeService: ExchangeService) { }

  ngOnInit(): void {
    this.exchangeService.getExchangeRate().subscribe(value => {
      this.exchangeRates = value;
      this.firstTarget = value[0];
      this.secondTarget = value[1];
    });
    
  }

  onTarget1(target: ExchangeRate): void {
    this.firstTarget = target;
  }
  onTarget2(target: ExchangeRate): void {
    this.secondTarget = target;
  }

  convert(input: string) {
    switch (input) {
      case "firstNum":
        this.secondNum = this.firstTarget.rate / this.secondTarget.rate * this.firstNum;
        break;

      case "secondNum":
        this.firstNum = this.secondTarget.rate / this.firstTarget.rate * this.secondNum;
        break;

      default:
        break;
    }
  }
}
