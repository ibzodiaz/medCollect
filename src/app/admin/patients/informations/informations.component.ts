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


    
  searchTerm: string = '';
  rowsPerPage: number = 5; // Nombre de lignes par page
  currentPage: number = 1; // Page actuelle

  // Calculer l'index de début et de fin pour afficher les patients sur la page actuelle
  get startIndex(): number {
    return (this.currentPage - 1) * this.rowsPerPage;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.rowsPerPage - 1, this.patientList.length - 1);
  }

  // Obtenir les patients filtrés en fonction du terme de recherche
  get filteredPatients(): any[] {
    if (!this.searchTerm.trim()) {
      // Si le champ de recherche est vide, retournez la liste complète des patients
      return this.patientList.slice(this.startIndex, this.endIndex + 1);
    }
      // Sinon, filtrez les patients par nom ou prénom
      return this.patientList.filter((patient:any) =>
      patient.prenom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      patient.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      patient.adresse.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      patient.telephone.toLowerCase().includes(this.searchTerm.toLowerCase())
    ).slice(this.startIndex, this.endIndex + 1);
  }


}
