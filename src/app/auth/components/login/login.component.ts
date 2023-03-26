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
  });

  form_is_invalid = false;

  constructor(
    private authServ: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  private addValidators() {
    this.login_form.get('username')?.addValidators([Validators.required]);
    this.login_form.get('password')?.addValidators([Validators.required]);
    this.login_form.get('username')?.updateValueAndValidity();
    this.login_form.get('password')?.updateValueAndValidity();
  }

  public submit() {
    this.addValidators();
    if (this.login_form.get('username')?.valid) {
      this.login(this.login_form.value);
    }
  }

  private login(info: any) {
    this.authServ.PostLogin(info).subscribe((data)=>{
      
    })
  }
}
