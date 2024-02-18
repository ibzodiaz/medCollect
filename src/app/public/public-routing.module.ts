import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { PlayoutComponent } from './playout/playout.component';
import { AppointementComponent } from './appointement/appointement.component';

const routes: Routes = [

  {
    path: '', component:PlayoutComponent,children:[

      {path:'', redirectTo: 'home', pathMatch: 'full'},

      {path:'home', component:HomeComponent},
      {path:'contact',component:ContactComponent},
      {path:'rendez-vous',component:AppointementComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
