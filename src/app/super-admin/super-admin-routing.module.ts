import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { SlayoutComponent } from './slayout/slayout.component';
import { ShareFilesComponent } from './share-files/share-files.component';
import { ParametresComponent } from './parametres/parametres.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '', component:SlayoutComponent,children:[
      {path:'', redirectTo:'index', pathMatch:'full'},

      {path:'index', component:IndexComponent},
      {path:'partage', component:ShareFilesComponent},
      {path:'users/:hospitalId', component:UsersComponent},
      {path:'parametres', component:ParametresComponent}
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
