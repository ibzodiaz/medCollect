import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patients } from 'src/app/_interfaces/patients';
import { PatientsService } from 'src/app/_services/patients.service';

@Component({
  selector: 'app-sociodemo',
  templateUrl: './sociodemo.component.html',
  styleUrls: ['./sociodemo.component.css']
})
export class SociodemoComponent {
  constructor(private route: ActivatedRoute,private patientsService:PatientsService) {}

  patient: any;
  patientId: any;
  isLoading: boolean = true;

  updated:boolean = false;

  @Output() emittedEvent =  new EventEmitter<boolean>();

  patientForm: Patients = {
    prenom:'',
    nom:'',
    age: '',
    adresse: '',
    telephone: '',
    statut: '',
    profession: '',
    niveau_socioeconomique: ''
  };

  ngOnInit(): void {
    
    this.route.queryParamMap.subscribe((queryParams:any) => {
 
      if (queryParams.has('patientId')) {
        this.patientId = queryParams.get('patientId');

        this.patientsService.getPatientById(this.patientId).subscribe(
          (patient: any) => {
            this.patient = patient;
            this.isLoading = false;
            this.initializeFormWithPatientData();
          },
          (err:any) => console.error(err)
        );
      }
    });

    
  }

  initializeFormWithPatientData() {
    this.patientForm = { ...this.patient };
  }

 
  onSubmit(){
    
    this.patientsService.updatePatients(this.patientId,this.patientForm).subscribe(
      (patients: any) => {
        
        this.updated = true;
        this.emittedEvent.emit(this.updated);

        this.isLoading = false;
      },
      (err:any) => console.error(err)
    );
  }

  openModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "block";

    }
  }

  closeModal(modalId: string, e: Event): void {
    e.preventDefault();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
    }
  }

}
