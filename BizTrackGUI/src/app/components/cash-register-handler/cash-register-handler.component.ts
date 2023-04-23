import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cash-register-handler',
  templateUrl: './cash-register-handler.component.html',
  styleUrls: ['./../summary/summary.component.scss', './cash-register-handler.component.scss']
})
export class CashRegisterHandlerComponent implements OnInit {
  
  banknotes: Array<Currency> = [
    new Currency('../../assets/05franc.png', '0.5 Franc', 0.5, 10),
    new Currency('../../assets/1franc.png', '1 Franc', 1, 5),
    new Currency('../../assets/2franc.png', '2 Franc', 2, 5),
    new Currency('../../assets/5franc.png', '5 Franc', 5, 2),
    new Currency('../../assets/10franc.png', '10 Franc', 10, 2),
    new Currency('../../assets/20franc.png', '20 Franc', 20, 1),
    new Currency('../../assets/50franc.png', '50 Franc', 50, 0),
    new Currency('../../assets/100franc.png', '100 Franc', 100, 0),
    new Currency('../../assets/200franc.png', '200 Franc', 200, 0)
  ];;
  CURRENCY_VALUES: Array<number> = [0.5, 1, 2, 5, 10, 20, 50, 100, 200];
  DEFAULT_NEXT_EMPLOYEE_VALUES: Array<number> = [10, 5, 5, 2, 2, 1, 0, 0, 0];
  OWNED_TO_USE_STATIC: Array<number> = [6, 15, 7, 1, 1, 0, 1, 0, 0];
  RESULT_TO_USE_STATIC: Array<number> = [6, 5, 5, 1, 1, 0, 1, 0, 0];
  constructor() { }

  ngOnInit(): void {
    const ownedMoney = [20, 1, 0, 0, 3, 0, 0, 0, 1];
    const nextEmployeeValues = this.calculateNextEmployeeValues(ownedMoney);
    console.log(nextEmployeeValues);
  }

  calculateNextEmployeeValues(ownedMoney: number[]): number[] {
    let toreturn = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    let defaultVals = [...this.DEFAULT_NEXT_EMPLOYEE_VALUES]
    let totalOwnedValue = ownedMoney.reduce((toret, curr, idx) => {
      toret += curr * this.CURRENCY_VALUES[idx]
      return toret;
    }, 0);
    ownedMoney.forEach((val, idx) => {
      if (defaultVals[idx] >= val) {
        toreturn[idx] = val;
        if (defaultVals[idx + 1]) {
          toreturn[idx] = val;
          defaultVals[idx + 1] = Math.ceil((defaultVals[idx] - val) * this.CURRENCY_VALUES[idx] / this.CURRENCY_VALUES[idx + 1])
        } else {
          //spec unclear ( specify the behavior of this algorithm in all different cases )
          /*
            - if user has no money to offer ?
            - if user has shortage in money say 35 over 50 ?
            - if user has excess in money say 50 of value 0.5 and 5 of type 10, should he perioritize the 0.5 over the 10 ?
            - should this money be sustracted from the banknotes summary ?
            - should this be included in the final report ?
            - should this be saved in the database ?
          */
        }
      }
    })
    console.log(defaultVals)
    return toreturn;
  }
}
export class Currency {
  img: string;
  label: string;
  value: number;
  nbr: number;
  constructor(img: string, label: string, value: number, nbr: number) {
    this.img = img;
    this.label = label;
    this.value = value;
    this.nbr = nbr;
  }
}