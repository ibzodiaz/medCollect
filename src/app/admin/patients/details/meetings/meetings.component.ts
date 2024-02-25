import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeetsService } from 'src/app/_services/meets.service';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent {


  constructor(
    private meetsService:MeetsService,
    private route: ActivatedRoute
  ){}

  meetsPatientList: any[]=[];
  
  getDateActuelleFormatted(): string {
    const dateActuelle: Date = new Date();
    return this.formatDate(dateActuelle);
  }

  // Fonction pour formater la date
  private formatDate(date: Date): string {
    const day: string = this.addZero(date.getDate());
    const month: string = this.addZero(date.getMonth() + 1);
    const year: number = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  // Fonction pour ajouter un zéro devant si nécessaire
  private addZero(num: number): string {
    return num < 10 ? '0' + num : '' + num;
  }

  ngOnInit():void{
    let patientId = this.route.snapshot.paramMap.get('patientId');
    this.meetsService.getMeetsByPatientId(patientId).subscribe(
      (patient:any)=>{
        this.meetsPatientList = patient;
        //alert(JSON.stringify(this.meetsPatientList))
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
