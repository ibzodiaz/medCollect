import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsRoutingModule } from './patients-routing.module';
import { DossiersComponent } from './dossiers/dossiers.component';
import { SociodemoComponent } from './modals/sociodemo/sociodemo.component';
import { AntecedentsComponent } from './modals/antecedents/antecedents.component';
import { CliniquesComponent } from './modals/cliniques/cliniques.component';
import { ParacliniquesComponent } from './modals/paracliniques/paracliniques.component';
import { FichepatientComponent } from './modals/fichepatient/fichepatient.component';
import { AddpatientComponent } from './modals/addpatient/addpatient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationComponent } from './modals/confirmation/confirmation.component';
import { EvolutionComponent } from './modals/evolution/evolution.component';
import { AtcdComponent } from './modals/submodals/atcd/atcd.component';
import { HospitalisationsComponent } from './modals/submodals/hospitalisations/hospitalisations.component';
import { DyspneeComponent } from './modals/submodals/dyspnee/dyspnee.component';
import { CardioComponent } from './modals/submodals/cardio/cardio.component';
import { TelecoeurComponent } from './modals/submodals/telecoeur/telecoeur.component';
import { EcgComponent } from './modals/submodals/ecg/ecg.component';
import { EttComponent } from './modals/submodals/ett/ett.component';
import { ModaliteevolutionComponent } from './modals/submodals/modaliteevolution/modaliteevolution.component';
import { WomenComponent } from './modals/submodals/women/women.component';
import { BabiesComponent } from './modals/submodals/babies/babies.component';
import { DecesComponent } from './modals/submodals/deces/deces.component';
import { UploadfilesComponent } from './modals/uploadfiles/uploadfiles.component';
import { InformationsComponent } from './informations/informations.component';
import { DetailsComponent } from './details/details.component';
import { ConsultationsComponent } from './details/consultations/consultations.component';
import { DocumentsComponent } from './details/documents/documents.component';
import { MeetingsComponent } from './details/meetings/meetings.component';
import { OrdonnancesComponent } from './details/ordonnances/ordonnances.component';
import { AjoutordonnanceComponent } from './details/ajoutordonnance/ajoutordonnance.component';
import { UpdateordonnanceComponent } from './details/updateordonnance/updateordonnance.component';
import { PrintordonnanceComponent } from './details/printordonnance/printordonnance.component';
import { MotifsComponent } from './details/motifs/motifs.component';


@NgModule({
  declarations: [
    DossiersComponent,
    SociodemoComponent,
    AntecedentsComponent,
    CliniquesComponent,
    ParacliniquesComponent,
    FichepatientComponent,
    AddpatientComponent,
    ConfirmationComponent,
    EvolutionComponent,
    AtcdComponent,
    HospitalisationsComponent,
    DyspneeComponent,
    CardioComponent,
    TelecoeurComponent,
    EcgComponent,
    EttComponent,
    ModaliteevolutionComponent,
    WomenComponent,
    BabiesComponent,
    DecesComponent,
    UploadfilesComponent,
    InformationsComponent,
    DetailsComponent,
    ConsultationsComponent,
    DocumentsComponent,
    MeetingsComponent,
    OrdonnancesComponent,
    AjoutordonnanceComponent,
    UpdateordonnanceComponent,
    PrintordonnanceComponent,
    MotifsComponent
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PatientsModule { }
