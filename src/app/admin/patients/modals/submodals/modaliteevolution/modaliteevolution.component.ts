import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParacliniquesService } from 'src/app/_services/paracliniques.service';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-modaliteevolution',
  templateUrl: './modaliteevolution.component.html',
  styleUrls: ['./modaliteevolution.component.css']
})
export class ModaliteevolutionComponent {

  modeliteevolutionForm:any = { }
  PatientId:string = '';

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

  onSubmitEvolution(){
    
    if(!this.modeliteevolutionForm.aspectsDefavorables.complications){
      this.modeliteevolutionForm.typeComplications = [];
      this.modeliteevolutionForm.autres = '';
    }

    if(!this.modeliteevolutionForm.aspectsDefavorables.deces){
      this.modeliteevolutionForm.delaiDeces = 0;
    }

    this.sharedService.setterEvolution(this.modeliteevolutionForm);
  }

  initForm(){
    this.modeliteevolutionForm = {
      aspectsDefavorables: {
        complications: false,
        deces: false
      },
      typeComplications: [],
      autres:'',
      delaiDeces: 0
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
              (evolution: any) => {

                this.modeliteevolutionForm = {...evolution.modaliteEvolutiveHospitalisation};
                this.sharedService.setterEvolution(this.modeliteevolutionForm);
    
                //alert(JSON.stringify(evolution.modaliteEvolutiveHospitalisation))
                
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


  closeModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
    }
  }

    
  onCheckboxChange(option: string) {
    const index = this.modeliteevolutionForm.typeComplications.indexOf(option);

    if (index === -1) {
      // Si l'option n'est pas déjà sélectionnée, l'ajouter au tableau
      this.modeliteevolutionForm.typeComplications.push(option);
    } else {
      // Sinon, la retirer du tableau
      this.modeliteevolutionForm.typeComplications.splice(index, 1);
    }
  }
  
}
