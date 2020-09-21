import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbDatepickerModule  } from '@ng-bootstrap/ng-bootstrap';
import { PeopleRoutingModule } from './people-routing.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';
import { AvatarModule } from 'ngx-avatar';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { SharedComponentsModule } from 'src/app/_shared/shared-components/shared-components.module';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [ListComponent, AddComponent, EditComponent, DetailsComponent],
  imports: [
    CommonModule,
    PeopleRoutingModule,
    NgbModule,
    AvatarModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgxMaskModule.forRoot(),
    SharedComponentsModule,
    NgxPaginationModule
  ],


})
export class PeopleModule { }
