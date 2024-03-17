import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route:ActivatedRoute,
    private router:Router
  ){}
  
  assistantList:any;
  nombreAssistant:any;
  showPatient:any = [];

  isLoading:boolean = true;

  
  isDialogOpen: boolean = false;
  messageTitle: string = '';
  messageContent: string = '';


  closeMessageDialog(): void {
    this.isDialogOpen = false;
  }

  userId:string = '';

  openDialog(id:string){
    this.userId = id;
    this.isDialogOpen = true;
  }

  actualize(){
    this.usersTable();
  }

  usersTable(){
    const hospitalId = this.tokenService.getHospitalIdFromToken()?.toString();
    this.isLoading = true;
    this.userService.getUserByHospital(hospitalId).subscribe(
      (users:any)=>{
        this.assistantList = users.data.filter((user:any)=>user.status == 'A');
        this.nombreAssistant = this.assistantList.length;
        for (let index = 5; index <= this.nombreAssistant + 5;  index += 5) {
          this.showPatient.push(index);
        }
        this.isLoading = false;
      }
    );
  }

  ngOnInit():void{
    this.usersTable();
  }

  delete(){
    if(this.userId){
      this.userService.deleteUser(this.userId).subscribe(
        (success:any)=>{
          //alert("Supprimé");
          this.closeMessageDialog();
          this.usersTable();
        },
        (err:any)=>console.log(err.message)
      );
    }

  }

  openModal(modalId: string): void {

    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "block";
    }

  }

  openModalAndUpdate(modalId: string,assistantId:any): void {
    this.router.navigateByUrl(`/admin/assistants/?assistantId=${assistantId}`).then(()=>{
      const modal = document.getElementById(modalId);
      if (modal) {
          modal.style.display = "block";
      }          
    });

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
