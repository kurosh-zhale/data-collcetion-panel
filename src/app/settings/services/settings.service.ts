import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private http: HttpClient, private sharedServ: SharedService) {}

  get_organizations() {
    return this.sharedServ.get_organizations();
  }

  create_organization() {
    return this.http.post(environment.baseUrl + 'providers', {});
  }
}
