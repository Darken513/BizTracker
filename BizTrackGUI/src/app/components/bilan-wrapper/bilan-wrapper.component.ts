import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Currency } from 'src/app/Models/Currency';
import { FieldToFill } from 'src/app/Models/FieldToFill';

@Component({
  selector: 'app-bilan-wrapper',
  templateUrl: './bilan-wrapper.component.html',
  styleUrls: ['./bilan-wrapper.component.scss']
})
export class BilanWrapperComponent implements OnInit {
  page_idx:number = 0
  coinsToLeave:Array<number>=[]
  banknotes: Array<Currency> = [
    new Currency('../../assets/005CHF.png', '0.05 CHF', 0.05, ''),
    new Currency('../../assets/020CHF.jpg', '0.10 CHF', 0.1, ''),
    new Currency('../../assets/010CHF.jpg', '0.20 CHF', 0.2, ''),
    new Currency('../../assets/05CHF.png', '0.5 CHF', 0.5, ''),
    new Currency('../../assets/1CHF.png', '1 CHF', 1, ''),
    new Currency('../../assets/2CHF.png', '2 CHF', 2, ''),
    new Currency('../../assets/5CHF.png', '5 CHF', 5, ''),
    new Currency('../../assets/10CHF.png', '10 CHF', 10, ''),
    new Currency('../../assets/20CHF.png', '20 CHF', 20, ''),
    new Currency('../../assets/50CHF.png', '50 CHF', 50, ''),
    new Currency('../../assets/100CHF.png', '100 CHF', 100, ''),
    new Currency('../../assets/200CHF.png', '200 CHF', 200, '')
  ];
  bilanObj: any = {
    website: new FieldToFill('totalWebsite', "Total site internet", ''),
    totalJusteat: new FieldToFill('totalJusteat', "Total Justeat en espèce", ''),
    tpe1: new FieldToFill('totalTpe1', "Total TPE1", ''),
    tpe2: new FieldToFill('totalTpe2', "Total TPE2", ''),
    nonFactures: [],
    advances: [],
    charges: []
  };

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.clear();
    this.route.navigate(["/home"])
  }
}
