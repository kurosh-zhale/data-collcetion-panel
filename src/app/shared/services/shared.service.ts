import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class SharedService {
  constructor(private http: HttpClient) {}

  public get userToken(): string | null {
    return localStorage.getItem('TOKEN');
  }

  public get_user_by_token() {
    return this.http.get(environment.baseUrl + 'userlogin/' + this.userToken);
  }

  public async set_token(token: string) {
    localStorage.setItem('TOKEN', token);
  }

  public remove_token() {
    localStorage.removeItem('TOKEN');
  }

  public get_organizations() {
    return this.http.get(environment.baseUrl + 'providers');
  }
}
