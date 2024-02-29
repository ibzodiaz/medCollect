import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SharedService } from 'src/app/_services/shared.service';
import { TokenService } from 'src/app/_services/token.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.css']
})
export class AssistantComponent {

  
  constructor(
    private userService:UserService,
    private tokenService:TokenService,
    private sharedService:SharedService,
    private route:ActivatedRoute
  ){}
  
  assistantList:any;

  usersTable(){
    const hospitalId = this.tokenService.getHospitalIdFromToken()?.toString();

    this.userService.getUserByHospital(hospitalId).subscribe(
      (users:any)=>{
        this.assistantList = users.data.filter((user:any)=>user.status == 'A');
        //console.log(this.assistantList)
      }
    );
  }

  ngOnInit():void{
    this.usersTable();
  }

  delete(userId:string){
    this.userService.deleteUser(userId).subscribe(
      (success:any)=>{
        alert("Supprimé");
        this.usersTable();
      },
      (err:any)=>console.log(err.message)
    );
  }

  openModal(modalId: string): void {

    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "block";
    }

  }

  
  searchTerm: string = '';
  rowsPerPage: number = 5; // Nombre de lignes par page
  currentPage: number = 1; // Page actuelle

  // Calculer l'index de début et de fin pour afficher les patients sur la page actuelle
  get startIndex(): number {
    return (this.currentPage - 1) * this.rowsPerPage;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.rowsPerPage - 1, this.assistantList.length - 1);
  }

  // Obtenir les patients filtrés en fonction du terme de recherche
  get filteredPatients(): any[] {
    if (!this.searchTerm.trim()) {
      // Si le champ de recherche est vide, retournez la liste complète des patients
      return this.assistantList.slice(this.startIndex, this.endIndex + 1);
    }
    // Sinon, filtrez les patients par nom ou prénom
    return this.assistantList.filter((assistant:any) =>
      assistant.prenom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      assistant.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      assistant.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    ).slice(this.startIndex, this.endIndex + 1);
  }



}
