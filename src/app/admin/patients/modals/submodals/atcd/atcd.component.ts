import { Component, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Antecedents } from 'src/app/_interfaces/antecedants';
import { AntecedantsService } from 'src/app/_services/antecedants.service';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-atcd',
  templateUrl: './atcd.component.html',
  styleUrls: ['./atcd.component.css']
})
export class AtcdComponent {

  atcdDecompensationCanceled: boolean = false;
  
  @Output() emittedEventA =  new EventEmitter<boolean>();
  @Output() emittedAtcdForm =  new EventEmitter<any>();


  PatientAntecedantId:any;
  consultationId:any;
    
  atcdForm: Antecedents = { }

  initForm():void{
    this.atcdForm = {
      atcdDecompensation: false,
      nombreAtcdDecompensation:0,
      typeInsuffisanceCardiaque: ''
    }
  }

  constructor(
              private antecedantsService:AntecedantsService, 
              private route: ActivatedRoute,
              private sharedService:SharedService
              ){}

  ngOnInit():void{
    this.initForm();
    this.updateFormWithPatientData();
  }

  updateFormWithPatientData(): void {
    this.route.queryParamMap.subscribe((params: any) => {
        const patientId = params.get('patientId');
        //const consultationId = params.get('consultationId');

        if (patientId) {
            this.PatientAntecedantId = patientId;
            //this.consultationId = consultationId;

            this.antecedantsService.getAntecedantByPatientId(patientId).subscribe(
              (antecedants: any) => {
  
                this.atcdForm = antecedants;
                this.sharedService.setterATCD(this.atcdForm);
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



  openModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "block";
    }
  }

  onSubmit():void {

    if(this.atcdForm.nombreAtcdDecompensation != 0 || this.atcdForm.typeInsuffisanceCardiaque != ''){
      this.atcdForm.atcdDecompensation = true;
      
    }
    else{
      this.atcdForm.atcdDecompensation = false;
    }


    this.sharedService.setterATCD(this.atcdForm);
  }

  closeModal(modalId: string,e:Event): void {
    e.preventDefault();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
    }
  }

}
