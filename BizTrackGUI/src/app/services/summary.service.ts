import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  private apiUrl = 'https://biz-track.onrender.com/summary';

  constructor(
    private http: HttpClient
  ) { }

  save(details: any): Observable<any> {
    return this.http.post<{ response: any }>(`${this.apiUrl}/save`, details);
  }
}
