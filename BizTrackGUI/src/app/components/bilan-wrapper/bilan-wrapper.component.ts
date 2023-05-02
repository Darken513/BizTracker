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
    new Currency('../../assets/05franc.png', '0.5 Franc', 0.5, ''),
    new Currency('../../assets/1franc.png', '1 Franc', 1, ''),
    new Currency('../../assets/2franc.png', '2 Franc', 2, ''),
    new Currency('../../assets/5franc.png', '5 Franc', 5, ''),
    new Currency('../../assets/10franc.png', '10 Franc', 10, ''),
    new Currency('../../assets/20franc.png', '20 Franc', 20, ''),
    new Currency('../../assets/50franc.png', '50 Franc', 50, ''),
    new Currency('../../assets/100franc.png', '100 Franc', 100, ''),
    new Currency('../../assets/200franc.png', '200 Franc', 200, '')
  ];;
  bilanObj: any = {
    website: new FieldToFill('totalWebsite', "Total income from websites", ''),
    advance: new FieldToFill('advance', "Total advance", ''),
    tpe1: new FieldToFill('totalTpe1', "Total income from TPE1", ''),
    tpe2: new FieldToFill('totalTpe2', "Total income from TPE2", ''),
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
