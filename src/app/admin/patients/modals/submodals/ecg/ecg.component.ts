import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParacliniquesService } from 'src/app/_services/paracliniques.service';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-ecg',
  templateUrl: './ecg.component.html',
  styleUrls: ['./ecg.component.css']
})
export class EcgComponent {

  constructor(
    private sharedService:SharedService,
    private route:ActivatedRoute,
    private paracliniquesService:ParacliniquesService
  ){}

  ecgForm :any ={ }

  PatientId:string = '';

  PatientAntecedantId :any;
  consultationId :any;

  ngOnInit(){
    this.initForm();
    this.updateFormWithPatientData();
  }

  initForm(){
    this.ecgForm ={
      rythmeCardiaque: [],
      autres:''
    }
  }


  updateFormWithPatientData(): void {
    this.route.paramMap.subscribe((params: any) => {
        const patientId = params.get('patientId');
        const consultationId = params.get('consultationId');

        if (patientId && consultationId) {
            this.PatientAntecedantId = patientId;
            this.consultationId = consultationId;

            this.paracliniquesService.getParaClinicSignsByPatientId(this.PatientAntecedantId,this.consultationId).subscribe(
              (ecg: any) => {
                if(ecg){
                  this.ecgForm = {...ecg.ecg};
                  this.sharedService.setterEcg(this.ecgForm);
                  // alert(JSON.stringify(ecg.ecg))
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


  onSubmitEcg(modalId: string,e:Event){
    this.sharedService.setterEcg(this.ecgForm);
    this.closeModal(modalId,e);
  }


  closeModal(modalId: string,e:Event): void {
    e.preventDefault();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
    }
  }


  onCheckboxChange(option: string) {
    const index = this.ecgForm.rythmeCardiaque.indexOf(option);

    if (index === -1) {
      // Si l'option n'est pas déjà sélectionnée, l'ajouter au tableau
      this.ecgForm.rythmeCardiaque.push(option);
    } else {
      // Sinon, la retirer du tableau
      this.ecgForm.rythmeCardiaque.splice(index, 1);
    }
  }
}
