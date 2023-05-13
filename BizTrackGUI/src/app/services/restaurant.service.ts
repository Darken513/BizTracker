import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiUrl = 'https://biz-track.onrender.com/restaurant';

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<any> {
    return this.http.get<{ response: any }>(`${this.apiUrl}/getAll`);
  }
  getAllDetails(): Observable<any> {
    return this.http.get<{ response: any }>(`${this.apiUrl}/getAllwithDetails`);
  }
  getById(id:number): Observable<any> {
    return this.http.get<{ response: any }>(`${this.apiUrl}/get/${id}`);
  }
}
