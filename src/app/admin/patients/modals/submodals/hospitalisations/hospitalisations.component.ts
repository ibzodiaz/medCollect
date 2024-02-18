import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Antecedents } from 'src/app/_interfaces/antecedants';
import { AntecedantsService } from 'src/app/_services/antecedants.service';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-hospitalisations',
  templateUrl: './hospitalisations.component.html',
  styleUrls: ['./hospitalisations.component.css']
})
export class HospitalisationsComponent {

  hospitalisationsCanceled: boolean = false;
  
  @Output() emittedEventH =  new EventEmitter<boolean>();
  @Output() emittedHospitalisationForm =  new EventEmitter<any>();

  PatientAntecedantId:any;
      
  hospitalisationForm: Antecedents = {}
  
  
  constructor(
              private antecedantsService:AntecedantsService, 
              private route: ActivatedRoute,
              private sharedService:SharedService
              ){}

  ngOnInit():void{
    this.initForm();
    this.updateFormWithPatientData();
  }

  initForm():void{
    this.hospitalisationForm = {
      hospitalisationsAnterieures: false,
      nombreHospitalisations: 0
    }
  }

  updateFormWithPatientData(){
    this.route.queryParamMap.subscribe((queryParams:any) => {
 
      if (queryParams.has('patientId')) {
        this.PatientAntecedantId = queryParams.get('patientId');

        this.antecedantsService.getAntecedantByPatientId(this.PatientAntecedantId).subscribe(
          (antecedants: any) => {

            this.hospitalisationForm = {...antecedants};
            this.sharedService.setterHospitalisation(this.hospitalisationForm);
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


  onSubmit():void{
    if(this.hospitalisationForm.nombreHospitalisations != 0){
      
      this.hospitalisationForm.hospitalisationsAnterieures = true;
    }
    else
    { 
      this.hospitalisationForm.hospitalisationsAnterieures = false;
    }

    this.emittedHospitalisationForm.emit(this.hospitalisationForm);

    this.sharedService.setterHospitalisation(this.hospitalisationForm);
    
  }

  openModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "block";
    }
  }

  closeModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
      if(!this.hospitalisationForm.hospitalisationsAnterieures){
        this.hospitalisationsCanceled = true;
        this.emittedEventH.emit(this.hospitalisationsCanceled);
      }
     
    }
  }

}