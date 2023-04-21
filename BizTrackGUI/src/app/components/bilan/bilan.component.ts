import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bilan',
  templateUrl: './bilan.component.html',
  styleUrls: ['./bilan.component.scss']
})
export class BilanComponent implements OnInit {
  website: FieldToFill = new FieldToFill('totalWebsite', "Total income from websites", 0);
  advance: FieldToFill = new FieldToFill('advance', "Total advance", 0);
  tpe1: FieldToFill = new FieldToFill('totalTpe1', "Total income from TPE1", 0);
  tpe2: FieldToFill = new FieldToFill('totalTpe2', "Total income from TPE2", 0);
  fields: Array<FieldToFill> = [this.website, this.advance, this.tpe1, this.tpe2]
  charges: Array<any> = [{label:"test",value:0}, {label:"label2",value:0}]//new Array();
  newCharge:any = {label:"",value:0}
  constructor() { }

  ngOnInit(): void {
  }
  getChargesHeight(){
    return this.charges.length*40+120+'px'
  }
  getTotalCharges(){
    return this.charges.reduce((res, curr)=>res+curr.value, 0)+' Fr'
  }
  addCharge(){
    if(!this.newCharge.label && !this.newCharge.value){
      //display error
      return;
    }
    this.charges.push(this.newCharge);
    this.newCharge = {label:"",value:0};
  }
  deleteCharge(idx:number){
    this.charges.splice(idx, 1)
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
