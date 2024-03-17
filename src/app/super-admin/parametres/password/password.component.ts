import { Component } from '@angular/core';
import { SuperUserService } from 'src/app/_services/super-user.service';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {

  constructor(
    private superUserService:SuperUserService,
    private tokenService: TokenService
  ){}

  passwordForm:any = {
    oldPassword:"", 
    newPassword1:"",
    newPassword2:""
  }

  showPassword(eye:string,eye_slash:string, password:string){
    const eye_var = document.getElementById(eye) as HTMLElement;
    const eye_slash_var = document.getElementById(eye_slash) as HTMLElement;
    const password_var = document.getElementById(password) as HTMLInputElement;
    if(eye_slash){
      password_var.type = 'text';
      eye_slash_var.style.display = 'block';
      eye_var.style.display = 'none';
    }
  }

  hidePassword(eye:string,eye_slash:string, password:string){
    const eye_var = document.getElementById(eye) as HTMLElement;
    const eye_slash_var = document.getElementById(eye_slash) as HTMLElement;
    const password_var = document.getElementById(password) as HTMLInputElement;
    if(eye_slash){
      password_var.type = 'password';
      eye_slash_var.style.display = 'none';
      eye_var.style.display = 'block';
    }
  }

  onSubmit(){
    const superUserId = this.tokenService.getSuperUserIdFromToken();


    this.superUserService.updatePassword(superUserId,this.passwordForm).subscribe(
      (response:any)=>{

        this.isDialogOpen = true;
        this.messageContent = response.message;

        this.passwordForm.oldPassword = "";
        this.passwordForm.newPassword1 = "";
        this.passwordForm.newPassword2 = "";
      },
      (err:any)=>{
        this.messageContent = err;
      }
    )


  }

  
  isDialogOpen: boolean = false;
  messageTitle: string = '';
  messageContent: string = '';


  closeMessageDialog(): void {
    this.isDialogOpen = false;
  }
}
