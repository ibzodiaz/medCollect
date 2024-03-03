import { Component } from '@angular/core';
import { Medicaments } from 'src/app/_interfaces/medicaments';
import { Ordonnance } from 'src/app/_interfaces/ordonnance';
import { Posologie } from 'src/app/_interfaces/posologie';
import { MedicamentsService } from 'src/app/_services/medicaments.service';
import { OrdonnanceService } from 'src/app/_services/ordonnance-service.service';
import { PosologieService } from 'src/app/_services/posologie.service';

@Component({
  selector: 'app-ordonnances',
  templateUrl: './ordonnances.component.html',
  styleUrls: ['./ordonnances.component.css']
})
export class OrdonnancesComponent {

  constructor(
    private ordonnanceService:OrdonnanceService,
    private posologieService:PosologieService,
    private medicamentsService:MedicamentsService
  ){}

  posologieForm:Posologie={
    posologie: ''
  }

  medicamentForm:Medicaments={
    medicament: ''
  }

  posologieList:any = [];
  medicamentList:any = [];

  medicamentNombre:number = 0;
  posologieNombre:number = 0;

  showMedical:any = [];

  updateMedicamentTable(){
    this.medicamentsService.getAllMedicaments().subscribe(
      (medicament:any)=>{
        this.medicamentList = medicament;
        this.medicamentNombre = this.medicamentList.length;
      },
      (err:any)=>console.log(err.message)
    );
  }

  
  updatePosologieTable(){
    this.posologieService.getAllPosologie().subscribe(
      (posologie:any)=>{
        this.posologieList = posologie;
        this.posologieNombre = this.posologieList.length;
      },
      (err:any)=>console.log(err.message)
    );
  }

  ngOnInit():void{
    this.updateMedicamentTable();
    this.updatePosologieTable();
  }

  counter(length: number, increment: number): number[] {
    const endIndex = length + 5;
    return Array.from({ length: (endIndex) / increment }, (_, index) => (index * increment) + 5);
  }

  searchTermM: string = '';
  rowsPerPageM: number = 5; // Nombre de lignes par page

  currentPage: number = 1; // Page actuelle

  searchTermP: string = '';
  rowsPerPageP: number = 5; // Nombre de lignes par page

  // Calculer l'index de début et de fin pour afficher les ordonnances sur la page actuelle
  get startIndexM(): number {
    return (this.currentPage - 1) * this.rowsPerPageM;
  }

  get endIndexM(): number {
    return Math.min(this.startIndexM + this.rowsPerPageM - 1, this.medicamentList.length - 1);
  }

  // Obtenir les ordonnances filtrés en fonction du terme de recherche
  get filteredMedicaments(): any[] {
    if (!this.searchTermM.trim()) {
      // Si le champ de recherche est vide, retournez la liste complète des ordonnances
      return this.medicamentList.slice(this.startIndexM, this.endIndexM + 1);
    }
    // Sinon, filtrez les ordonnances par nom ou prénom
    return this.medicamentList.filter((medicament:any) =>
      medicament.medicament.toLowerCase().includes(this.searchTermM.toLowerCase())
    ).slice(this.startIndexM, this.endIndexM + 1);
  }


    // Calculer l'index de début et de fin pour afficher les ordonnances sur la page actuelle
    get startIndexP(): number {
      return (this.currentPage - 1) * this.rowsPerPageP;
    }
  
    get endIndexp(): number {
      return Math.min(this.startIndexP + this.rowsPerPageP - 1, this.medicamentList.length - 1);
    }
  
    // Obtenir les ordonnances filtrés en fonction du terme de recherche
    get filteredPosologie(): any[] {
      if (!this.searchTermP.trim()) {
        // Si le champ de recherche est vide, retournez la liste complète des ordonnances
        return this.posologieList.slice(this.startIndexP, this.endIndexp + 1);
      }
      // Sinon, filtrez les ordonnances par nom ou prénom
      return this.posologieList.filter((posologie:any) =>
        posologie.posologie.toLowerCase().includes(this.searchTermP.toLowerCase())
      ).slice(this.startIndexP, this.endIndexp + 1);
    }

  deleteMedicament(id:any){
    this.medicamentsService.deleteMedicamentsById(id).subscribe(
      (success:any)=>{
        alert("Supprimé");
        this.updateMedicamentTable();
      },
      (err:any)=>console.log(err.message)
    );
  }

  deletePosologie(id:any){
    this.posologieService.deletePosologieById(id).subscribe(
      (success:any)=>{
        alert("Supprimé");
        this.updatePosologieTable();
      },
      (err:any)=>console.log(err.message)
    );
  }
}
