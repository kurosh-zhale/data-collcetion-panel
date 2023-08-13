import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthRoutingModule } from './routes/auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { Auth, getAuth, provideAuth } from '@angular/fire/auth';
@NgModule({
  declarations: [
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    provideAuth(() => getAuth()),
  ],
  providers: [AuthenticationService],
})
export class AuthModule {
  private auth:Auth = inject(Auth);
}
