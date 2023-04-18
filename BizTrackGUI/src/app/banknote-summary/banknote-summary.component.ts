import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banknote-summary',
  templateUrl: './banknote-summary.component.html',
  styleUrls: ['./banknote-summary.component.scss']
})
export class BanknoteSummaryComponent implements OnInit {
  currencies: Array<Currency> = [
    new Currency('../../assets/05franc.png', 0.5, 0),
    new Currency('../../assets/1franc.png',1 , 0),
    new Currency('../../assets/2franc.png',2, 0),
    new Currency('../../assets/5franc.png',5, 0),
    new Currency('../../assets/10franc.png',10, 0),
    new Currency('../../assets/20franc.png',20, 0),
    new Currency('../../assets/50franc.png',50, 0),
    new Currency('../../assets/100franc.png',100, 0),
    new Currency('../../assets/200franc.png',200, 0)
  ];
  constructor() { }

  ngOnInit(): void {
  }

  getTotalValue(){
    return this.currencies.reduce((toret:number, curr:Currency)=>{
      toret += curr.value*curr.nbr;
      return toret;
    },0)
  }

}
class Currency {
  img: string;
  value: number;
  nbr: number;
  constructor(img: string, value: number, nbr: number) {
    this.img = img;
    this.value = value;
    this.nbr = nbr;
  }
}
