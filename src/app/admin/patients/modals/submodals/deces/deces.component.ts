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

  updateFormWithPatientData(){
    this.route.queryParamMap.subscribe((queryParams:any) => {
 
      if (queryParams.has('patientId')) {
        this.PatientId = queryParams.get('patientId');

        this.evolutionService.getEvolutionByPatientId(this.PatientId).subscribe(
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

  onSubmit(){
    //alert(JSON.stringify(this.decesForm));
    this.sharedService.setterDeces(this.decesForm);
  }

  closeModal(modalId: string,e:Event): void {
    e.preventDefault();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
    }
  }

}
