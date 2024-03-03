import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MeetsService } from 'src/app/_services/meets.service';
import { TokenService } from 'src/app/_services/token.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent {


  constructor(
    private meetsService:MeetsService,
    private route: ActivatedRoute,
    private userService:UserService,
    private tokenService:TokenService
  ){}

  meetsPatientList: any[]=[];

  isLoading:boolean = true;
  
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
    this.meetTable();
  }

  meetTable(){
    let patientId = this.route.snapshot.paramMap.get('patientId');
    let userId:any = this.tokenService.getUserIdFromToken();
    this.isLoading = true;
    this.meetsService.getMeetsByPatientIdAndDoctorId(patientId,userId).subscribe(
      (patient:any)=>{
        this.meetsPatientList = patient;
        //alert(JSON.stringify(this.meetsPatientList))
        this.isLoading = false;
      },
      (err:any)=>console.log(err.message)
    );
  }

  actualize(){
    this.meetTable();
  }

  openModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "block";
      
    }
  }
}
