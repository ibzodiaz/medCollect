import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EvolutionService } from 'src/app/_services/evolution.service';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-deces',
  templateUrl: './deces.component.html',
  styleUrls: ['./deces.component.css']
})
export class DecesComponent {

  decesForm:any={ }

  PatientId:string='';
  PatientAntecedantId :any;
  consultationId :any;

  constructor(
    private sharedService:SharedService,
    private route:ActivatedRoute,
    private evolutionService:EvolutionService
  ){}

  ngOnInit():void{
    this.initForm();
    this.updateFormWithPatientData();
  }

  initForm(){
    this.decesForm ={
      detailsDeces: {
        date: '',
        causes: '',
        lieu: ''
      }
    }
  }

  updateFormWithPatientData(): void {
    this.route.paramMap.subscribe((params: any) => {
        const patientId = params.get('patientId');
        const consultationId = params.get('consultationId');

        if (patientId && consultationId) {
            this.PatientAntecedantId = patientId;
            this.consultationId = consultationId;

            this.evolutionService.getEvolutionByPatientId(this.PatientAntecedantId,this.consultationId).subscribe(
              (deces: any) => {
                if(deces.mere.detailsDeces.presente){
                  this.decesForm = {...deces.mere};
                  this.sharedService.setterDeces(this.decesForm);
                }
                
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

  onSubmit(modalId: string,e:Event){
    //alert(JSON.stringify(this.decesForm));
    this.sharedService.setterDeces(this.decesForm);
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
