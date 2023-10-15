import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, from, of } from 'rxjs';
import {
  getAuth,
  Auth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
  AuthCredential,
  sendEmailVerification,
  sendPasswordResetEmail,
  updatePassword,
  confirmPasswordReset,
  verifyPasswordResetCode,
  User,
} from '@angular/fire/auth';
import {
  getFirestore,
  Firestore,
  doc,
  setDoc,
  DocumentData,
} from '@angular/fire/firestore';
import { UserProfile } from 'src/app/shared/interfaces/user.interface';

@Injectable()
export class AuthenticationService {
  private db: Firestore = inject(Firestore);

  private auth: Auth = getAuth();

  constructor(private http: HttpClient) {}

  public login_using_password(body: {
    email: string;
    password: string;
  }): Observable<UserCredential> {
    return from(
      signInWithEmailAndPassword(this.auth, body.email, body.password)
    );
  }

  public add_user(body: UserProfile): void {
    if (this.auth.currentUser)
      setDoc(doc(this.db, 'users', this.auth.currentUser.uid), body);
  }

  public register(body: UserProfile): Observable<void> {
    return from(
      createUserWithEmailAndPassword(this.auth, body.email, body.password).then(
        () => {
          if (this.auth.currentUser) {
            sendEmailVerification(this.auth.currentUser);
            this.add_user(body);
          }
        }
      )
    );
  }

  public login_using_github(): Observable<UserCredential> {
    const githubAuth: GithubAuthProvider = new GithubAuthProvider();

    return from(signInWithPopup(this.auth, githubAuth));
  }

  public login_using_google(): Observable<UserCredential> {
    const googleAuth: GoogleAuthProvider = new GoogleAuthProvider();

    return from(signInWithPopup(this.auth, googleAuth));
  }

  public forgot_password_email(email: string): Observable<void> {
    return from(sendPasswordResetEmail(this.auth, email));
  }

  public reset_password(new_password: string, oobCode: string) {
    return of(confirmPasswordReset(this.auth, oobCode, new_password));
  }

  public confirm_user(token: string) {
    return this.http.get(environment.baseUrl + 'confirm/' + token);
  }

  // I'm going to change this later.
  public get_organizations(): Observable<string[]> {
    return of(['ORG#1', 'ORG#2', 'ORG#3', 'ORG#4']);
  }
}
