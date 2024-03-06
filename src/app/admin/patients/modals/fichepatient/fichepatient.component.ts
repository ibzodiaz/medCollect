import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AntecedantsService } from 'src/app/_services/antecedants.service';
import { CliniquesService } from 'src/app/_services/cliniques.service';
import { EvolutionService } from 'src/app/_services/evolution.service';
import { InitAllService } from 'src/app/_services/init-all.service';
import { ParacliniquesService } from 'src/app/_services/paracliniques.service';
import { PatientsService } from 'src/app/_services/patients.service';
import { SharedService } from 'src/app/_services/shared.service';

declare var html2pdf: any;

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
    private initAllService:InitAllService,
    private sharedService:SharedService
  ) {}


  generatePDF() {
    const options = {
      margin: 10,
      filename: 'Fiche.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 4 },
      jsPDF: {
        unit: 'mm',
        format: 'a3',
        orientation: 'portrait',
        putOnlyUsedFonts: true,
      },
    };
  
    // Utilisation d'une promesse pour attendre que le contenu soit chargé
    const promise = new Promise<void>((resolve, reject) => {
      const element = document.getElementById('content-print');
      if (element) {
        resolve();
      } else {
        reject(new Error('Contenu non trouvé'));
      }
    });
  
    // Une fois que la promesse est résolue (c'est-à-dire que le contenu est chargé), générez le PDF
    promise.then(() => {
      const element = document.getElementById('content-print');
      if (element) {
        html2pdf().from(element).set(options).save();
      }
    }).catch((error) => {
      console.error('Erreur lors de la génération du PDF :', error);
    });
  }
  
  
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
                  //console.log(this.cliniques);
    
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
                  this.paracliniques = paraclinicSigns;
                  //alert(JSON.stringify(this.paracliniques.ett.fuiteValvulaire.typeFuite));
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
    this.isLoading = true;
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
    setInterval(()=>{
      this.isLoading = false;
    },2000)

  }

  actualize(){
    this.isLoading = true;
    this.socioDemographique();
    this.getPatientAntecedant();
    this.getPatientClinicSigns();
    this.getPatientParaClinicSigns();
    this.getPatientEvolution();
    setInterval(()=>{
      this.isLoading = false;
    },2000)
  }


  closeModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
    }
  }

}

