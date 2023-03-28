import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { LoginComponent } from './login.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

describe('LoginComponent Unit Tests', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [AuthenticationService],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create login form', () => {
    expect(component).toBeTruthy();
  });

  it('should have password validation', () => {
    component.login_form.get('password')?.setValue('123');

    expect(component.login_form.get('password')?.valid).toEqual(false);
  });

  it('should validate form on submission', () => {
    
  });
});

describe('LoginComponent Intergration Tests', () => {
  it('should submit with login request', () => {});
});
