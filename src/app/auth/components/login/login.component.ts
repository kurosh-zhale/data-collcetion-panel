import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { unsubscribe } from 'src/app/shared/utils/unsubscriber';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public login_form!: FormGroup;
  form_is_invalid = false;

  private subscriptions: Subscription[] = [];

  public mobile: boolean = window.innerWidth < 420;

  constructor(
    private authServ: AuthenticationService,
    private sharedServ: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.login_form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      remember_me: new FormControl(false),
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    unsubscribe(this.subscriptions);
  }

  private add_validators() {
    this.login_form.get('username')?.addValidators([Validators.required]);
    this.login_form
      .get('password')
      ?.addValidators([Validators.required, Validators.minLength(10)]);
    this.login_form.get('username')?.updateValueAndValidity();
    this.login_form.get('password')?.updateValueAndValidity();
  }

  private route_to_dashboard() {
    this.router.navigate(['../dashboard']);
  }

  private set_token(token: string) {
    this.sharedServ.set_token(token).then(() => this.route_to_dashboard());
  }

  private login() {
    let subscription = this.authServ
      .login({
        password: this.login_form.value.password,
        email: this.login_form.value.username,
      })
      .subscribe({
        next() {
          console.log(this);
        },
        error(err) {},
      });

    this.subscriptions.push(subscription);
  }

  public submit() {
    this.login();
  }
}
