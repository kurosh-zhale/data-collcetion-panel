import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap, switchMap } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class DashboardService {
  constructor(private http: HttpClient, private sharedServ: SharedService) {}

  get_dataitems() {
    return this.http.get(environment.baseUrl + 'dataitems');
  }

  get_projects() {
    return this.http.get(environment.baseUrl + 'projects');
  }

  add_project(name: string | null) {
    return this.sharedServ.get_user_by_token().pipe(
      switchMap(({ _id }: any) => {
        return this.http.post(environment.baseUrl + 'new_project', {
          name: name,
          owner: _id,
        });
      })
    );
  }

  async logout() {
    localStorage.removeItem('TOKEN');
  }
}
