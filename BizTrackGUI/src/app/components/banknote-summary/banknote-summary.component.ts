import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banknote-summary',
  templateUrl: './banknote-summary.component.html',
  styleUrls: ['./banknote-summary.component.scss']
})
export class BanknoteSummaryComponent implements OnInit {
  currencies: Array<Currency> = [
    new Currency('../../assets/05franc.png', 0.5, ''),
    new Currency('../../assets/1franc.png', 1, ''),
    new Currency('../../assets/2franc.png', 2, ''),
    new Currency('../../assets/5franc.png', 5, ''),
    new Currency('../../assets/10franc.png', 10, ''),
    new Currency('../../assets/20franc.png', 20, ''),
    new Currency('../../assets/50franc.png', 50, ''),
    new Currency('../../assets/100franc.png', 100, ''),
    new Currency('../../assets/200franc.png', 200, '')
  ];
  constructor() { }

  ngOnInit(): void {
  }

  getTotalValue() {
    return this.currencies.reduce((toret: number, curr: Currency) => {
      toret += curr.value * parseInt(curr.nbr ? curr.nbr : '0');
      return toret;
    }, 0)
  }
  reduceCurrency(currency: any) {
    const currentNbr = parseInt(currency.nbr ? currency.nbr : 0);
    if (currentNbr > 0)
      currency.nbr = (currentNbr - 1).toString()
  }
  increaseCurrency(currency: any) {
    const currentNbr = parseInt(currency.nbr ? currency.nbr : 0);
    currency.nbr = (currentNbr + 1).toString()
  }
  preventNegative(event: any, currency: any) {
    console.log(event.srcElement.value)
    if (event.srcElement.value.length || event.srcElement.value < 0 || event.srcElement.value.includes('.'))
      currency.nbr = '';
  }

}
class Currency {
  img: string;
  value: number;
  nbr: string;
  constructor(img: string, value: number, nbr: string) {
    this.img = img;
    this.value = value;
    this.nbr = nbr;
  }
}
