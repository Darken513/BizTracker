import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Currency } from 'src/app/Models/Currency';
import { FieldToFill } from 'src/app/Models/FieldToFill';
import { AuthService } from 'src/app/services/auth.service';
import { SummaryService } from 'src/app/services/summary.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<any>();
  dateTime: string = '';
  username: string = '';
  restaurant: any;
  @Input() banknotesObj: Array<Currency> = [];
  @Input() coinsToLeave: Array<number> = [];
  private _bilanObj: any;
  @Input()
  public set bilanObj(v: any) {
    this._bilanObj = v;
    this.fields = [v.website, v.totalJusteat, v.tpe1, v.tpe2];
  }
  public get bilanObj(): any {
    return this._bilanObj;
  }
  canSubmit: boolean = true;
  fields: Array<FieldToFill> = [];
  constructor(
    private authService: AuthService,
    private router: Router,
    private summaryService: SummaryService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const dateString = `${month < 9 ? '0' + month : month}/${day < 9 ? '0' + day : day
      }/${year} ${hours < 9 ? '0' + hours : hours}:${minutes < 9 ? '0' + minutes : minutes
      }`;
    this.dateTime = dateString;
    this.username = this.authService.getCurrentUser().username;
    this.restaurant = this.authService.getCurrentUser().restaurant;
  }
  getTotalFieldVal(total: any) {
    return total.toFixed(2)
  }
  getTotalBanknotes() {
    return this.banknotesObj.reduce(
      (res: number, cur: any, idx: number) =>
        res +
        parseFloat(cur.value ? cur.value : '0') *
        (parseFloat(cur.nbr ? cur.nbr : '0') - this.coinsToLeave[idx]),
      0
    ).toFixed(2);
  }
  getTotalBanknotesInitial(){
    return this.banknotesObj.reduce(
      (res: number, cur: any, idx: number) =>
        res +
        parseFloat(cur.value ? cur.value : '0') * parseFloat(cur.nbr ? cur.nbr : '0'),
      0
    ).toFixed(2);
  }
  getTotalCharges() {
    return this.bilanObj.charges.reduce(
      (res: any, cur: any) => res + parseFloat(cur.value ? cur.value : '0'),
      0
    ).toFixed(2);
  }
  getTotalAdvances() {
    return this.bilanObj.advances.reduce(
      (res: any, cur: any) => res + parseFloat(cur.value ? cur.value : '0'),
      0
    ).toFixed(2);
  }
  getTotalNonFactures() {
    return this.bilanObj.nonFactures.reduce(
      (res: any, cur: any) => res + parseFloat(cur.value ? cur.value : '0'),
      0
    ).toFixed(2);
  }
  getTotalIncome() {
    return (
      parseFloat(this.getTotalBanknotes()) +
      this.fields.reduce(
        (res: any, cur: any) => res + parseFloat(cur.value ? cur.value : '0'),
        0
      ) - parseFloat(this.getTotalCharges()) - parseFloat(this.getTotalAdvances()) - parseFloat(this.getTotalNonFactures())
    );
  }
  printPage() {
    window.print();
  }
  getBanknotesDetails() {
    let toret = [];
    for (let idx = 0; idx < this.banknotesObj.length; idx++) {
      const banknote = this.banknotesObj[idx];
      let topush = {
        value: banknote.value,
        initialVal: (banknote.value * parseFloat(banknote.nbr ? banknote.nbr : '0')),
        finalVal: banknote.value * (parseFloat(banknote.nbr ? banknote.nbr : '0') - this.coinsToLeave[idx])
      }
      toret.push(topush)
    }
    return toret
  }
  SaveConf() {
    let data = {
      restaurantName: this.restaurant.name,
      username: this.username,
      dateTime: this.dateTime,
      banknotesDetails: this.getBanknotesDetails(), //[{ value: '', initial: '', kept: '', finalValue: '' }]
      totalInitialBanknotesVal: this.getTotalBanknotesInitial(),
      totalLeftBanknotesVal: this.getTotalBanknotes(),
      websiteTotal: this.fields.find((col) => col.fieldName == "totalWebsite")?.value,
      totalJusteat: this.fields.find((col) => col.fieldName == "totalJusteat")?.value,
      tpe1Total: this.fields.find((col) => col.fieldName == "totalTpe1")?.value,
      tpe2Total: this.fields.find((col) => col.fieldName == "totalTpe2")?.value,
      chargesTotal: this.getTotalCharges(),
      chargesDetails: this.bilanObj.charges,
      advancesTotal: this.getTotalAdvances(),
      advancesDetails: this.bilanObj.advances,
      nonFacturesTotal: this.getTotalNonFactures(),
      nonFacturesDetails: this.bilanObj.nonFactures,
      totalRes: this.getTotalIncome()
    }
    this.canSubmit = false;
    this.summaryService.save(data).subscribe({
      next: (next) => {
        if (next.done) {
          this.notificationService.showNotification('success','Le rapport a été envoyé avec succès')
          setTimeout(() => {
            this.authService.logout();
            this.router.navigate(['/home']);
          }, 1500);
          return;
        }
        if (next.error) {
          this.notificationService.showNotification('error',"une erreur s'est produite")
        }
      },
      error: (err) => {
      }
    })
  }
  getBanknoteTotal(banknote: any, idx: number) {
    return (
      banknote.value *
      (parseFloat(banknote.nbr ? banknote.nbr : '0') - this.coinsToLeave[idx])
    ).toFixed(2);
  }
  getInitialValue(banknote: any, idx: number) {
    return (
      banknote.value * parseFloat(banknote.nbr ? banknote.nbr : '0')
    ).toFixed(2);
  }
  onKeyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
