import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [AuthenticationService],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate email', () => {
    component.forgot_password_form.setValue('Invalid_Email');

    expect(component.forgot_password_form.valid).toEqual(false);
  });
});
