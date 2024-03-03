import { Component, EventEmitter, Output } from '@angular/core';
import { Patients } from 'src/app/_interfaces/patients';
import { PatientsService } from 'src/app/_services/patients.service';

@Component({
  selector: 'app-addpatient',
  templateUrl: './addpatient.component.html',
  styleUrls: ['./addpatient.component.css']
})
export class AddpatientComponent {
  constructor(private patientsService:PatientsService) {}

  ngOnInit(): void {}

  inserted: boolean = false;
  
  @Output() emittedEvent =  new EventEmitter<boolean>();

  patientForm: Patients = {
    prenom:'',
    nom:'',
    age: '',
    adresse: '',
    telephone: '',
    statut: '',
    profession: '',
    niveau_socioeconomique: '',
    sexe:'M'
  };

  patientsList: any = [];
  isLoading: boolean = true;

  onSubmit(){
    this.patientsService.addPatient(this.patientForm).subscribe(
      (patients: any) => {

        this.inserted = true;
        this.emittedEvent.emit(this.inserted);

        this.isLoading = false;
      },
      err => console.error(err)
    )
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
    }
  }

}
