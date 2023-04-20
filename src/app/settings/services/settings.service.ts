import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(
    private http: HttpClient,
    private sharedServ: SharedService,
    private router: Router
  ) {}

  get_organizations() {
    return this.sharedServ.get_organizations();
  }

  // will change after back-end update
  get_members() {
    return new Observable((suber) => {
      suber.next(null);
    });
  }

  create_organization(body: any) {
    return this.http.post(environment.baseUrl + 'new_provider', {
      name: body.name,
      short_form: body.short,
      address: {},
      email: body.email.trimEnd(),
      code: '',
    });
  }

  update_user(user: any) {
    return this.http.patch(environment.baseUrl + 'users/' + user._id, user);
  }

  navigate_to_Org(id: string) {
    this.router.navigate(['settings', 'organization', id], {
      skipLocationChange: false,
    });
  }
}
