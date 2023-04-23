import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FieldToFill } from 'src/app/Models/FieldToFill';

@Component({
  selector: 'app-bilan',
  templateUrl: './bilan.component.html',
  styleUrls: ['./bilan.component.scss']
})
export class BilanComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<any>();
  private _bilanObj: any;
  fields: Array<FieldToFill> = []

  @Input()
  public set bilanObj(v: any) {
    this._bilanObj = v;
    this.fields = [v.website, v.advance, v.tpe1, v.tpe2];
  }

  public get bilanObj(): any {
    return this._bilanObj;
  }


  newCharge: any = { label: "", value: '' }
  constructor(
  ) { }

  ngOnInit(): void {
  }
  getChargesHeight() {
    return this.bilanObj.charges.length * 40 + 120 + 'px'
  }
  getTotalCharges() {
    return this.bilanObj.charges.reduce((res: any, curr: any) => res + parseFloat(curr.value ? curr.value : '0'), 0) + ' Fr'
  }
  addCharge() {
    if (!this.newCharge.label && !parseFloat(this.newCharge.value ? this.newCharge.value : '0')) {
      //display error
      return;
    }
    this.bilanObj.charges.push(this.newCharge);
    this.newCharge = { label: "", value: '' };
  }
  deleteCharge(idx: number) {
    this.bilanObj.charges.splice(idx, 1)
  }
  submit() {
    this.onSubmit.emit(true)
  }
  onKeyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
