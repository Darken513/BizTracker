import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {
  defaultImgPath: string = "./../../../assets/defaultRestaurantBG.jpg"
  restaurantsList: Array<any> = [];
  constructor(
    private restaurantService: RestaurantService,
    private notifService: NotificationService
  ) { }

  ngOnInit(): void {
    this.restaurantService.getAll().subscribe({
      next: (response: any) => {
        if (response.title && response.body) {
          this.notifService.showNotification(response.title, response.body);
          return;
        }
        this.restaurantsList = response.restaurants;
      },
      error: (error: any) => {
        console.log(error)
      }
    });
  }
}