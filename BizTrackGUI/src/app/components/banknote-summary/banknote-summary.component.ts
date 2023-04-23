import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Currency } from 'src/app/Models/Currency';

@Component({
  selector: 'app-banknote-summary',
  templateUrl: './banknote-summary.component.html',
  styleUrls: ['./banknote-summary.component.scss']
})
export class BanknoteSummaryComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<any>();
  @Input() banknotes:Array<Currency> = [];
  
  constructor() { }

  ngOnInit(): void {
  }

  getTotalValue() {
    return this.banknotes.reduce((toret: number, curr: Currency) => {
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
  onKeyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  submit() {
    this.onSubmit.emit(true);
  }
}