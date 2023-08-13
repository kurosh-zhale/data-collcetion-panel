import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, from, of } from 'rxjs';
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  getAuth,
  Auth,
  signInWithPopup,
} from '@angular/fire/auth';
@Injectable()
export class AuthenticationService {

  auth: Auth = getAuth();

  constructor(private http: HttpClient) {}

  public login_using_password(body: signIn): Observable<any> {
    return from(
      signInWithEmailAndPassword(this.auth, body.email, body.password)
    );
  }

  public register(body: signIn): Observable<any> {
    return from(
      createUserWithEmailAndPassword(this.auth, body.email, body.password)
    );
  }

  public login_using_github() {
    const githubAuth: GithubAuthProvider = new GithubAuthProvider();

    return from(signInWithPopup(this.auth, githubAuth));
  }

  public login_using_google(): Observable<any> {
    const googleAuth: GoogleAuthProvider = new GoogleAuthProvider();

    return from(signInWithPopup(this.auth, googleAuth));
  }

  public forgot_password_email(body: any) {
    return this.http.post(environment.baseUrl + 'reset_password', body);
  }

  public confirm_user(token: string) {
    return this.http.get(environment.baseUrl + 'confirm/' + token);
  }

  // I'm going to change this later.
  public get_organizations(): Observable<string[]> {
    return of(['ORG#1', 'ORG#2', 'ORG#3', 'ORG#4']);
  }
}

type signIn = {
  email: string;
  password: string;
};
