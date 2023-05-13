import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://https://biz-track.onrender.com/auth';

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  public login(username: string, password: string, resId:number): Observable<any> {
    return this.http.post<{ response: any }>(`${this.apiUrl}/login`, { username, password, resId });
  }

  public setToken(token: string, dontNav?: boolean): void {
    localStorage.setItem('token', token);
    if (dontNav) return;
    this.router.navigateByUrl('/summary');
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
  }

  public getToken(): any {
    const token = localStorage.getItem('token');
    return token;
  }

  public getCurrentUser(): any {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken
    }
    return null;
  }

  signUp(email: string, password: string, username: string): Observable<any> {
    const body = { email, password, username };
    return this.http.post<any>(`${this.apiUrl}/signup`, body);
  }
}
