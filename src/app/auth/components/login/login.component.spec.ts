import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { LoginComponent } from './login.component';
import { NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedService } from 'src/app/shared/services/shared.service';

describe('LoginComponent Unit Tests', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: Partial<AuthenticationService>;
  let sharedServ: Partial<SharedService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: AuthenticationService, useValue: authService },{provide:SharedService, userValue:sharedServ}],
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create login form', () => {
    expect(component).toBeTruthy();
  });

  it('should have password validation', () => {
    component.submit();
    component.login_form.get('password')?.setValue('123');

    expect(component.login_form.get('password')?.valid).toEqual(false);
  });
});
