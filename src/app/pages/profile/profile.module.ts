import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProfileRoutingModule } from './profile-routing.module';
import { DefaultComponent } from './default/default.component';
import { SharedComponentsModule } from 'src/app/_shared/shared-components/shared-components.module';
import { AvatarModule } from 'ngx-avatar';

@NgModule({
  declarations: [DefaultComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    AvatarModule.forRoot(),
    SharedComponentsModule,
  ]
})
export class ProfileModule { }
