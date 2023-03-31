import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public login_form = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    remember_me: new FormControl(false),
  });

  form_is_invalid = false;

  constructor(
    private authServ: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  private addValidators() {
    this.login_form.get('username')?.addValidators([Validators.required]);
    this.login_form
      .get('password')
      ?.addValidators([Validators.required, Validators.minLength(10)]);
    this.login_form.get('username')?.updateValueAndValidity();
    this.login_form.get('password')?.updateValueAndValidity();
  }

  private login() {
    this.authServ.login(this.login_form.value).subscribe();
  }

  public submit() {
    this.addValidators();
    if (
      this.login_form.get('username')?.valid &&
      this.login_form.get('password')?.valid
    ) {
      this.login();
    }
  }
}
