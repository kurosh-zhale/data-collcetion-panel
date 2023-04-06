import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SharedService } from 'src/app/shared/services/shared.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServ: Partial<AuthenticationService>;
  let sharedServ: Partial<SharedService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthenticationService, userValue: authServ },
        { provide: SharedService, useValue: sharedServ },
      ],
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

    component.add_validators();

    expect(component.registeration_form.get('password')?.valid).toEqual(false);
  });

  it('should validate password confirmation', () => {
    component.registeration_form.get('password')?.setValue('ValidPassword1');
    component.registeration_form
      .get('confirm_password')
      ?.setValue('InvalidConfirmation');

    component.add_validators();

    expect(component.registeration_form.get('confirm_password')?.valid).toEqual(
      false
    );
  });
});
