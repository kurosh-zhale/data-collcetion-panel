import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SettingsService } from 'src/app/settings/services/settings.service';
import { unsubscribe } from 'src/app/shared/utils/unsubscriber';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.scss'],
})
export class AddOrganizationComponent implements OnInit {
  add_organization_form = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    short: new FormControl(''),
    address: new FormControl(''),
  });

  private subscriptions: Subscription[] = [];

  constructor(private settingsServ: SettingsService, private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    unsubscribe(this.subscriptions);
  }

  private refresh_page() {
    this.router
      .navigateByUrl('settings/profile', { skipLocationChange: true })
      .then(() => this.router.navigate(['settings/organizations']));
  }

  private create_organization() {
    let subscription = this.settingsServ
      .create_organization(this.add_organization_form.value)
      .subscribe(() => this.refresh_page());

    this.subscriptions.push(subscription);
  }

  private add_validators() {
    this.add_organization_form
      .get('name')
      ?.addValidators([Validators.required]);
    this.add_organization_form.get('name')?.updateValueAndValidity();
    this.add_organization_form
      .get('short')
      ?.addValidators([Validators.required]);
    this.add_organization_form.get('short')?.updateValueAndValidity();
    this.add_organization_form
      .get('email')
      ?.addValidators([Validators.required]);
    this.add_organization_form.get('email')?.updateValueAndValidity();
  }

  submit() {
    this.add_validators();
    if (this.add_organization_form.valid) {
      this.create_organization();
    }
  }
}
