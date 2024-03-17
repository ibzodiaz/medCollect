import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlayoutComponent } from './alayout/alayout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ParametresComponent } from './parametres/parametres.component';
import { MeetsComponent } from './meets/meets.component';
import { AssistantComponent } from './assistant/assistant.component';
import { PlanningComponent } from './planning/planning.component';
import { OrdonnancesComponent } from './ordonnances/ordonnances.component';
import { HelpComponent } from './help/help.component';
import { ShareFilesComponent } from './share-files/share-files.component';
import { authAssistant } from '../_helpers/auth.assistant';

const routes: Routes = [
  {  path: '', component:AlayoutComponent,children:[

      {path:'', redirectTo:'dashboard', pathMatch:'full'},

      {path:'dashboard', component:DashboardComponent},
      {path:'parametres', component:ParametresComponent},
      {path:'meetings', component:MeetsComponent},
      {path:'planning', component:PlanningComponent,canActivate:[authAssistant]},
      {path:'assistants', component:AssistantComponent,canActivate:[authAssistant]},
      {path:'assistants/:assistantId', component:AssistantComponent,canActivate:[authAssistant]},
      {path:'ordonnances', component:OrdonnancesComponent,canActivate:[authAssistant]},
      {path:'partage', component:ShareFilesComponent},
      {path:'aide', component:HelpComponent},
      {
        path:'user', loadChildren: ()=> import('./user/user.module')
                                        .then(m => m.UserModule),canActivate:[authAssistant]
      },
      {
        path:'patients', loadChildren: ()=> import('./patients/patients.module')
                                        .then(m=>m.PatientsModule)
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
