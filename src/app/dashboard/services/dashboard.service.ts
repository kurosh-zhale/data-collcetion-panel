import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { environment } from 'src/environments/environment';
import { Auth, getAuth, signOut } from '@angular/fire/auth';

@Injectable()
export class DashboardService {
  private auth: Auth = getAuth();

  constructor(private http: HttpClient, private sharedServ: SharedService) {}

  get_dataitems() {
    return this.http.get(environment.baseUrl + 'dataitems');
  }

  get_projects() {
    return this.sharedServ.get_projects();
  }

  async logout() {
    signOut(this.auth).then(() => localStorage.removeItem('TOKEN'));
  }
}
