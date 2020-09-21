import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersRoutingModule } from './users-routing.module';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from 'ngx-avatar';
import { NgxMaskModule } from 'ngx-mask';
import { TableExampleComponent } from './table-example/table-example.component';
import { SharedComponentsModule } from 'src/app/_shared/shared-components/shared-components.module';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [ListComponent, AddComponent, EditComponent, TableExampleComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    NgbModule,
    AvatarModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    SharedComponentsModule,
    NgxPaginationModule
  ]
})
export class UsersModule { }
