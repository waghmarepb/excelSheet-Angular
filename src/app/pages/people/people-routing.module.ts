import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { AuthGuard } from 'src/app/_shared/services/auth.guard';

const routes: Routes = [
  {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full',
  },
{
    path: '',
    children: [
        {
            path: 'add',
            component: AddComponent,
            data: {
                title: 'Add'
            }
        },
        {
            path: 'edit/:id',
            component: EditComponent,
            data: {
                title: 'Edit'
            }
        },
        {
            path: 'list',
            component:ListComponent,
            data: {
                title: 'list'
            }
        },
        {
          path: 'details/:id',
          component: DetailsComponent,
          data: {
            title: 'Details People'
          }
        },
    ],canActivate:[AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }
