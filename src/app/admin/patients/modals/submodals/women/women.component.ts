import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EvolutionService } from 'src/app/_services/evolution.service';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-women',
  templateUrl: './women.component.html',
  styleUrls: ['./women.component.css']
})
export class WomenComponent {

  constructor(
    private sharedService:SharedService,
    private route:ActivatedRoute,
    private evolutionService:EvolutionService
  ) {}

  PatientId:string='';

  PatientAntecedantId :any;
  consultationId :any;

  womenForm:any = {};

  initForm(){
    
    this.womenForm = {
      mere:{
        evolutionApresSortie: '',
        classeNYHA: '',
        detailsDeces: {
          presente: false,
          date: '',
          causes: '',
          lieu: ''
        },
        bonneObservanceTherapeutique: false,
        nombreRehospitalisations: 0,
        facteursDecompensation: {
          anemie: false,
          infectionsVirales: false,
          infectionsBacteriennes: false,
          denutrition: false,
          rupturesTherapeutiques: false,
          ecartDeRegime: false
        },
        echocardiographie: {
          dtdvg: '',
          dtsvg: '',
          fevg: '',
          fr: '', 
          e: '',
          a: '',
          td: '',
          ee: '',
          tapse: '',
          dtog:''
        },
        biologie: {
          hemoglobinemie: 0,
          gb: 0,
          plaquettes: 0,
          vgm: 0,
          ccmh: 0,
          tcmh: 0,
          crp: 0,
          uree: 0,
          creatininemie: 0,
          ntProBNP: 0,
          prolactine: 0
        }
    }
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.updateFormWithPatientData();
  }


  updateFormWithPatientData(): void {
    this.route.paramMap.subscribe((params: any) => {
        const patientId = params.get('patientId');
        const consultationId = params.get('consultationId');

        if (patientId && consultationId) {
            this.PatientAntecedantId = patientId;
            this.consultationId = consultationId;

            this.evolutionService.getEvolutionByPatientId(this.PatientAntecedantId,this.consultationId).subscribe(
              (women: any) => {
                if(women){
                  this.womenForm = {...women};
                  this.sharedService.setterWomen(this.womenForm);
                }
                
              },
              (err: any) => {
                if (err.status === undefined) {
                  this.initForm();
    
                } else {
          
                  console.error(err);
                }
              }
            );
        }
    });
  }

  onSubmit(modalId: string,e:Event){

    if(this.womenForm.mere.detailsDeces.presente){
      this.womenForm.mere.detailsDeces.date  = this.sharedService.getterDeces().detailsDeces.date
      this.womenForm.mere.detailsDeces.causes  = this.sharedService.getterDeces().detailsDeces.causes
      this.womenForm.mere.detailsDeces.lieu  = this.sharedService.getterDeces().detailsDeces.lieu
    }
    else
    {
      this.womenForm.mere.detailsDeces.date  = ''
      this.womenForm.mere.detailsDeces.causes  = ''
      this.womenForm.mere.detailsDeces.lieu  = ''
    }

    this.sharedService.setterWomen(this.womenForm);
    this.closeModal(modalId,e);
  }


  closeModal(modalId: string,e:Event): void {
    e.preventDefault();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
    }
  }

  openModal(modalId: string,e:Event): void {
    e.preventDefault();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "block";

    }
  }


  onCheckboxChange(option: string) {
    const index = this.womenForm.mere.facteursDecompensation.indexOf(option);

    if (index === -1) {
      // Si l'option n'est pas déjà sélectionnée, l'ajouter au tableau
      this.womenForm.mere.facteursDecompensation.push(option);
    } else {
      // Sinon, la retirer du tableau
      this.womenForm.mere.facteursDecompensation.splice(index, 1);
    }
  }
}
