import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resturant-list',
  templateUrl: './resturant-list.component.html',
  styleUrls: ['./resturant-list.component.scss']
})
export class ResturantListComponent implements OnInit {
  resturantsList: Array<any> = [
    new Resturant('Le Barbecue', 'https://images.immediate.co.uk/production/volatile/sites/2/2017/09/Meat-shot-steak.jpg?resize=960,872', 'Ave Habib Thameur, Sfax', '98564719'),
    new Resturant('Aroos lebanon', 'https://www.willflyforfood.net/wp-content/uploads/2021/06/lebanese-food-kafta.jpg.webp', 'Rue Ibn Aljazzr, sfax', '22314719'),
    new Resturant('Pizzaria lBronze', 'https://media.istockphoto.com/id/1349560847/photo/sausage-and-vegetable-pizza-on-dark-background.jpg?s=170667a&w=0&k=20&c=WHhRFMeB6GmjqqT98xkcibuOFARSEEU-07FIHRNh-ZE=', "somewhere idk", '55411440'),
  ]
  constructor() { }

  ngOnInit(): void {
  }

}

class Resturant {
  name: any;
  img: any;
  location: any;
  phoneNbr: any;
  constructor(name: any, img: any, location: any, phoneNbr: any) {
    this.name = name
    this.img = img
    this.location = location
    this.phoneNbr = phoneNbr
  }
}
