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


  PatientAntecedantId: any;
  consultationId: any;
    
  atcdForm: Antecedents = {};

  // Variable pour stocker les valeurs précédentes
  previousAtcdForm: Antecedents = {};

  initForm(): void {
    this.atcdForm = {
      atcdDecompensation: false,
      nombreAtcdDecompensation: 0,
      typeInsuffisanceCardiaque: ''
    };
  }

  constructor(
    private antecedantsService: AntecedantsService, 
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.updateFormWithPatientData();
  }

  updateFormWithPatientData(): void {
    this.route.queryParamMap.subscribe((params: any) => {
      const patientId = params.get('patientId');

      if (patientId) {
        this.PatientAntecedantId = patientId;

        this.antecedantsService.getAntecedantByPatientId(patientId).subscribe(
          (antecedants: any) => {
            // Sauvegarde des valeurs précédentes dès la récupération
            this.previousAtcdForm = { ...antecedants };

            this.atcdForm = antecedants || {}; // Assurez-vous que antecedants n'est pas undefined
            //this.sharedService.setterATCD(this.atcdForm);
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

  onSubmit(modalId: string, e: Event): void {
    if (this.atcdForm && (this.atcdForm.nombreAtcdDecompensation != 0 || this.atcdForm.typeInsuffisanceCardiaque != '')) {
      this.atcdForm.atcdDecompensation = true;
    } else if (this.atcdForm) {
      this.atcdForm.atcdDecompensation = false;
    }

    this.sharedService.setterATCD(this.atcdForm);
    this.closeModal(modalId, e);
  }

  closeModal(modalId: string, e: Event): void {
    e.preventDefault();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";

      // Rétablissement des valeurs précédentes uniquement si aucune modification n'a été enregistrée
      if (JSON.stringify(this.atcdForm) === JSON.stringify(this.previousAtcdForm)) {
        this.atcdForm = { ...this.previousAtcdForm };
        this.sharedService.setterATCD(this.atcdForm);
      } else {
        // Si des modifications ont été enregistrées, ne faites rien
      }
    }
  }

}
