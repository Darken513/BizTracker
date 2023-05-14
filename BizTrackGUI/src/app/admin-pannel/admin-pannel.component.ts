import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { NotificationService } from '../services/notification.service';
import { HttpClient } from '@angular/common/http';
import { Currency } from '../Models/Currency';

@Component({
  selector: 'app-admin-pannel',
  templateUrl: './admin-pannel.component.html',
  styleUrls: ['./admin-pannel.component.scss'],
})
export class AdminPannelComponent implements OnInit {
  restaurants: Array<any> = [];
  defaultEmail: string = "";
  selectedResturant: any;
  resEditField: number = -1;
  selectedUser: any;
  userEditField: number = -1;
  //todo banknotes should be a part of a resturant data not a static list
  banknotes: Array<Currency> = [
    new Currency('../../assets/005CHF.png', '0.05 CHF', 0.05, ''),
    new Currency('../../assets/020CHF.png', '0.10 CHF', 0.1, ''),
    new Currency('../../assets/010CHF.png', '0.20 CHF', 0.2, ''),
    new Currency('../../assets/05CHF.png', '0.5 CHF', 0.5, ''),
    new Currency('../../assets/1CHF.png', '1 CHF', 1, ''),
    new Currency('../../assets/2CHF.png', '2 CHF', 2, ''),
    new Currency('../../assets/5CHF.png', '5 CHF', 5, ''),
    new Currency('../../assets/10CHF.png', '10 CHF', 10, ''),
    new Currency('../../assets/20CHF.png', '20 CHF', 20, ''),
    new Currency('../../assets/50CHF.png', '50 CHF', 50, ''),
    new Currency('../../assets/100CHF.png', '100 CHF', 100, ''),
    new Currency('../../assets/200CHF.png', '200 CHF', 200, '')
  ];

  constructor(
    private http: HttpClient,
    private restaurantService: RestaurantService,
    private notifService: NotificationService
  ) { }

  getTotalValue() {
    return this.banknotes.reduce((toret: number, curr: Currency) => {
      toret += curr.value * parseFloat(curr.nbr ? curr.nbr : '0');
      return toret;
    }, 0)
  }
  reduceCurrency(currency: any) {
    const currentNbr = parseFloat(currency.nbr ? currency.nbr : 0);
    if (currentNbr > 0)
      currency.nbr = (currentNbr - 1).toString()
  }
  increaseCurrency(currency: any) {
    const currentNbr = parseFloat(currency.nbr ? currency.nbr : 0);
    currency.nbr = (currentNbr + 1).toString()
  }
  onKeyPress(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  submit() {
    //this.onSubmit.emit(true);
  }

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
      (user: any) => user.id == event.target.value
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
  onUserFieldSubmit(event: any) {
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
