import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordConfirmation } from '../../utils/validators';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registeration_form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    confirm_password: new FormControl('', [
      Validators.required,
      PasswordConfirmation(),
    ]),
    phone: new FormControl(''),
    gender: new FormControl('', []),
  });

  constructor(private authServ: AuthenticationService) {}

  ngOnInit(): void {}

  register() {
    if (this.registeration_form.valid)
    this.authServ.register(this.registeration_form.value).subscribe();
  }
}
