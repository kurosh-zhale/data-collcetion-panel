import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  public login(body: any) {
    return this.http.post(`${environment.baseUrl}/login`, {
      ...body,
      remeber_me: true,
    });
  }

  public forgot_password_email(body: any) {
    return this.http.post(`${environment.baseUrl}/reset_password`, body);
  }

  public register(body: any) {
    return this.http.post(`${environment.baseUrl}/register`, body);
  }
}
