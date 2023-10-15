import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { unsubscribe } from 'src/app/shared/utils/unsubscriber';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  UserCredential,
} from '@angular/fire/auth';
import { PopupService } from 'src/app/core/services/popup.service';
import { authErrorHandler } from '../../utils/error-handler';
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
    private router: Router,
    private popup: PopupService,
  ) {}

  ngOnInit(): void {
    this.login_form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.min(10)]),
      remember_me: new FormControl(false),
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    unsubscribe(this.subscriptions);
  }

  private route_to_dashboard() {
    this.router.navigate(['../dashboard']);
  }

  private set_token(token: string) {
    this.sharedServ.set_token(token).then(() => this.route_to_dashboard());
  }

  private login_with_password() {
    let subscription: Subscription = this.authServ
      .login_using_password({
        password: this.login_form.value.password,
        email: this.login_form.value.username,
      })
      .subscribe({
        next: (userCredential: UserCredential) => {
          this.set_token(userCredential.user.uid);
        },

        complete: () => {
          this.popup.open_popup('Login successful 😉', 'success');
        },

        error: (err) => {
          const error:string = authErrorHandler(err);

          this.popup.open_popup(error, 'error');
        },
      });

    this.subscriptions.push(subscription);
  }

  private loging_with_google() {
    let subscribtion: Subscription = this.authServ
      .login_using_google()
      .subscribe({
        next: (res) => {
          const credential = GoogleAuthProvider.credentialFromResult(res);
          if (credential?.accessToken) this.set_token(credential.accessToken);
        },

        complete: () => {
          this.popup.open_popup('Login successful 😉', 'success');
        },

        error: (err) => {
          const error:string = authErrorHandler(err);

          this.popup.open_popup(error, 'error');
        },
      });

    this.subscriptions.push(subscribtion);
  }

  private login_with_github() {
    let subscribtion: Subscription = this.authServ
      .login_using_github()
      .subscribe({
        next: (res) => {
          const credential = GithubAuthProvider.credentialFromResult(res);
          if (credential?.accessToken) this.set_token(credential.accessToken);
        },

        complete: () => {
          this.popup.open_popup('Login successful 😉', 'success');
        },

        error: (err) => {
          const error:string = authErrorHandler(err);

          this.popup.open_popup(error, 'error');
        },
      });

    this.subscriptions.push(subscribtion);
  }

  public submit(mode: 'password' | 'google' | 'github') {
    if (mode === 'password') {
      this.login_with_password();
    } else if (mode === 'google') {
      this.loging_with_google();
    } else if (mode === 'github') {
      this.login_with_github();
    }
  }
}
