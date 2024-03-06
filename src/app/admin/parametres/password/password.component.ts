import { Component } from '@angular/core';
import { TokenService } from 'src/app/_services/token.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {

  constructor(
    private userService:UserService,
    private tokenService: TokenService
  ){}

  passwordForm:any = {
    oldPassword:"", 
    newPassword1:"",
    newPassword2:""
  }

  onSubmit(){
    const userId = this.tokenService.getUserIdFromToken();

    if(this.passwordForm.newPassword1 === this.passwordForm.newPassword2){
      this.userService.updatePassword(userId,this.passwordForm).subscribe(
        (response:any)=>{
          alert(JSON.stringify(response));
          this.passwordForm.oldPassword = "";
          this.passwordForm.newPassword1 = "";
          this.passwordForm.newPassword2 = "";
        },
        (err:any)=>{
          console.log(err.message)
          alert(err.message)
        }
      )
    }
    else
    {
      alert("unmatch passwords!");
    }

  }
}
