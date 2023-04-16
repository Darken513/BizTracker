import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resturant-list',
  templateUrl: './resturant-list.component.html',
  styleUrls: ['./resturant-list.component.scss']
})
export class ResturantListComponent implements OnInit {
  resturantsList:Array<any> = ['res1','res2','res3','res4','res5']
  constructor() { }

  ngOnInit(): void {
  }

}
