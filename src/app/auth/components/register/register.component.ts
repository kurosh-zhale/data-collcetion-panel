import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordConfirmation } from '../../utils/validators';
import { AuthenticationService } from '../../services/authentication.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { unsubscribe } from 'src/app/shared/utils/unsubscriber';
import { SharedService } from 'src/app/shared/services/shared.service';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  UserCredential,
} from '@angular/fire/auth';
import { UserProfile } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registeration_form!: FormGroup;

  organizations: string[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    public authServ: AuthenticationService,
    private sharedServ: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registeration_form = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,Validators.min(10)]),
      confirm_password: new FormControl('', [
        Validators.required,
        PasswordConfirmation(),
      ]),
      organization: new FormControl(''),
      phone: new FormControl(''),
      gender: new FormControl(''),
    });

    this.get_organizations();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    unsubscribe(this.subscriptions);
  }

  private get_organizations() {
    let subscribtion = this.authServ.get_organizations().subscribe({
      next: (data: string[]) => {
        this.organizations.push(...data);
      },
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

  private register_with_password() {
    const value = this.registeration_form.value;
    const model: UserProfile = {
      first_name: value.first_name,
      last_name: value.last_name,
      username: value.username,
      email: value.email,
      password: value.password,
      gender: value.gender,
      organization: value.organization,
      phone: value.phone,
    };

    let subscribtion: Subscription = this.authServ.register(model).subscribe({
      next: () => {
        alert('please verify your email');
      },

      error: (err) => {
        throw Error(err);
      },
    });

    this.subscriptions.push(subscribtion);
  }

  private login_with_google() {
    let subscribtion: Subscription = this.authServ
      .login_using_google()
      .subscribe({
        next: (userCredential: UserCredential) => {
          const credential =
            GoogleAuthProvider.credentialFromResult(userCredential);
          if (credential?.accessToken) this.set_token(credential.accessToken);
        },
        error: (err) => {
          throw Error(err);
        },
      });

    this.subscriptions.push(subscribtion);
  }

  private login_with_github() {
    let subscribtion: Subscription = this.authServ
      .login_using_github()
      .subscribe({
        next: (userCredential: UserCredential) => {
          const credential =
            GithubAuthProvider.credentialFromResult(userCredential);
          if (credential?.accessToken) this.set_token(credential.accessToken);
        },
        error: (err) => {
          throw Error(err);
        },
      });

    this.subscriptions.push(subscribtion);
  }

  // async add_validators() {
  //   this.registeration_form
  //     .get('password')
  //     ?.addValidators([Validators.required, Validators.minLength(10)]);
  //   this.registeration_form.get('password')?.updateValueAndValidity();
  //   this.registeration_form
  //     .get('confirm_password')
  //     ?.addValidators([Validators.required, PasswordConfirmation()]);
  //   this.registeration_form.get('confirm_password')?.updateValueAndValidity();
  //   this.registeration_form
  //     .get('first_name')
  //     ?.addValidators([Validators.required]);
  //   this.registeration_form.get('first_name')?.updateValueAndValidity();
  //   this.registeration_form
  //     .get('last_name')
  //     ?.addValidators([Validators.required]);
  //   this.registeration_form.get('last_name')?.updateValueAndValidity();
  //   this.registeration_form
  //     .get('username')
  //     ?.addValidators([Validators.required]);
  //   this.registeration_form.get('username')?.updateValueAndValidity();
  //   this.registeration_form.get('email')?.addValidators([Validators.required]);
  //   this.registeration_form.get('email')?.updateValueAndValidity();
  //   this.registeration_form
  //     .get('organization')
  //     ?.addValidators([Validators.required]);
  //   this.registeration_form.get('organization')?.updateValueAndValidity();
  // }

  submitform(mode: 'password' | 'google' | 'github' = 'password') {
    if (mode === 'password') {
      if (this.registeration_form.valid) this.register_with_password();
      else throw Error('form invalid');
    } else if (mode === 'google') {
      this.login_with_google();
    } else if (mode === 'github') {
      this.login_with_github();
    }
  }
}
