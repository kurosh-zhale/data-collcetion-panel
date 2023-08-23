import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordConfirmation } from '../../utils/validators';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { unsubscribe } from 'src/app/shared/utils/unsubscriber';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  public reset_form!: FormGroup;

  constructor(
    private authServ: AuthenticationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.reset_form = new FormGroup({
      new_password: new FormControl('', [
        Validators.required,
        Validators.min(10),
      ]),
      confirm_password: new FormControl('', [
        Validators.required,
        PasswordConfirmation(),
      ]),
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    unsubscribe(this.subscriptions);
  }

  // public reset_password(){
  //   let subscribtion:Subscription = this.authServ.reset_password()
  // }
}
