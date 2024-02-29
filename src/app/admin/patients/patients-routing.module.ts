import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DossiersComponent } from './dossiers/dossiers.component';
import { InformationsComponent } from './informations/informations.component';
import { DetailsComponent } from './details/details.component';


const routes: Routes = [
  {path:'', redirectTo:'dossiers', pathMatch:'full'},
  {path:'dossiers', component:DossiersComponent},
  {path:'informations', component:InformationsComponent},
  {path:'details/:patientId/00d9d0b9d50dc435bfbf04cd', component:DetailsComponent},
  {path:'details/:patientId/:consultationId', component:DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
