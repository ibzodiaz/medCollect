import { Component } from '@angular/core';
import { MeetsService } from 'src/app/_services/meets.service';
import { PatientsService } from 'src/app/_services/patients.service';

@Component({
  selector: 'app-informations',
  templateUrl: './informations.component.html',
  styleUrls: ['./informations.component.css']
})
export class InformationsComponent {
  
  constructor(
    private meetsService: MeetsService,
    private patientsService:PatientsService
  ) {}

  patientList: any = [];
  searchTerm: string = '';

  isLoading:boolean = false;

  ngOnInit():void{

    this.isLoading = true;
    this.patientsService.getPatients().subscribe(
      (patients:any)=>{
        console.log(patients);
        this.patientList = patients;
        this.isLoading = false;
      },
      (err:any)=>console.log(err.message)
    );
  }

  get filterPatients() {
    if (!this.searchTerm) {
      return this.patientList;
    } else {
      return this.patientList.filter((patient:any) =>
        patient.prenom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        patient.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        patient.adresse.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        patient.telephone.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

}
