import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  forgot_password_form = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  constructor(
    private authServ: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public changeForm(form: string): void {
    this.router.navigate([`../${form}`]);
  }

  public sendEmail() {
    this.authServ.forgot_password_email({
      email: this.forgot_password_form.value,
    });
  }
}
