import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DossiersComponent } from './dossiers/dossiers.component';
import { InformationsComponent } from './informations/informations.component';
import { DetailsComponent } from './details/details.component';
import { authAssistant } from 'src/app/_helpers/auth.assistant';


const routes: Routes = [
  {path:'', redirectTo:'dossiers', pathMatch:'full'},
  {path:'dossiers', component:DossiersComponent},
  {path:'informations', component:InformationsComponent,canActivate:[authAssistant]},
  {path:'details/:patientId', component:DetailsComponent,canActivate:[authAssistant]},
  {path:'details/:patientId/:consultationId', component:DetailsComponent,canActivate:[authAssistant]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
