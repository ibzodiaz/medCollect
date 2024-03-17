import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SharedService } from 'src/app/_services/shared.service';
import { TokenService } from 'src/app/_services/token.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-passwordassistant',
  templateUrl: './passwordassistant.component.html',
  styleUrls: ['./passwordassistant.component.css']
})
export class PasswordassistantComponent {
  constructor(
    private userService:UserService,
    private tokenService:TokenService,
    private sharedService:SharedService,
    private route:ActivatedRoute
  ){}

  user: any;
  assistantPasswordForm: any =  {
    password: ''
  };
  
  ngOnInit(): void {

    // this.route.queryParamMap.subscribe((queryParams:any) => {
 
    //   if (queryParams.has('assistantId')) {
    //     const assistantId = queryParams.get('assistantId');
    //     if(assistantId){
    //       this.getAssistant(assistantId);
    //     }
    //   }
    // });

    
    //console.log(JSON.stringify(this.assistantPasswordForm))

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
  
  onSubmit(e:Event){
    
    this.route.queryParamMap.subscribe((queryParams:any) => {
      if (queryParams.has('assistantId')) {
        const assistantId = queryParams.get('assistantId');
        if(assistantId){
          //alert(assistantId+'*****'+JSON.stringify(this.assistantPasswordForm))
          this.userService.updateDirectlyPassword(assistantId,this.assistantPasswordForm).subscribe(
            (response:any)=>{
              alert(response.message);
              this.closeModal('modal34',e);
            },
            (err:any)=>{
              alert(err);
              console.log(err)
            }
          );
        }
      }
    });

  }

  closeModal(modalId: string,e:Event): void {
    e.preventDefault();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
      
    }
  }
}
