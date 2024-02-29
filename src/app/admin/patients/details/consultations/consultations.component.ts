import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Consultation } from 'src/app/_interfaces/consultation';
import { ConsultationService } from 'src/app/_services/consultation.service';
import { PatientsService } from 'src/app/_services/patients.service';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.css']
})
export class ConsultationsComponent {

  dateActuelle: string;
  uploaded:boolean = false;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private patientService:PatientsService,
    private tokenService:TokenService,
    private consultationService:ConsultationService
  ){
    this.dateActuelle = new Date().toISOString().substring(0, 10);
  }

  patientId:any ='';
  userId:any = this.tokenService.getUserIdFromToken();

  consultationId:string = '';
  consultationList:any[] = [];

  consultation: Consultation = {
    userId: this.userId,
    patientId: this.route.snapshot.paramMap.get('patientId'),
    motif: '',
    complet: false
  }

  ngOnInit():void{
    this.getPatient();
    this.consultation;
    this.getAllConsultationByPatient();

  }

  getPatient(){
    this.patientId = this.route.snapshot.paramMap.get('patientId');
    this.patientService.getPatientById(this.patientId).subscribe(
      (patient:any)=>{

      },
      (err:any)=>console.log(err.message)
    );
  }

  getAllConsultationByPatient(){
    const userId:any = this.tokenService.getUserIdFromToken();
    this.consultationService.getConsultationByPatientId(this.patientId,userId).subscribe(
      (consultations:any)=>{
        if(consultations){
          this.consultationList = consultations;
          //console.log(JSON.stringify(consultations))
          // for(let cons of this.consultationList){
          //   console.log(cons.date)
          // }
        
        }
      },
      (err:any)=>console.log(err.message)
    );
  }


  onSubmit(){

    //console.log(JSON.stringify(this.consultation));
    this.consultationService.addConsultation(this.consultation).subscribe(
      (patient:any)=>{
        alert("succès!");
        this.getAllConsultationByPatient();
      },
      (err:any)=>console.log(err.message)
    );
  }

  openModal(modalId: string, patientId: string, consultationId: string): void {
    
    const url = `/admin/patients/details/${patientId}/${consultationId}`;

    // Naviguer vers l'URL
    this.router.navigateByUrl(url).then(() => {
        // Une fois la navigation terminée, afficher le modal
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
    return Math.min(this.startIndex + this.rowsPerPage - 1, this.consultationList.length - 1);
  }

  // Obtenir les patients filtrés en fonction du terme de recherche
  get filteredPatients(): any[] {
    if (!this.searchTerm.trim()) {
      // Si le champ de recherche est vide, retournez la liste complète des patients
      return this.consultationList.slice(this.startIndex, this.endIndex + 1);
    }
    // Sinon, filtrez les patients par nom ou prénom
    return this.consultationList.filter((patient:any) =>
      patient.motif.toLowerCase().includes(this.searchTerm.toLowerCase())
    ).slice(this.startIndex, this.endIndex + 1);
  }


}
