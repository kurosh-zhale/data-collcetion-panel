import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class DashboardService {
  constructor(private http: HttpClient, private sharedServ: SharedService) {}

  get_dataitems() {
    return this.http.get(environment.baseUrl + 'dataitems');
  }

  get_projects() {
    return this.sharedServ.get_projects();
  }


  async logout() {
    localStorage.removeItem('TOKEN');
  }
}
