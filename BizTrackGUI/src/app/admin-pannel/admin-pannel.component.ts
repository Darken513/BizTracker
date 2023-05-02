import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { NotificationService } from '../services/notification.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-pannel',
  templateUrl: './admin-pannel.component.html',
  styleUrls: ['./admin-pannel.component.scss'],
})
export class AdminPannelComponent implements OnInit {
  restaurants: Array<any> = [];
  defaultEmail:string = "";
  selectedResturant: any;
  resEditField: number = -1;
  selectedUser: any;
  userEditField: number = -1;
  constructor(
    private http: HttpClient,
    private restaurantService: RestaurantService,
    private notifService: NotificationService
  ) { }
  /*
{
    "id": 1,
    "password": "$2b$10$jG0qOXRa5bU9RA1LDZhS0O8pJKOWZ89EtP3EceyNlDzgWZ0a2Cgwi",
    "email": "affesachraf70@gmail.com",
    "username": "Affes Achraf",
    "address": "Gremda km9",
    "phone": "+21644112277",
    "restaurantId": 1,
    "created_at": "2023-04-21 01:48:40"
}
*/
  ngOnInit(): void {
    this.restaurantService.getAllDetails().subscribe({
      next: (response: any) => {
        if (response.title && response.body) {
          this.notifService.showNotification(response.title, response.body);
          return;
        }
        this.restaurants = response.restaurants;
        this.selectedResturant = this.restaurants[0];
        this.selectedUser = !this.selectedResturant
          ? undefined
          : this.selectedResturant.users
            ? this.selectedResturant.users[0]
            : undefined;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  onResturantChange(event: any) {
    this.selectedResturant = this.restaurants.find(
      (res) => res.id == event.target.value
    );
    this.selectedUser = !this.selectedResturant
      ? undefined
      : this.selectedResturant.users
        ? this.selectedResturant.users[0]
        : undefined;
  }
  onuserChange(event: any) {
    this.selectedUser = this.selectedResturant.users.find(
      (user:any) => user.id == event.target.value
    );
  }
  onResFieldSubmit(event: any) {
    switch (this.resEditField) {
      case 0:
        this.selectedResturant.name =
          event.target.parentNode.parentNode.children[1].value;
        break;
      case 1:
        this.selectedResturant.address =
          event.target.parentNode.parentNode.children[1].value;
        break;
      case 2:
        this.selectedResturant.phone =
          event.target.parentNode.parentNode.children[1].value;
        break;
      default:
        break;
    }
    this.resEditField = -1;
  }
  onUserFieldSubmit(event:any){
    switch (this.userEditField) {
      case 0:
        this.selectedUser.address =
          event.target.parentNode.parentNode.children[1].value;
        break;
      case 1:
        this.selectedUser.phone =
          event.target.parentNode.parentNode.children[1].value;
        break;
      case 2:
        let pw = event.target.parentNode.parentNode.children[1].value
        this.selectedUser.password = pw ? pw : this.selectedUser.password;
        break;
      default:
        break;
    }
    this.userEditField = -1;
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedResturant.img = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onUpload() {
    const formData = new FormData();
    formData.append(
      'file',
      this.dataURItoBlob(this.selectedResturant.imgimageUrl),
      'image.jpg'
    );
    this.http.post('https://example.com/upload', formData).subscribe(
      (response: any) => console.log('Upload successful:', response),
      (error: any) => console.error('Upload error:', error)
    );
  }

  private dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
}
