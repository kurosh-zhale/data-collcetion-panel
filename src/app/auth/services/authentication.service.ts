import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class AuthenticationService {
  constructor(private http:HttpClient) {}

  public PostLogin(body: any) {
    return this.http.post(`${environment.baseUrl}/login`, {
      ...body,
      remeber_me: true,
    });
  }
}
