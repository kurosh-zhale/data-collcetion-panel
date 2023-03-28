import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService],
      imports:[HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
