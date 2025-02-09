import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Currency } from 'src/app/Models/Currency';
import * as _ from "lodash"
@Component({
  selector: 'app-cash-register-handler',
  templateUrl: './cash-register-handler.component.html',
  styleUrls: ['./../summary/summary.component.scss', './cash-register-handler.component.scss']
})
export class CashRegisterHandlerComponent implements OnInit {
  @Input() banknotesObj: Array<Currency> = [];
  @Output() onSubmit = new EventEmitter<any>();
  CURRENCY_VALUES: Array<number> = [0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100, 200];
  defaultVals: Array<number> = [0, 0, 0, 10, 10, 10, 5, 5, 5, 2, 0, 0];
  ownedToUse: Array<number> = [];
  resToUse: Array<number> = [];
  defaultTotal: number = 0;
  totalKept: number = 0;
  constructor() { }

  ngOnInit(): void {
    this.ownedToUse = this.banknotesObj.map((val) => val.nbr ? parseFloat(val.nbr) : 0)
    this.resToUse = this.calculateNextEmployeeValues(_.cloneDeep(this.ownedToUse));
    this.totalKept = this.resToUse.reduce((toret, curr, idx) => {
      toret += curr * this.CURRENCY_VALUES[idx]
      return toret;
    }, 0);
  }
  tryToReplace(totalDef: number, totalKept: number, idx: number, toret: Array<number>, ownedCoins: Array<number>): any {
    if (ownedCoins[idx] == 0)
      return { change: false, toreturn: toret };
    if (totalKept + this.CURRENCY_VALUES[idx] < totalDef)
      return { change: false, toreturn: toret };
    totalKept += this.CURRENCY_VALUES[idx];
    for (let subIdx = idx - 1; subIdx >= 0; subIdx--) {
      const value = this.CURRENCY_VALUES[subIdx];
      const coins = toret[subIdx];
      const difference = Number((totalKept - totalDef).toFixed(2));
      let toreduce = Math.floor(difference / value);
      if (toreduce >= coins) {
        toret[subIdx] = 0;
        ownedCoins[subIdx] += coins;
        totalKept -= coins * value;
      } else {
        toret[subIdx] = coins - toreduce;
        ownedCoins[subIdx] += coins - toreduce;
        totalKept -= toreduce * value;
      }
      if (totalKept == totalDef)
        break;
    }
    if (totalKept == totalDef) {
      toret[idx] += 1;
      return { change: true, toreturn: toret, ownedCoins };
    }
    return { change: false, toreturn: toret };
  }
  calculateNextEmployeeValues(ownedMoney: number[]): number[] {
    let toreturn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let totalOwned = ownedMoney.reduce((toret, curr, idx) => {
      toret += curr * this.CURRENCY_VALUES[idx]
      return toret;
    }, 0);
    this.defaultTotal = this.defaultVals.reduce((toret, curr, idx) => {
      toret += curr * this.CURRENCY_VALUES[idx]
      return toret;
    }, 0);
    if (this.defaultTotal >= totalOwned)
      return ownedMoney;
    for (let idx = ownedMoney.length - 1; idx >= 0; idx--) {
      const ownedCoins = ownedMoney[idx];
      const defaultCoins = this.defaultVals[idx];
      if (ownedCoins > defaultCoins) {
        ownedMoney[idx] = ownedCoins - defaultCoins;
        toreturn[idx] = defaultCoins;
      } else {
        ownedMoney[idx] = 0;
        toreturn[idx] = ownedCoins;
      }
    }
    let tookAction = true;
    let totalLeft = this.defaultTotal - toreturn.reduce((toret, curr, idx) => {
      toret += curr * this.CURRENCY_VALUES[idx]
      return toret;
    }, 0);
    while (totalLeft > 0 && tookAction) {
      tookAction = false;
      for (let idx = ownedMoney.length - 1; idx >= 0; idx--) {
        const ownedCoins = ownedMoney[idx];
        if (totalLeft >= this.CURRENCY_VALUES[idx] && ownedCoins) {
          let toFill = Math.floor(totalLeft / this.CURRENCY_VALUES[idx])
          if (toFill >= ownedCoins) {
            ownedMoney[idx] = 0;
            toreturn[idx] += ownedCoins;
          } else {
            ownedMoney[idx] = ownedCoins - toFill;
            toreturn[idx] += toFill;
          }
          totalLeft = this.defaultTotal - toreturn.reduce((toret, curr, idx) => {
            toret += curr * this.CURRENCY_VALUES[idx]
            return toret;
          }, 0);
          tookAction = true;
        }
      }
    }
    if (totalLeft > 0) {
      for (let idx = 1; idx < toreturn.length; idx++) {
        let totalKept = toreturn.reduce((toret, curr, idx) => {
          toret += curr * this.CURRENCY_VALUES[idx]
          return toret;
        }, 0);
        let testRes = this.tryToReplace(this.defaultTotal, totalKept, idx, _.cloneDeep(toreturn), _.cloneDeep(ownedMoney))
        if (testRes && testRes.change) {
          toreturn = testRes.toreturn;
          ownedMoney = testRes.ownedMoney;
          break;
        }
      }
    }
    return toreturn;
  }
  submit() {
    this.onSubmit.emit(this.resToUse);
  }
}