import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CliniquesService } from 'src/app/_services/cliniques.service';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-dyspnee',
  templateUrl: './dyspnee.component.html',
  styleUrls: ['./dyspnee.component.css']
})
export class DyspneeComponent {
  
  dyspneeCanceled: boolean = false;
  
  @Output() emittedEvent =  new EventEmitter<boolean>();

  dyspneeForm:any ={ }

  PatientId:string='';

  initForm(){
    this.dyspneeForm ={
      dyspneeEffort: {
        typeNYHA: ''
      },
      oedemeAiguPoumon: {
        presente: false
      }
    }
  
  }

  constructor(
    private sharedService:SharedService,
    private route:ActivatedRoute,
    private cliniquesService:CliniquesService
  ){}

  ngOnInit():void{ 
    this.initForm();
    this.updateFormWithPatientData();
  }

  
  updateFormWithPatientData(){
    this.route.queryParamMap.subscribe((queryParams:any) => {
 
      if (queryParams.has('patientId')) {
        this.PatientId = queryParams.get('patientId');

        this.cliniquesService.getClinicSignsByPatientId(this.PatientId).subscribe(
          (dyspnee: any) => {

            this.dyspneeForm = {...dyspnee};
            this.sharedService.setterDyspnee(this.dyspneeForm);
            
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
    this.sharedService.setterDyspnee(this.dyspneeForm);
    //alert(JSON.stringify(this.dyspneeForm))
  }

  closeModal(modalId: string,e:Event): void {
    e.preventDefault();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
      this.dyspneeCanceled = true;
      this.emittedEvent.emit(this.dyspneeCanceled);
    }
  }

  
}
