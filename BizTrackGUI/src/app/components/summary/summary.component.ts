import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Currency } from 'src/app/Models/Currency';
import { FieldToFill } from 'src/app/Models/FieldToFill';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<any>();
  dateTime: string = "";
  username: string = "";
  restaurant: any;
  @Input() banknotesObj: Array<Currency> = [];
  private _bilanObj: any;
  @Input()
  public set bilanObj(v: any) {
    this._bilanObj = v;
    this.fields = [v.website, v.tpe1, v.tpe2];
    this.advance = v.advance;
  }
  public get bilanObj(): any {
    return this._bilanObj;
  }

  fields: Array<FieldToFill> = []
  advance: FieldToFill = new FieldToFill('advance', "Total advance", '');
  constructor(
    private authService: AuthService,
    private restaurantService: RestaurantService,
  ) { }

  ngOnInit(): void {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const dateString = `${month < 9 ? '0' + month : month}/${day < 9 ? '0' + day : day}/${year} ${hours < 9 ? '0' + hours : hours}:${minutes < 9 ? '0' + minutes : minutes}`;
    this.dateTime = dateString;
    this.username = this.authService.getCurrentUser().username;
    this.restaurantService.getById(this.authService.getCurrentUser().restaurantId).subscribe({
      next: (response: any) => {
        this.restaurant = response;
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }

  getTotalBanknotes() {
    return this.banknotesObj.reduce((res: number, cur: any) => res + parseInt(cur.value ? cur.value : '0') * parseInt(cur.nbr ? cur.nbr : '0'), 0)
  }
  getTotalCharges() {
    return this.bilanObj.charges.reduce((res: any, cur: any) => res + parseInt(cur.value ? cur.value : '0'), 0);
  }
  getTotalIncome() {
    return this.fields.reduce((res: any, cur: any) => res + parseInt(cur.value ? cur.value : '0'), 0) -
      this.bilanObj.charges.reduce((res: any, cur: any) => res + parseInt(cur.value ? cur.value : '0'), 0) -
      parseInt(this.advance.value ? this.advance.value : '0');
  }
  printPage() {
    window.print();
  }
  SaveConf() {
    this.onSubmit.emit(true)
  }
  getBanknoteTotal(banknote: any) {
    return banknote.value * parseInt(banknote.nbr ? banknote.nbr : '0')
  }
  onKeyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}