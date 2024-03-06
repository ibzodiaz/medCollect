import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParacliniquesService } from 'src/app/_services/paracliniques.service';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-ett',
  templateUrl: './ett.component.html',
  styleUrls: ['./ett.component.css']
})
export class EttComponent {

  ettForm:any = {}

  PatientAntecedantId :any;
  consultationId :any;

  initForm(){
    this.ettForm = {
      dtdvg: 0,
      dtsvg: 0,
      fevg: 0,
      epanchementPericardique: {
        presente: false
      },
      fuiteValvulaire: {
        typeFuite: []
      },
      stenoseValvulaire: {
        typeStenose: []
      }
    }
  }

  PatientId:string='';

  constructor(
    private sharedService:SharedService,
    private paracliniquesService:ParacliniquesService,
    private route:ActivatedRoute
  ){}

  ngOnInit(){
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

            this.paracliniquesService.getParaClinicSignsByPatientId(this.PatientAntecedantId,this.consultationId).subscribe(
              (ett: any) => {

                this.ettForm = {...ett.ett};
                this.sharedService.setterEtt(this.ettForm);
                
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


  onSubmitEtt(modalId: string,e:Event){
    this.sharedService.setterEtt(this.ettForm);
    this.closeModal(modalId,e);
  }

  closeModal(modalId: string,e:Event): void {
    e.preventDefault();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
    }
  }

  
  onCheckboxChangeFuiteValvulaire(option: string) {
    const index = this.ettForm.fuiteValvulaire.typeFuite.indexOf(option);

    if (index === -1) {
      // Si l'option n'est pas déjà sélectionnée, l'ajouter au tableau
      this.ettForm.fuiteValvulaire.typeFuite.push(option);
    } else {
      // Sinon, la retirer du tableau
      this.ettForm.fuiteValvulaire.typeFuite.splice(index, 1);
    }
  }

  onCheckboxChangeStenoseValvulaire(option: string) {
    const index = this.ettForm.stenoseValvulaire.typeStenose.indexOf(option);

    if (index === -1) {
      // Si l'option n'est pas déjà sélectionnée, l'ajouter au tableau
      this.ettForm.stenoseValvulaire.typeStenose.push(option);
    } else {
      // Sinon, la retirer du tableau
      this.ettForm.stenoseValvulaire.typeStenose.splice(index, 1);
    }
  }
}
