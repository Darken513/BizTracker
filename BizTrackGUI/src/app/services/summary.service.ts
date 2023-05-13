import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  private apiUrl = 'http://localhost:80/summary';

  constructor(
    private http: HttpClient
  ) { }

  save(details: any): Observable<any> {
    return this.http.post<{ response: any }>(`${this.apiUrl}/save`, details);
  }
}
