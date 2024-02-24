import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliniques } from 'src/app/_interfaces/cliniques';
import { CliniquesService } from 'src/app/_services/cliniques.service';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-cardio',
  templateUrl: './cardio.component.html',
  styleUrls: ['./cardio.component.css']
})
export class CardioComponent {
   
  cardioCanceled: boolean = false;
  
  @Output() emittedEvent =  new EventEmitter<boolean>();

  patientId:any;
  consultationId:any;

  cardioForm:any = { };

  constructor(
    private sharedService:SharedService,
    private cliniquesService:CliniquesService,
    private route:ActivatedRoute
  ){}

  ngOnInit():void{
    this.initForm();
    this.updateFormWithPatientData();
   }

  initForm(){
    this.cardioForm = {
      souffleCardiaque: {
        typeSouffle: [] as string[]
      }
    };
  }

  onSubmit(){
    this.sharedService.setterCardio(this.cardioForm);
  }

  updateFormWithPatientData(): void {
    this.route.paramMap.subscribe((params: any) => {
        const patientId = params.get('patientId');
        const consultationId = params.get('consultationId');

        if (patientId && consultationId) {
            this.patientId = patientId;
            this.consultationId = consultationId;

            this.cliniquesService.getClinicSignsByPatientId(this.patientId,this.consultationId).subscribe(
              (cardio: any) => {

                this.cardioForm = cardio;
                this.sharedService.setterCardio(this.cardioForm);
                
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

  closeModal(modalId: string,e:Event): void {
    e.preventDefault();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
      this.cardioCanceled = true;
      this.emittedEvent.emit(this.cardioCanceled);
    }
  }

  onCheckboxChange(option: string) {
    const index = this.cardioForm.souffleCardiaque.typeSouffle.indexOf(option);

    if (index === -1) {
      // Si l'option n'est pas déjà sélectionnée, l'ajouter au tableau
      this.cardioForm.souffleCardiaque.typeSouffle.push(option);
    } else {
      // Sinon, la retirer du tableau
      this.cardioForm.souffleCardiaque.typeSouffle.splice(index, 1);
    }
  }
}
