import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from '../GLOBAL';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  signup(data): Observable<any> {
    return this.http.post(GLOBAL.HOST + GLOBAL.REGISTER_USER, data);
  }

  login(data): Observable<any> {
    return this.http.post(GLOBAL.HOST + GLOBAL.LOGIN, data);
  }

  currentUser(): Observable<any> {
    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  localStorage.getItem('token'))
    };
    return this.http.get<any>(GLOBAL.HOST + GLOBAL.CURRENT_USER, header);
  }
}
