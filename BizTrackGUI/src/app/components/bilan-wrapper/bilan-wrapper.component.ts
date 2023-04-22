import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bilan-wrapper',
  templateUrl: './bilan-wrapper.component.html',
  styleUrls: ['./bilan-wrapper.component.scss']
})
export class BilanWrapperComponent implements OnInit {

  banknotes: any = null;
  bilanObj: any = null;
  
  constructor() { }

  ngOnInit(): void {
  }

}
