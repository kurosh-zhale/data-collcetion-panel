import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { unsubscribe } from 'src/app/shared/utils/unsubscriber';
import { Subscription } from 'rxjs';
import { PopupService } from 'src/app/core/services/popup.service';
import { authErrorHandler } from '../../utils/error-handler';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  public forgot_password_form!: FormControl;
  public mobile: boolean = window.innerWidth < 420;

  constructor(
    private authServ: AuthenticationService,
    private popup: PopupService
  ) {}

  ngOnInit(): void {
    this.forgot_password_form = new FormControl<string>('', [
      Validators.required,
      Validators.email,
    ]);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    unsubscribe(this.subscriptions);
  }

  public sendEmail() {
    let subscription: Subscription = this.authServ
      .forgot_password_email(this.forgot_password_form.value)
      .subscribe({
        complete: () => {
          this.popup.open_popup('Email sent', 'success', {
            keepAfterRouteChange: false,
          });
        },

        error: (err) => {
          const error:string = authErrorHandler(err);

          this.popup.open_popup(error, 'error', { autoClose: false });
        },
      });

    this.subscriptions.push(subscription);
  }
}
