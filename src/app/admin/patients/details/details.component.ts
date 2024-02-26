import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientsService } from 'src/app/_services/patients.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  constructor(
    private route:ActivatedRoute,
    private patientsService:PatientsService
    ){}

  patientId:any;
  antecedants:any;
  patient:any;

  ngOnInit():void{
  
    this.patientId = this.route.snapshot.paramMap.get('patientId');

    this.patientsService.getPatientById(this.patientId).subscribe(
      (patient:any)=>{
        if(patient){
          this.patient = patient;
        }
      
      },
      (err:any)=>console.log(err.message)
    );

  }

  activeTab = '1'; // Définissez l'onglet actif par défaut

  detect(tab: string) {
    this.activeTab = tab;
  }

}
