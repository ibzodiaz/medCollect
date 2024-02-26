import { Component } from '@angular/core';
import { Ordonnance } from 'src/app/_interfaces/ordonnance';
import { OrdonnanceService } from 'src/app/_services/ordonnance-service.service';

@Component({
  selector: 'app-ordonnances',
  templateUrl: './ordonnances.component.html',
  styleUrls: ['./ordonnances.component.css']
})
export class OrdonnancesComponent {

  constructor(
    private ordonnanceService:OrdonnanceService
  ){}

  ordonnanceForm:Ordonnance={
    posologie: '',
    medicament: ''
  }

  ordonnanceList:any;

  updateTable(){
    this.ordonnanceService.getAllOrdonnance().subscribe(
      (ordonnance:any)=>{
        this.ordonnanceList = ordonnance;
        //console.log(JSON.stringify(ordonnance))
      },
      (err:any)=>console.log(err.message)
    );
  }

  ngOnInit():void{
    this.updateTable();
  }

  onSubmit(){
    this.ordonnanceService.addOrdonnance(this.ordonnanceForm).subscribe(
      (success:any)=>{
        alert("Ajouté");
        this.updateTable();
      },
      (err:any)=>console.log(err.message)
    );
  }

  searchTerm: string = '';
  rowsPerPage: number = 5; // Nombre de lignes par page
  currentPage: number = 1; // Page actuelle

  // Calculer l'index de début et de fin pour afficher les ordonnances sur la page actuelle
  get startIndex(): number {
    return (this.currentPage - 1) * this.rowsPerPage;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.rowsPerPage - 1, this.ordonnanceList.length - 1);
  }

  // Obtenir les ordonnances filtrés en fonction du terme de recherche
  get filteredOrdonnances(): any[] {
    if (!this.searchTerm.trim()) {
      // Si le champ de recherche est vide, retournez la liste complète des ordonnances
      return this.ordonnanceList.slice(this.startIndex, this.endIndex + 1);
    }
    // Sinon, filtrez les ordonnances par nom ou prénom
    return this.ordonnanceList.filter((ordonnance:any) =>
      ordonnance.posologie.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      ordonnance.medicament.toLowerCase().includes(this.searchTerm.toLowerCase())
    ).slice(this.startIndex, this.endIndex + 1);
  }

  delete(id:any){
    this.ordonnanceService.deleteOrdonnanceById(id).subscribe(
      (success:any)=>{
        alert("Supprimé");
        this.updateTable();
      },
      (err:any)=>console.log(err.message)
    );
  }
}
