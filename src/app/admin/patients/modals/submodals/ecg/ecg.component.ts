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

  updateFormWithPatientData(){
    this.route.queryParamMap.subscribe((queryParams:any) => {
 
      if (queryParams.has('patientId')) {
        this.PatientId = queryParams.get('patientId');

        this.paracliniquesService.getParaClinicSignsByPatientId(this.PatientId).subscribe(
          (ecg: any) => {
            this.ecgForm = {...ecg.ecg};
            this.sharedService.setterTelecoeur(this.ecgForm);
            // alert(JSON.stringify(ecg.ecg))
            
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

  onSubmitEcg(){
    this.sharedService.setterEcg(this.ecgForm);
  }


  closeModal(modalId: string): void {
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
