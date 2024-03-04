import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FunctionsService } from 'src/app/_services/functions.service';
import { PatientsService } from 'src/app/_services/patients.service';

@Component({
  selector: 'app-dossiers',
  templateUrl: './dossiers.component.html',
  styleUrls: ['./dossiers.component.css']
})
export class DossiersComponent implements OnInit {
  constructor(
              private router: Router,
              private patientsService:PatientsService,
              private functionsService:FunctionsService
              ) {}

  patientsList: any = [];
  isLoading: boolean = true;
  nombrePatient:any;
  showPatient:any = [];

  inserted: boolean = false;
  updated:boolean =false;
      
  isDialogOpen: boolean = false;
  messageTitle: string = '';
  messageContent: string = '';


  closeMessageDialog(): void {
    this.isDialogOpen = false;
  }

  ngOnInit(): void {

    this.updatedTable();

  }


  insertState($event: boolean){
    this.inserted = $event;
    
    if (this.inserted) {

      this.updatedTable();
      this.isDialogOpen = true;
      this.messageTitle = 'Enregistré';
      this.messageContent = '';
      this.isLoading = true;

    }

  }

  updateState($event: boolean){
    this.updated = $event;

    if (this.updated) {

      this.updatedTable();
      this.isDialogOpen = true;
      this.messageTitle = 'Modifié';
      this.messageContent = '';
      this.isLoading = true;

    }
  }


  updatedTable(){

    this.patientsService.getPatients().subscribe(
      (patients: any) => {
        if(patients){
          this.patientsService.setPatientsList(patients);
          this.patientsList = patients;
          this.nombrePatient = patients.length;
          for (let index = 5; index <= this.nombrePatient + 5;  index += 5) {
            this.showPatient.push(index);
          }
          this.isLoading = false;
        }

      },
      (err:any) => console.error(err)
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
    return Math.min(this.startIndex + this.rowsPerPage - 1, this.patientsList.length - 1);
  }

  // Obtenir les patients filtrés en fonction du terme de recherche
  get filteredPatients(): any[] {
    if (!this.searchTerm.trim()) {
      // Si le champ de recherche est vide, retournez la liste complète des patients
      return this.patientsList.slice(this.startIndex, this.endIndex + 1);
    }
    // Sinon, filtrez les patients par nom ou prénom
    return this.patientsList.filter((patient:any) =>
      patient.prenom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      patient.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
    ).slice(this.startIndex, this.endIndex + 1);
  }


  getPatientId(patientId: string):void{
    if(patientId != ''){
      this.router.navigate([], {
        queryParams: { patientId: patientId },
        queryParamsHandling: 'merge',
      });

    }
  }

  deletionConfirmed: boolean = false;
  patientIdToDelete: string = '';

  openModal(modalId: string, patientId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "block";
      this.getPatientId(patientId);
      this.patientIdToDelete = patientId;
      
    }
  }

  initURL():void{
    this.isLoading = true;
    this.router.navigate([], {
      queryParams: { patientId: null },
      queryParamsHandling: 'merge',
    });
  }


  delete(patientId: string): void {
    if (this.deletionConfirmed) {
      this.patientsService.deletePatients(patientId).subscribe(
        (patients: any) => {
          this.updatedTable();
          this.initURL();
        },
        (err: any) => console.error(err)
      );
    }
  }
  

}
