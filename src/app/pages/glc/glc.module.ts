import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GlcRoutingModule } from './glc-routing.module';
import { PendingListComponent } from './pending-list/pending-list.component';
import { DetailsComponent } from './details/details.component';
import { AvatarModule } from 'ngx-avatar';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { SharedComponentsModule } from 'src/app/_shared/shared-components/shared-components.module';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [PendingListComponent, DetailsComponent,ListComponent],
  imports: [
    CommonModule,
    GlcRoutingModule,
    NgbModule,
    AvatarModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    NgxPaginationModule
  ]
})
export class GlcModule { }
