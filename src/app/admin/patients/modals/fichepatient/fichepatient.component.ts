import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AntecedantsService } from 'src/app/_services/antecedants.service';
import { CliniquesService } from 'src/app/_services/cliniques.service';
import { EvolutionService } from 'src/app/_services/evolution.service';
import { InitAllService } from 'src/app/_services/init-all.service';
import { ParacliniquesService } from 'src/app/_services/paracliniques.service';
import { PatientsService } from 'src/app/_services/patients.service';

@Component({
  selector: 'app-fichepatient',
  templateUrl: './fichepatient.component.html',
  styleUrls: ['./fichepatient.component.css']
})
export class FichepatientComponent {

  patientId:string = '';
  isLoading:boolean = false;

  PatientAntecedantId:any;
  consultationId:any;

  patient:any;
  antecedant:any;
  cliniques:any;
  paracliniques:any;
  evolution:any;

  constructor(
    private route:ActivatedRoute,
    private patientsService:PatientsService,
    private antecedantsService:AntecedantsService,
    private cliniquesService:CliniquesService,
    private paracliniquesService:ParacliniquesService,
    private evolutionService:EvolutionService,
    private initAllService:InitAllService
  ) {}


  socioDemographique(): void {
    this.route.paramMap.subscribe((params: any) => {
        const patientId = params.get('patientId');
        const consultationId = params.get('consultationId');

        if (patientId && consultationId) {
            this.PatientAntecedantId = patientId;
            this.consultationId = consultationId;

            this.patientsService.getPatientById(this.PatientAntecedantId).subscribe(
              (patient: any) => {
                if(patient){
                  this.patient = patient;
                  this.isLoading = false;
                }
                //alert(JSON.stringify(this.patient))
              },
              (err: any) => {
                if (err.status === undefined) {
                  
                  this.patient = this.initAllService.initPatient();

                } else {
                  console.error(err);
                }
              }
            );
        }
    });
  }

  getPatientAntecedant(): void {
    this.route.paramMap.subscribe((params: any) => {
        const patientId = params.get('patientId');
        //const consultationId = params.get('consultationId');

        if (patientId) {
            this.PatientAntecedantId = patientId;
            //this.consultationId = consultationId;

            this.antecedantsService.getAntecedantByPatientId(patientId).subscribe(
              (antecedants: any) => {
                if(antecedants){
                  this.antecedant = antecedants;
                  //console.log(JSON.stringify(this.antecedant));
                }
              },
              (err: any) => {
                if (err.status === undefined) {
                  this.antecedant = this.initAllService.initAntecedant();
                } else {
                  console.error(err);
                }
              }
            );
        }
    });
  }


  getPatientClinicSigns(): void {
    this.route.paramMap.subscribe((params: any) => {
        const patientId = params.get('patientId');
        const consultationId = params.get('consultationId');

        if (patientId && consultationId) {
            this.PatientAntecedantId = patientId;
            this.consultationId = consultationId;

            this.cliniquesService.getClinicSignsByPatientId(this.PatientAntecedantId,this.consultationId).subscribe(
              (clinicSigns: any) => {
                if(clinicSigns){
                  this.cliniques = clinicSigns;
                  //alert(JSON.stringify(this.cliniques));
                }
              },
              (err: any) => {
                if (err.status === undefined) {
                  this.cliniques = this.initAllService.initClinique();
                } else {
                  console.error(err);
                }
              }
            );
        }
    });
  }

  getPatientParaClinicSigns(): void {
    this.route.paramMap.subscribe((params: any) => {
        const patientId = params.get('patientId');
        const consultationId = params.get('consultationId');

        if (patientId && consultationId) {
            this.PatientAntecedantId = patientId;
            this.consultationId = consultationId;

            this.paracliniquesService.getParaClinicSignsByPatientId(this.PatientAntecedantId,this.consultationId).subscribe(
              (paraclinicSigns: any) => {
                if(paraclinicSigns){
                  this.paracliniques = { ...paraclinicSigns, patientId: this.patientId };
                  //alert(JSON.stringify(this.paracliniques.biologie.hemoglobinemie));
                }
    
              },
              (err: any) => {
                if (err.status === undefined) {
                  this.paracliniques = this.initAllService.initParaClinique();
                } else {
                  console.error(err);
                }
              }
            );
        }
    });
  }


  getPatientEvolution(): void {
    this.route.paramMap.subscribe((params: any) => {
        const patientId = params.get('patientId');
        const consultationId = params.get('consultationId');

        if (patientId && consultationId) {
            this.PatientAntecedantId = patientId;
            this.consultationId = consultationId;

            this.evolutionService.getEvolutionByPatientId(this.PatientAntecedantId,this.consultationId).subscribe(
              (evolution: any) => {
                if(evolution){
                  this.evolution = { ...evolution, patientId: this.patientId };
                  //alert(JSON.stringify(this.evolution));
                }
              },
              (err: any) => {
                if (err.status === undefined) {
                  this.evolution = this.initAllService.initEvolution();
                } else {
                  console.error(err);
                }
              }
            );
        }
    });
  }

  ngOnInit(): void {
    //Init
    this.patient = this.initAllService.initPatient();
    this.antecedant = this.initAllService.initAntecedant();
    this.cliniques = this.initAllService.initClinique();
    this.paracliniques = this.initAllService.initParaClinique();
    this.evolution = this.initAllService.initEvolution();

    //Get new data
    this.socioDemographique();
    this.getPatientAntecedant();
    this.getPatientClinicSigns();
    this.getPatientParaClinicSigns();
    this.getPatientEvolution();
  }

  openModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "block";
    }
  }

  closeModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
    }
  }

}
