import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DefaultComponent } from './default/default.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedComponentsModule } from 'src/app/_shared/shared-components/shared-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from 'ngx-avatar';
import { NgxMaskModule } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [DefaultComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgbModule,
    SharedComponentsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgxPaginationModule,
    AvatarModule
  ]
})
export class DashboardModule { }
