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
      (success:any)=>{
        alert("Créé!");
      },
      (err:any)=>console.log(err.message)
    );
  }

  closeModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
      
    }
  }
}
