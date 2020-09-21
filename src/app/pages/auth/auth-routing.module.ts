import { AuthGuard } from './../../_shared/services/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyUserComponent } from './verify-user/verify-user.component';


const routes: Routes = [
  {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full',
  },
{
    path: '',
    children: [
        {
            path: 'login',
            component: LoginComponent,
            data: {
                title: 'Add Task Template'
            }
        },
        {
            path: 'register',
            component: RegisterComponent,
            data: {
                title: 'Edit Task Template'
            }
        },
        {
            path: 'forgot-password',
            component:ForgotPasswordComponent,
            data: {
                title: 'Task Templates'
            }
        },
        {
            path: 'reset-password/:id',
            component:ResetPasswordComponent,
            data: {
                title: 'Task Templates'
            }
        },
            {
            path: 'verify-user/:id',
            component:VerifyUserComponent,
            data: {
                title: 'Task Templates'
            }
        },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
