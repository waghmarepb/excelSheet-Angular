import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './_shared/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './_shared/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './_shared/services/auth.guard'

const routes: Routes =[
  {
    path: '',
    redirectTo: 'dashboard/default',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: './pages/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'users',
        loadChildren: './pages/users/users.module#UsersModule'
      },
      {
        path: 'people',
        loadChildren: './pages/people/people.module#PeopleModule'
      },
      {
        path: 'glc',
        loadChildren: './pages/glc/glc.module#GlcModule'
      },
      {
        path: 'profile',
        loadChildren: './pages/profile/profile.module#ProfileModule'
      }
    ],
    canActivate:[AuthGuard]
  }, {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: './pages/auth/auth.module#AuthModule'
      }
    ]
  }, {
    path: '**',
    redirectTo: 'dashboard/default'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
