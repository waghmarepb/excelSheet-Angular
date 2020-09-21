import { AuthGuard } from './../../_shared/services/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from '../users/add/add.component';
import { EditComponent } from '../users/edit/edit.component';
import { ListComponent } from '../users/list/list.component';
import { TableExampleComponent } from './table-example/table-example.component';


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
                title: 'Add Task Template'
            }
        },
        {
            path: 'edit/:id',
            component: EditComponent,
            data: {
                title: 'Edit Task Template'
            }
        },
        {
            path: 'list',
            component:ListComponent,
            data: {
                title: 'Task Templates'
            }
        },
        {
            path: 'example',
            component:TableExampleComponent,
            data: {
                title: 'Task Templates'
            }
        }
    ],canActivate:[AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
