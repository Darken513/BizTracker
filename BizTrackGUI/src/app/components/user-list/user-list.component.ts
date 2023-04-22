import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ActivatedRoute } from '@angular/router';

const colors = ['#b1f44caf', '#f19898af', '#69e5a9af', '#cfe569af', '#f98263af', '#f198bfaf', '#989df1af']
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  employeesList: Array<any> = [];
  resId:number = -1;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private notifService: NotificationService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const resId:number = params.get('id')?parseInt(params.get('id')!):-1;
      this.resId = resId;
      if(resId==-1){
        this.notifService.showNotification("Error", "User doesnt exist");
        return;
      }
      this.employeeService.getAllByRestaurantId(resId).subscribe({
        next: (response: any) => {
          if (response.title && response.body) {
            this.notifService.showNotification(response.title, response.body);
            return;
          }
          this.employeesList = response.allEmployees;
        },
        error: (error: any) => {
          console.log(error)
        }
      });
    });
  }

  getColor(idx: number) {
    return colors[idx % colors.length];
  }

}