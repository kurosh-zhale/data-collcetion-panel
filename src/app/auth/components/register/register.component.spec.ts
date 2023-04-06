import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import {
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { SharedModule } from 'src/app/shared/shared.module';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServ: Partial<AuthenticationService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule, SharedModule],
      providers: [{ provide: AuthenticationService, userValue: authServ }],
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
