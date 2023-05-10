import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FieldToFill } from 'src/app/Models/FieldToFill';
import * as _ from "lodash"
import { NotificationService } from 'src/app/services/notification.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-bilan',
  templateUrl: './bilan.component.html',
  styleUrls: ['./bilan.component.scss']
})
export class BilanComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<any>();
  private _bilanObj: any;
  @Output() pageIdx_change = new EventEmitter<number>();
  @Input() page_idx:number=1;
  fields: Array<FieldToFill> = [];
  users: Array<string> = [];

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
    private employeeService: EmployeeService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    //to-do : this should by restaurant ( future work / refactor )
    this.employeeService.getAll().subscribe((res)=>{
      this.users = res.allEmployees.map((user:any)=>user.username)
      this.newAdvance.label = this.users[0]
    })
  }
  getallChargesHeight() {
    return 'calc(' + (parseFloat(this.getArrayHeight(this.bilanObj.charges)) + parseFloat(this.getArrayHeight(this.bilanObj.advances)) + parseFloat(this.getArrayHeight(this.bilanObj.nonFactures))) + "px + 5rem)"
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
    if(this.page_idx == 1){
      if(this.bilanObj.tpe1.value === '' || this.bilanObj.tpe2.value === ''){
        this.notificationService.showNotification('error','Veillez à remplir toutes les cases !');
        return;
      }
    }
    if(this.page_idx == 2){
      if(this.bilanObj.website.value === '' || this.bilanObj.totalJusteat.value === ''){
        this.notificationService.showNotification('error','Veillez à remplir toutes les cases !');
        return;
      }
    }
    if(this.page_idx==3)
      this.onSubmit.emit(true)
    this.page_idx += 1;
    this.pageIdx_change.emit(this.page_idx);
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
// fix the restaurant + address name in the final report
// send mail & save the details as a single json somewhere -> could help in future work