import { Component } from '@angular/core';
import { ActivatedRoute,ParamMap } from '@angular/router';
import { Consultation } from 'src/app/_interfaces/consultation';
import { ConsultationService } from 'src/app/_services/consultation.service';
import { MotifsService } from 'src/app/_services/motifs.service';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-updateordonnance',
  templateUrl: './updateordonnance.component.html',
  styleUrls: ['./updateordonnance.component.css']
})
export class UpdateordonnanceComponent {

  constructor(
    private tokenService:TokenService,
    private route:ActivatedRoute,
    private consultationService:ConsultationService,
    private motifsService:MotifsService
  ){}

  consultationForm:Consultation={
    userId: this.tokenService.getUserIdFromToken(),
    patientId: this.route.snapshot.paramMap.get('patientId'),
    motif: "",
    complet: false
  }

  motifsList:any;

  ngOnInit():void{
    this.motifTable();
  }

  motifTable(){
    this.motifsService.getMotif().subscribe(
      (motifs:any)=>{
        this.motifsList=motifs;
      },
      (err:any)=>console.log(err.message)
    );
  }

  onSubmit(){

    this.route.paramMap.subscribe((params: ParamMap) => {
      const consultationId = params.get('consultationId');
      if(consultationId){
        this.consultationService.updateConsultation(consultationId,this.consultationForm).subscribe(
          (success:any)=>{
            alert("Modifié");
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
