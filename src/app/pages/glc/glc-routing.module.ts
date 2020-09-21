import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { PendingListComponent } from './pending-list/pending-list.component';
import { ListComponent } from './list/list.component';


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
            path: 'pending',
            component:PendingListComponent,
            data: {
                title: 'Pending List'
            }
        },
        {
          path: 'details/:id',
          component: DetailsComponent,
          data: {
            title: 'Details GLC'
          }
        },{
          path: 'list',
          component: ListComponent,
          data: {
            title: 'List GLC'
          }
        },
    ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlcRoutingModule { }
