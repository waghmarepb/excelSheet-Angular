import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyUserComponent } from './verify-user/verify-user.component'

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'src/app/_shared/shared-components/shared-components.module';



@NgModule({
  declarations: [
     LoginComponent,
     RegisterComponent,
     ResetPasswordComponent,
    ForgotPasswordComponent,
    VerifyUserComponent
    ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule
  ]
})
export class AuthModule { }
