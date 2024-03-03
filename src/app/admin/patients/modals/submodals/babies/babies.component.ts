import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EvolutionService } from 'src/app/_services/evolution.service';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-babies',
  templateUrl: './babies.component.html',
  styleUrls: ['./babies.component.css']
})
export class BabiesComponent {

  constructor(
    private sharedService:SharedService,
    private route:ActivatedRoute,
    private evolutionService:EvolutionService
  ){}

  PatientId:string='';
  babiesForm:any ={};

  PatientAntecedantId:any;
  consultationId:any;

  initForm(){
    this.babiesForm= {
      enfant:{
        evolutionBebe: {
            mortNes: false,
            faiblePoidsNaissance: false,
            prematurite: false,
            poidsNaissance: 0,
            alimentationNaissance: '',
            poids3Mois: 0,
            alimentation3Mois: '',
            poids6Mois: 0,
            alimentation6Mois: '',
            poids12Mois: 0,
            alimentation12Mois: ''
        }
      }
    }
  }

  ngOnInit():void{
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
              (babies: any) => {
    
                this.babiesForm = {...babies};
                console.log(this.babiesForm)
                this.sharedService.setterBabies(this.babiesForm);
                
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
   
    if(this.babiesForm.enfant.evolutionBebe.mortNes){
      this.babiesForm.enfant.evolutionBebe.poidsNaissance = 0;
      this.babiesForm.enfant.evolutionBebe.alimentationNaissance = '';
      this.babiesForm.enfant.evolutionBebe.poids3Mois = 0;
      this.babiesForm.enfant.evolutionBebe.alimentation3Mois = '';
      this.babiesForm.enfant.evolutionBebe.poids6Mois = 0;
      this.babiesForm.enfant.evolutionBebe.alimentation6Mois = '';
      this.babiesForm.enfant.evolutionBebe.poids12Mois = 0;
      this.babiesForm.enfant.evolutionBebe.alimentation12Mois = '';
    }
    //alert(JSON.stringify(this.babiesForm));
    this.sharedService.setterBabies(this.babiesForm);
    this.closeModal(modalId, e);
  }
  

  closeModal(modalId: string,e:Event): void {
    e.preventDefault();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
    }
  }

  selectedOptions: string[] = [];

  onCheckboxChange(event: any) {
    const optionValue = event.target.value;
    
    if (event.target.checked) {
      this.selectedOptions.push(optionValue);
    } else {
      const index = this.selectedOptions.indexOf(optionValue);
      if (index !== -1) {
        this.selectedOptions.splice(index, 1);
      }
    }
  }
}
