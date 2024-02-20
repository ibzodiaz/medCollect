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

  updateFormWithPatientData(){
    this.route.queryParamMap.subscribe((queryParams:any) => {
 
      if (queryParams.has('patientId')) {
        this.PatientId = queryParams.get('patientId');

        this.paracliniquesService.getParaClinicSignsByPatientId(this.PatientId).subscribe(
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

  onSubmitTelecoeur(){
    this.sharedService.setterTelecoeur(this.telecoeurForm);
  }

  closeModal(modalId: string,e:Event): void {
    e.preventDefault();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
    }
  }
}
