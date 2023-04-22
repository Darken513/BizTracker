import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  dateTime: string = "";
  username: string = "";
  restaurant: any;
  @Input()
  set banknotesObj(value: Array<any>) {
    this.banknotes.forEach((bNote) => { bNote.nbr = value.find((curr) => curr.value == bNote.value).nbr });
  }
  @Input()
  set bilanObj(value: any) {
    this.charges = value.charges;
    [...this.fields, this.advance].forEach(field => field.value = value.fields.find((vf: any) => vf.fieldName == field.fieldName).value)
  }
  banknotes: Array<Currency> = [
    new Currency('0.5 Franc', 0.5, 0),
    new Currency('1 Franc', 1, 0),
    new Currency('2 Franc', 2, 0),
    new Currency('5 Franc', 5, 0),
    new Currency('10 Franc', 10, 0),
    new Currency('20 Franc', 20, 0),
    new Currency('50 Franc', 50, 0),
    new Currency('100 Franc', 100, 0),
    new Currency('200 Franc', 200, 0),
  ]
  fields: Array<FieldToFill> = [
    new FieldToFill('totalWebsite', "Total income from websites", 0),
    new FieldToFill('totalTpe1', "Total income from TPE1", 0),
    new FieldToFill('totalTpe2', "Total income from TPE2", 0),
  ]
  charges: Array<any> = []//new Array();
  advance: FieldToFill = new FieldToFill('advance', "Total advance", 0);
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
    return this.banknotes.reduce((res: number, cur: any) => res + cur.value * cur.nbr, 0)
  }
  getTotalCharges() {
    return this.charges.reduce((res, cur) => res + cur.value, 0);
  }
  getTotalIncome() {
    return this.fields.reduce((res, cur) => res + cur.value, 0) - this.charges.reduce((res, cur) => res + cur.value, 0) - this.advance.value;
  }
  printPage() {
    window.print();
  }
  SaveConf() {

  }

}

class Currency {
  label: string;
  value: number;
  nbr: number;
  constructor(label: string, value: number, nbr: number) {
    this.label = label;
    this.value = value;
    this.nbr = nbr;
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
