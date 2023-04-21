import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  banknotes: Array<Currency> = [
    new Currency('0.5 Franc', 0.5, 5),
    new Currency('1 Franc', 1, 5),
    new Currency('2 Franc', 2, 5),
    new Currency('5 Franc', 5, 5),
    new Currency('10 Franc', 10, 5),
    new Currency('20 Franc', 20, 5),
    new Currency('50 Franc', 50, 5),
    new Currency('100 Franc', 100, 5),
    new Currency('200 Franc', 200, 5),
  ]
  fields: Array<FieldToFill> = [
    new FieldToFill('totalWebsite', "Total income from websites", 12),
    new FieldToFill('totalTpe1', "Total income from TPE1", 1221),
    new FieldToFill('totalTpe2', "Total income from TPE2", 33),
  ]
  charges: Array<any> = [{ label: "test", value: 0 }, { label: "label2", value: 555 }]//new Array();
  advance: FieldToFill = new FieldToFill('advance', "Total advance", 70);
  constructor() { }

  ngOnInit(): void {
  }

  getTotalBanknotes() {
    return this.banknotes.reduce((res: number, cur: any) => res + cur.value * cur.nbr, 0)
  }
  getTotalCharges(){
    return this.charges.reduce((res, cur)=>res+cur.value,0);
  }
  getTotalIncome(){
    return this.fields.reduce((res, cur)=>res+cur.value,0)-this.charges.reduce((res, cur)=>res+cur.value,0)-this.advance.value;
  }
  printPage(){
    window.print();
  }
  sendItByMail(){
    
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

class FieldToFill {
  fieldName: string;
  label: string;
  value: number;
  constructor(fieldName: string, label: string, value: number) {
    this.fieldName = fieldName;
    this.label = label;
    this.value = value;
  }
}
