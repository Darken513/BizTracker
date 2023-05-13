import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://https://biz-track.onrender.com/employee';
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<any> {
    return this.http.get<{ response: any }>(`${this.apiUrl}/getAll`);
  }
  getAllByRestaurantId(id:number): Observable<any> {
    return this.http.get<{ response: any }>(`${this.apiUrl}/getByResturant/${id}`);
  }
}
