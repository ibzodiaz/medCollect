import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DossiersComponent } from './dossiers/dossiers.component';
import { HistoriquesComponent } from './historiques/historiques.component';
import { InformationsComponent } from './informations/informations.component';
import { DetailsComponent } from './details/details.component';


const routes: Routes = [
  {path:'', redirectTo:'dossiers', pathMatch:'full'},
  {path:'dossiers', component:DossiersComponent},
  {path:'historiques', component:HistoriquesComponent},
  {path:'informations', component:InformationsComponent},
  {path:'details/:patientId', component:DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
