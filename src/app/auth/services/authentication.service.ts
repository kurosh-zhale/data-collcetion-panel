import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Subject, Observable, map, BehaviorSubject } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient, private sharedServ: SharedService) {}

  public login(body: any) {
    return this.http.post(environment.baseUrl + 'login', {
      ...body,
    });
  }

  public forgot_password_email(body: any) {
    return this.http.post(environment.baseUrl + 'reset_password', body);
  }

  public register(body: any) {
    return this.http.post(environment.baseUrl + 'register', {
      ...body,
      fax: '',
      postal_code: '',
      title: ' ',
      is_active: false,
      birth_date: '',
      user_img: '',
      role: '63e4f7d9deb5a344f34734f5',
    });
  }

  public confirm_user(token: string) {
    return this.http.get(environment.baseUrl + 'confirm/' + token);
  }

  public get_user_by_token(token: string | null) {
    return this.http.get(environment.baseUrl + 'userlogin/' + token);
  }

  public get_organizations() {
    return this.sharedServ.get_organizations();
  }
}
