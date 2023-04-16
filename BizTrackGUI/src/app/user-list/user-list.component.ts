import { Component, OnInit } from '@angular/core';

const colors = ['#b1f44caf', '#f19898af', '#69e5a9af', '#cfe569af', '#f98263af', '#f198bfaf', '#989df1af']
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  employeesList: Array<any> = [
    new Employee('Affes Achraf', "somewhere idk", '55411440'),
    new Employee('Ahmed loukil', 'Rue Ibn Aljazzr, sfax', null),
    new Employee('Foulen Fouleni', "somewhere idk", '55411440'),
    new Employee('LBronze test', "somewhere idk", '55411440'),
    new Employee('Morad mnif', 'Ave Habib Thameur, Sfax', '98564719'),
    new Employee('Melek chaari', "somewhere idk", '55411440'),
  ]
  constructor() { }

  ngOnInit(): void {
  }

  getColor(idx: number) {
    return colors[idx % colors.length];
  }

}

class Employee {
  name: any;
  address: any;
  phoneNbr: any;
  constructor(name: any, address: any, phoneNbr: any) {
    this.name = name;
    this.address = address;
    this.phoneNbr = phoneNbr;
  }
}
