import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordConfirmation } from '../../utils/validators';
import { AuthenticationService } from '../../services/authentication.service';
import { BehaviorSubject, Observable, Subject, Subscription, map } from 'rxjs';
import { Router } from '@angular/router';
import { unsubscribe } from 'src/app/shared/utils/unsubscriber';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registeration_form = new FormGroup({
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirm_password: new FormControl(''),
    phone: new FormControl(''),
    gender: new FormControl(''),
    organization: new FormControl(''),
  });

  organizations: any;

  private subscriptions: Subscription[] = [];

  constructor(
    public authServ: AuthenticationService,
    private sharedServ: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.get_organizations();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    unsubscribe(this.subscriptions);
  }

  private get_organizations() {
    let subscribtion = this.authServ
      .get_organizations()
      .pipe(
        map((data: any) => {
          const { providers } = data;

          return providers.map((provider: any) => {
            return {
              name: provider.name,
              value: provider._id,
            };
          });
        })
      )
      .subscribe((data: any) => {
        this.organizations = data;
      });

    this.subscriptions.push(subscribtion);
  }

  private route_to_email_confirmation(token: string) {
    this.router.navigate([`./e-conf/${token}`]);
  }

  private set_token(token: string) {
    this.sharedServ
      .set_token(token)
      .then(() => this.route_to_email_confirmation(token));
  }

  private login() {
    const loginInfo = {
      username: this.registeration_form.get('username')?.value,
      password: this.registeration_form.get('password')?.value,
    };
    let subscription = this.authServ
      .login(loginInfo)
      .subscribe(({ token, message }: any) => {
        if (message === 'Login Successful') this.set_token(token);
      });

    this.subscriptions.push(subscription);
  }

  private register() {
    const email = this.registeration_form.get('email')?.value?.trimEnd();
    let subscribtion = this.authServ
      .register({ ...this.registeration_form.value, email: email })
      .subscribe(() => this.login());

    this.subscriptions.push(subscribtion);
  }

  async add_validators() {
    this.registeration_form
      .get('password')
      ?.addValidators([Validators.required, Validators.minLength(10)]);
    this.registeration_form.get('password')?.updateValueAndValidity();
    this.registeration_form
      .get('confirm_password')
      ?.addValidators([Validators.required, PasswordConfirmation()]);
    this.registeration_form.get('confirm_password')?.updateValueAndValidity();
    this.registeration_form
      .get('first_name')
      ?.addValidators([Validators.required]);
    this.registeration_form.get('first_name')?.updateValueAndValidity();
    this.registeration_form
      .get('last_name')
      ?.addValidators([Validators.required]);
    this.registeration_form.get('last_name')?.updateValueAndValidity();
    this.registeration_form
      .get('username')
      ?.addValidators([Validators.required]);
    this.registeration_form.get('username')?.updateValueAndValidity();
    this.registeration_form.get('email')?.addValidators([Validators.required]);
    this.registeration_form.get('email')?.updateValueAndValidity();
    this.registeration_form
      .get('organization')
      ?.addValidators([Validators.required]);
    this.registeration_form.get('organization')?.updateValueAndValidity();
  }

  submitform() {
    this.add_validators().then(() => {
      if (this.registeration_form.valid) this.register();
    });
  }
}
