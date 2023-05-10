import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FieldToFill } from 'src/app/Models/FieldToFill';
import * as _ from "lodash"
import { NotificationService } from 'src/app/services/notification.service';

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
    this.fields = [v.website, v.tpe1, v.tpe2];
  }

  public get bilanObj(): any {
    return this._bilanObj;
  }

  newCharge: any = { label: "", value: '' }
  newAdvance: any = { label: "", value: '' }
  newNfracture: any = { label: "", value: '' }

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
  }
  getallChargesHeight() {
    return parseFloat(this.getArrayHeight(this.bilanObj.charges)) + parseFloat(this.getArrayHeight(this.bilanObj.advances)) + parseFloat(this.getArrayHeight(this.bilanObj.nonFactures)) + 95 + "px"
  }
  getArrayHeight(array: Array<any>) {
    return array.length * 40 + 95 + 'px'
  }
  getTotalFromArray(array: Array<any>) {
    return array.reduce(
      (res: any, cur: any) => res + parseInt(cur.value ? cur.value : '0'),
      0
    );
  }
  addToArray(array: Array<any>, newElt: any) {
    if (!newElt.label.trim() || !parseFloat(newElt.value ? newElt.value : '0')) {
      //display error
      return;
    }
    array.push(_.cloneDeep(newElt));
    newElt.label = "";
    newElt.value = '';
  }
  deleteFromArray(array: Array<any>, idx: number) {
    array.splice(idx, 1)
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

// to-do
// get users => use a select options tag to display the user names for section advances
// maybe split it into 3 interfaces ( same interface but with 3 next btns )
// add validation in the submit method + notification for "0s"
// fix the restaurant + address name in the final report
// remove paddings for low resolutions (in all screens)