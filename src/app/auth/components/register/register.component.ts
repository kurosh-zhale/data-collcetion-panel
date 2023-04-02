import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordConfirmation } from '../../utils/validators';
import { AuthenticationService } from '../../services/authentication.service';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';

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

  constructor(public authServ: AuthenticationService) {}

  ngOnInit(): void {
    this.get_organizations();
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

    if (this.organizations) subscribtion.unsubscribe();
  }

  private login(token:string) {
    const loginInfo = {
      username: this.registeration_form.get('username')?.value,
      password: this.registeration_form.get('password')?.value,
    };
    this.authServ.login(loginInfo).subscribe(()=>this.authServ.setToken(token))
  }

  private register() {
    const email = this.registeration_form.get('email')?.value?.trimEnd();
    this.authServ
      .register({ ...this.registeration_form.value, email: email })
      .subscribe((data:any) => {
        this.login(data);
      });
  }

  addValidators(field: string) {
    if (field === 'password') {
      this.registeration_form
        .get(field)
        ?.addValidators([Validators.required, Validators.minLength(10)]);
    } else if (field === 'confirm_password') {
      this.registeration_form
        .get(field)
        ?.addValidators([Validators.required, PasswordConfirmation()]);
    } else {
      this.registeration_form.get(field)?.addValidators([Validators.required]);
    }
    this.registeration_form
      .get(field)
      ?.updateValueAndValidity({ onlySelf: true });
  }

  submitform() {
    if (this.registeration_form.valid) this.register();
  }
}
