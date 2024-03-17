import { Component } from '@angular/core';
import { Users } from 'src/app/_interfaces/users';
import { TokenService } from 'src/app/_services/token.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-ajoutassistant',
  templateUrl: './ajoutassistant.component.html',
  styleUrls: ['./ajoutassistant.component.css']
})
export class AjoutassistantComponent {

  constructor(
    private userService:UserService,
    private tokenService:TokenService
  ){}

  user: any;
  assistantForm: any = {};
  
  ngOnInit(): void {
    const userId = this.tokenService.getUserIdFromToken();
    this.userService.getUserById(userId).subscribe(
      (user: any) => {
        this.user = user.data;
        this.initializeAssistantForm();
      },
      (err: any) => console.log(err.message())
    );
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
  
  initializeAssistantForm(): void {
    this.assistantForm = {
      hopitalId: this.user.hopitalId._id,
      prenom: '',
      nom: '',
      email: '',
      pseudo: '',
      password: '',
      service: '',
      speciality: '',
      status: 'A'
    };
  }
  
  onSubmit(){
    //alert(JSON.stringify(this.assistantForm))
    this.userService.createNewUser(this.assistantForm).subscribe(
      (response:any)=>{
        alert(response.message);
      },
      (err:any)=>{
        alert(err)
        console.log(err)
      }
    );
  }

  closeModal(modalId: string,e:Event): void {
    e.preventDefault();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
      
    }
  }
}
