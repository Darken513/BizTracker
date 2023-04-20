import { Component, OnInit } from '@angular/core';

const colors = ['#b1f44caf', '#f19898af', '#69e5a9af', '#cfe569af', '#f98263af', '#f198bfaf', '#989df1af']
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  employeesList: Array<any> = [
    new Employee(0,'Affes Achraf', "somewhere idk", '55411440'),
    new Employee(1,'Ahmed loukil', 'Rue Ibn Aljazzr, sfax', null),
    new Employee(2,'Foulen Fouleni', "somewhere idk", '55411440'),
    new Employee(3,'LBronze test', "somewhere idk", '55411440'),
    new Employee(4,'Morad mnif', 'Ave Habib Thameur, Sfax', '98564719'),
    new Employee(5,'Melek chaari', "somewhere idk", '55411440'),
  ]
  constructor() { }

  ngOnInit(): void {
  }

  getColor(idx: number) {
    return colors[idx % colors.length];
  }

}

class Employee {
  id: number;
  name: any;
  address: any;
  phoneNbr: any;
  constructor(id: number,name: any, address: any, phoneNbr: any) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.phoneNbr = phoneNbr;
  }
}
