import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AlayoutComponent } from './alayout/alayout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ParametresComponent } from './parametres/parametres.component';
import { ProfileComponent } from './parametres/profile/profile.component';
import { UpdateComponent } from './parametres/update/update.component';
import { PasswordComponent } from './parametres/password/password.component';
import { AllowsComponent } from './parametres/allows/allows.component';
import { GeneralComponent } from './parametres/general/general.component';
import { LanguagesComponent } from './parametres/languages/languages.component';
import { MeetsComponent } from './meets/meets.component';
import { AssistantComponent } from './assistant/assistant.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule } from '@angular/forms';
import { PlanningComponent } from './planning/planning.component';
import { OrdonnancesComponent } from './ordonnances/ordonnances.component';
import { AttenteComponent } from './attente/attente.component';
import { HelpComponent } from './help/help.component';
import { AjoutassistantComponent } from './assistant/ajoutassistant/ajoutassistant.component';
import { UpdateassistantComponent } from './assistant/updateassistant/updateassistant.component';
import { ShareFilesComponent } from './share-files/share-files.component';




@NgModule({
  declarations: [
    AlayoutComponent,
    DashboardComponent,
    ParametresComponent,
    ProfileComponent,
    UpdateComponent,
    PasswordComponent,
    AllowsComponent,
    GeneralComponent,
    LanguagesComponent,
    MeetsComponent,
    AssistantComponent,
    PlanningComponent,
    OrdonnancesComponent,
    AttenteComponent,
    HelpComponent,
    AjoutassistantComponent,
    UpdateassistantComponent,
    ShareFilesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FullCalendarModule,
    FormsModule
  ]
})
export class AdminModule { }
