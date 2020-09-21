import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { HttpConfigInterceptor} from './_shared/services/http-interceptor.service';
import { AdminLayoutComponent } from './_shared/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './_shared/layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule   } from 'ngx-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ToastrModule } from 'ngx-toastr';
import { ChangePasswordComponent } from './_shared/layouts/modal-components/change-password/change-password.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';


const iconClasses = {
  error: 'alert alert-danger ',
  info: 'alert alert-info',
  success: 'alert alert-success',
  warning: '  alert alert-warning'
};

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot({iconClasses}),
    ModalModule.forRoot(),
    TypeaheadModule.forRoot()

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    ChangePasswordComponent,
  ],
  entryComponents:[
    ChangePasswordComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
