import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ConsultationService } from 'src/app/_services/consultation.service';
import { PrescriptionService } from 'src/app/_services/prescription-service.service';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-ordonnances',
  templateUrl: './ordonnances.component.html',
  styleUrls: ['./ordonnances.component.css']
})
export class OrdonnancesComponent {

  consultationList:any[] = [];
  patientId:any;
  consultationId:any;

  prescriptionList:any;
  isLoading:boolean = true;

  constructor(
    private consultationService:ConsultationService,
    private route:ActivatedRoute,
    private router:Router,
    private prescriptionService:PrescriptionService,
    private tokenService:TokenService
  ){}

  inactive:any[]=[];

  ngOnInit():void{
    this.getAllConsultationByPatient();

    this.inactive = Array.from(document.querySelectorAll('.inactive')) as HTMLInputElement[];
    this.inactive.forEach((element: HTMLInputElement) => {
        element.disabled = true;
    });

  }


  isDialogOpen: boolean = false;
  messageTitle: string = '';
  messageContent: string = '';


  closeMessageDialog(): void {
    this.isDialogOpen = false;
  }

  openDialog(){
    this.isDialogOpen = true;
  }

  actualize(){
    this.getAllConsultationByPatient();
    this.route.paramMap.subscribe((params: ParamMap) => {
      const consultationId = params.get('consultationId');
      const patientId = params.get('patientId');

      if(patientId && consultationId){
        this.prescriptionTable(patientId,consultationId);
      }
    });
  }
  
  selectedConsultation: any;

  navigateToDetails(patientId: string, consultationId: string,consultation:any): void {

    this.inactive.forEach((element: HTMLInputElement) => {
      element.disabled = false;
    });

    this.selectedConsultation = consultation;
    this.router.navigate(['/admin/patients/details', patientId, consultationId]);

    //this.prescriptionList = []

    if(patientId && consultationId){
      this.patientId = patientId;
      this.consultationId = consultationId;
      this.prescriptionTable(patientId,consultationId);
    }

  }

  selectedOrdonnace:any;
  showPatient:any = [];

  theSelectedOrdonnace(ordonnance:any):void{
    this.selectedOrdonnace = ordonnance;
  }

  prescriptionTable(patientId:string,consultationId:string){

    this.prescriptionService.getPrescriptionByPatient(patientId,consultationId).subscribe(
      (prescription:any)=>{
        this.prescriptionList = prescription;
      },
      (err:any)=>console.log(err.message)
    ); 
    
  }

  getAllConsultationByPatient(){
    this.isLoading = true;
    this.patientId = this.route.snapshot.paramMap.get('patientId');
    const userId:any = this.tokenService.getUserIdFromToken();
    this.consultationService.getConsultationByPatientId(this.patientId,userId).subscribe(
      (consultations:any)=>{
        if(consultations){
          this.consultationList = consultations;
          if(this.consultationList){
            for (let index = 5; index <= this.consultationList.length + 5;  index += 5) {
              this.showPatient.push(index);
            }
          }
          this.isLoading = false;
        }
      },
      (err:any)=>console.log(err.message)
    );
  }


  delete(patientId:string,consultationId:string){
    this.prescriptionService.deletePrescriptionByConsultation(patientId,consultationId).subscribe(
      (success:any)=>{
        //alert('Supprimé!')
            
        this.closeMessageDialog();
        if(patientId && consultationId){
          this.prescriptionTable(patientId,consultationId);
        }
        
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
    return Math.min(this.startIndex + this.rowsPerPage - 1, this.consultationList.length - 1);
  }

  get filteredPatients(): any[] {
    if (!this.searchTerm.trim()) {
      // Si le champ de recherche est vide, retournez la liste complète des patients
      return this.consultationList.slice(this.startIndex, this.endIndex + 1);
    }
    // Sinon, filtrez les patients par motif ou date
    const searchTermLowerCase = this.searchTerm.toLowerCase();
    return this.consultationList.filter((patient: any) => {
      return patient.motif.toLowerCase().includes(searchTermLowerCase) ||
        this.formatDate(patient.createdAt).includes(searchTermLowerCase);
    }).slice(this.startIndex, this.endIndex + 1);
  }
  
  formatDate(dateString: string): string {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }
  
}
