import { Component, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PrescriptionService } from 'src/app/_services/prescription-service.service';
import { TokenService } from 'src/app/_services/token.service';
import { UserService } from 'src/app/_services/user.service';

declare var html2pdf: any;

@Component({
  selector: 'app-printordonnance',
  templateUrl: './printordonnance.component.html',
  styleUrls: ['./printordonnance.component.css']
})
export class PrintordonnanceComponent {

  
  prescriptionList:any;
  patientId:any;
  consultationId:any;

  patientPrenom:string='';
  patientNom:string='';
  patientAge:number = 0;


  constructor(
    private prescriptionService:PrescriptionService,
    private route:ActivatedRoute,
    private userService:UserService,
    private tokenService:TokenService
  ){}

  dateActuelle:any;
  hospital:any;

  ngOnInit():void{

    this.dateActuelle = new Date().toISOString().toString();

    this.prescriptionTable();

    let userId = this.tokenService.getUserIdFromToken();
    this.userService.getUserById(userId).subscribe(
      (user:any)=>{
        //alert(JSON.stringify(user.data))
        this.hospital = user.data;
        //console.log(this.hospital)
      },
      (err:any)=>console.log(err.message)
    );

  }

  actualize(){
    this.prescriptionTable();
  }


  generatePDF() {
    const element = document.getElementById('content-print-2') as HTMLElement;
    
    // Mesurez la hauteur réelle du contenu de l'élément
    const contentHeight = element.scrollHeight;
    
    // Ajustez la hauteur de l'élément
    element.style.height = contentHeight + 'px';
    
    const options = {
        margin: 5,
        filename: 'ordonnance.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 4 },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait',
            putOnlyUsedFonts: true,
        }
    };

    // Appelez html2canvas après avoir ajusté la hauteur de l'élément
    html2pdf(element, options); 
}

  
  prescriptionTable(){

    this.route.paramMap.subscribe((params: ParamMap) => {
      const consultationId = params.get('consultationId');
      const patientId = params.get('patientId');

      if(patientId && consultationId){

        this.prescriptionService.getPrescriptionByPatient(patientId,consultationId).subscribe(
          (prescription:any)=>{
            this.prescriptionList = prescription;
            //console.log(prescription)
            this.patientNom = prescription[0].patientId.nom;
            this.patientPrenom = prescription[0].patientId.prenom;
            this.patientAge = prescription[0].patientId.age;
          },
          (err:any)=>console.log(err.message)
        ); 
      }
    });
    
  }

  openModal(modalId: string): void {

    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
    }
  }

  closeModal(modalId: string,e:Event): void {
    e.preventDefault();
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
    }
  }
}
