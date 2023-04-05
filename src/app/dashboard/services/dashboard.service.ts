import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class DashboardService {
  constructor(private http: HttpClient) {}

  get_dataitems() {
    return this.http.get(environment.baseUrl + 'dataitems');
  }

  get_projects() {
    return this.http.get(environment.baseUrl + 'projects');
  }

  logout() {
    localStorage.removeItem('TOKEN');
  }
}
