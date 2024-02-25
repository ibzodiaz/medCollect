import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsultationService } from 'src/app/_services/consultation.service';

@Component({
  selector: 'app-ordonnances',
  templateUrl: './ordonnances.component.html',
  styleUrls: ['./ordonnances.component.css']
})
export class OrdonnancesComponent {

  consultationList:any[] = [];
  patientId:any;

  constructor(
    private consultationService:ConsultationService,
    private route:ActivatedRoute
  ){}

  ngOnInit():void{
    this.getAllConsultationByPatient();
  }

  getAllConsultationByPatient(){
    this.patientId = this.route.snapshot.paramMap.get('patientId');

    this.consultationService.getConsultationByPatientId(this.patientId).subscribe(
      (consultations:any)=>{
        if(consultations){
          this.consultationList = consultations;
          // for(let cons of this.consultationList){
          //   console.log(cons.date)
          // }
        
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
}
