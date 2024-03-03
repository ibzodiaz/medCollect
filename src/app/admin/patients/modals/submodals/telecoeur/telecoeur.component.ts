import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParacliniquesService } from 'src/app/_services/paracliniques.service';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-telecoeur',
  templateUrl: './telecoeur.component.html',
  styleUrls: ['./telecoeur.component.css']
})
export class TelecoeurComponent {

  telecoeurForm :any ={ };

  PatientId:string='';
  PatientAntecedantId :any;
  consultationId :any;

  constructor(
    private sharedService:SharedService,
    private route:ActivatedRoute,
    private paracliniquesService:ParacliniquesService
  ){}

  ngOnInit():void{ 
    this.initForm();
    this.updateFormWithPatientData();
  }

  initForm(){
    this.telecoeurForm ={
      indexCardiothoracique: 0,
      autresSignes: '',
    };
  }

  
  updateFormWithPatientData(): void {
    this.route.paramMap.subscribe((params: any) => {
        const patientId = params.get('patientId');
        const consultationId = params.get('consultationId');

        if (patientId && consultationId) {
            this.PatientAntecedantId = patientId;
            this.consultationId = consultationId;

            this.paracliniquesService.getParaClinicSignsByPatientId(this.PatientAntecedantId,this.consultationId).subscribe(
              (telecoeur: any) => {

                //console.log(telecoeur.telecoeur);
                this.telecoeurForm = {...telecoeur.telecoeur};
                this.sharedService.setterTelecoeur(this.telecoeurForm);
                
              },
              (err: any) => {
                if (err.status === undefined) {
                  this.initForm();
    
                } else {
                  alert(err.status);
                  console.error(err);
                }
              }
            );
        }
    });
  }

  onSubmitTelecoeur(modalId: string,e:Event){
    //console.log(this.telecoeurForm);
    this.sharedService.setterTelecoeur(this.telecoeurForm);
    this.closeModal(modalId,e);
  }

  closeModal(modalId: string,e:Event): void {
    e.preventDefault();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
    }
  }
}
