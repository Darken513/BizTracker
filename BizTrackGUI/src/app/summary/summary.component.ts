import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  banknotes:Array<Currency> = [
    new Currency('0.5 Franc',0.5, 5),
    new Currency('1 Franc',1, 5),
    new Currency('2 Franc',2, 5),
    new Currency('5 Franc',5, 5),
    new Currency('10 Franc',10, 5),
    new Currency('20 Franc',20, 5),
    new Currency('50 Franc',50, 5),
    new Currency('100 Franc',100, 5),
    new Currency('200 Franc',200, 5),
  ]
  constructor() { }

  ngOnInit(): void {
  }
  getTotalBanknotes(){
    return this.banknotes.reduce((res:number,cur:any)=>res+cur.value*cur.nbr,0)
  }
}

class Currency {
  label: string;
  nbr: number;
  value: number;
  constructor(label: string, value: number, nbr: number) {
    this.label = label;
    this.nbr = nbr;
    this.value = value;
  }
}