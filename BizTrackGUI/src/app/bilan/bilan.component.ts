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
  fields: Array<FieldToFill> = [this.website, this.website, this.advance, this.tpe1, this.tpe2]
  charges: Array<any> = new Array();
  newCharge:any = {label:"",value:0}
  constructor() { }

  ngOnInit(): void {
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
