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


}
