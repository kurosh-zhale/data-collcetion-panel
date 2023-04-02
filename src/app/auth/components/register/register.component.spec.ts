import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate password', () => {
    component.registeration_form.get('password')?.setValue('123');

    component.addValidators('password');

    expect(component.registeration_form.get('password')?.valid).toEqual(false);
  });

  it('should validate password confirmation', () => {
    component.registeration_form.get('password')?.setValue('ValidPassword1');
    component.registeration_form
      .get('confirm_password')
      ?.setValue('InvalidConfirmation');

    component.addValidators('confirm_password');

    expect(component.registeration_form.get('confirm_password')?.valid).toEqual(
      false
    );
  });
});
