import { Component } from '@angular/core';
import { ActivatedRoute,ParamMap } from '@angular/router';
import { Prescription } from 'src/app/_interfaces/prescription';
import { OrdonnanceService } from 'src/app/_services/ordonnance-service.service';
import { PrescriptionService } from 'src/app/_services/prescription-service.service';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-ajoutordonnance',
  templateUrl: './ajoutordonnance.component.html',
  styleUrls: ['./ajoutordonnance.component.css']
})
export class AjoutordonnanceComponent {

  constructor(
    private ordonnanceService:OrdonnanceService,
    private prescriptionService:PrescriptionService,
    private tokenService: TokenService,
    private route:ActivatedRoute
  ){}

  prescriptionForm:Prescription={
    userId: this.tokenService.getUserIdFromToken(),
    patientId: this.route.snapshot.paramMap.get('patientId'),
    consultationId:this.route.snapshot.paramMap.get('consultationId'),
    posologie:'',
    medicament:''
  }

  ordonnanceList:any;

  prescriptionList:any;

  patientId:any;


  prescriptionTable(patientId:string,consultationId:string){

    this.prescriptionService.getPrescriptionByPatient(patientId,consultationId).subscribe(
      (prescription:any)=>{
        this.prescriptionList = prescription;
        //alert(JSON.stringify(this.prescriptionList))
      },
      (err:any)=>console.log(err.message)
    ); 
    
  }

  ngOnInit():void{

    this.prescriptionList = []

    this.route.paramMap.subscribe((params: ParamMap) => {
      const consultationId = params.get('consultationId');
      const patientId = params.get('patientId');
      this.prescriptionForm.consultationId = consultationId;
      this.prescriptionForm.patientId = patientId;

      if(patientId && consultationId){
        this.prescriptionTable(patientId,consultationId);
      }
    });

    this.ordonnanceService.getAllOrdonnance().subscribe(
      (ordonnance:any)=>{
        this.ordonnanceList = ordonnance;
        //console.log(JSON.stringify(ordonnance))
      },
      (err:any)=>console.log(err.message)
    );

    
  }

  onSubmit(){

    this.prescriptionService.addPrescription(this.prescriptionForm).subscribe(
      (success:any)=>{
        alert("Ajouté!")
        if(this.prescriptionForm.patientId && this.prescriptionForm.consultationId){
          this.prescriptionTable(this.prescriptionForm.patientId,this.prescriptionForm.consultationId);
        }
      },
      (err:any)=>console.log(err.message)
    );

  
  }

  delete(id:string){

    this.prescriptionService.deletePrescriptionById(id).subscribe(
      (success)=>{
        alert("supprimé!");
        if(this.prescriptionForm.patientId && this.prescriptionForm.consultationId){
          this.prescriptionTable(this.prescriptionForm.patientId,this.prescriptionForm.consultationId);
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

  closeModal(modalId: string): void {
    
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
    }
  }

}
