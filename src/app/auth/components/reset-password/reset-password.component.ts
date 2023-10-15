import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordConfirmation } from '../../utils/validators';
import { AuthenticationService } from '../../services/authentication.service';
import { Subscription } from 'rxjs';
import { unsubscribe } from 'src/app/shared/utils/unsubscriber';
import { PopupService } from 'src/app/core/services/popup.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  public reset_form!: FormGroup;
  public reauth_form!: FormGroup;

  constructor(
    private authServ: AuthenticationService,
    private route: ActivatedRoute,
    private popup: PopupService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reset_form = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.min(10)]),
      confirm_password: new FormControl('', [
        Validators.required,
        PasswordConfirmation(),
      ]),
    });

    this.reauth_form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    unsubscribe(this.subscriptions);
  }

  public reset_password() {
    let subscribtion: Subscription = this.route.queryParams.subscribe(
      (params) => {
        const oobCode = params['oobCode'];
        const new_password: string = this.reset_form.get('password')?.value;

        let subscribtion: Subscription = this.authServ
          .reset_password(new_password, oobCode)
          .subscribe({
            complete: () => {
              this.popup.open_popup('password reset successfully', 'success', {
                autoClose: true,
                keepAfterRouteChange: true,
              });

              this.router.navigate(['auth/login']);
            },

            error: (err) => {
              this.popup.open_popup(err, 'error', { autoClose: true });
            },
          });

        this.subscriptions.push(subscribtion);
      }
    );
    this.subscriptions.push(subscribtion);
  }
}
