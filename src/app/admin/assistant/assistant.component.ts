import { Component } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.css']
})
export class AssistantComponent {

  
  constructor(
    private userService:UserService
  ){}
  
  assistantList:any;

  usersTable(){
    this.userService.getUsers().subscribe(
      (users:any)=>{
        this.assistantList = users.data.filter((user:any)=>user.status == 'A');
        //console.log(this.assistantList)
      }
    );
  }

  ngOnInit():void{
    this.usersTable();
  }

  openModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "block";
      
    }
  }


}
