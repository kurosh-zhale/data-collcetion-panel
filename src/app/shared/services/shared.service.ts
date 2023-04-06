import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class SharedService {
  constructor(private http: HttpClient) {}

  get_user_profile(token:string) {
    this.http.get(environment.baseUrl+'userlogin/'+token);
  }

  public get userToken(): string | null {
    return localStorage.getItem('TOKEN');
  }

  public async set_token(token: string) {
    localStorage.setItem('TOKEN', token);
  }

  public remove_token() {
    localStorage.removeItem('TOKEN');
  }
}
