import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-password-user',
  templateUrl: './password-user.component.html',
  styleUrls: ['./password-user.component.css']
})
export class PasswordUserComponent {
  constructor(
    private userService:UserService,
    private route:ActivatedRoute,
    private router:Router
  ){ }

  usersPasswordForm:any = {};
  userId:any;

  updatedPassword:boolean = false;
  @Output() eventEmitter = new EventEmitter<boolean>();

  initializeUserForm(){

    this.usersPasswordForm = {
      password: '',
    }
    
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
  
  ngOnInit():void{
    this.route.queryParamMap.subscribe((queryParams:any) => {
 
      if (queryParams.has('userId')) {
        this.userId = queryParams.get('userId');
        if(this.userId){
          this.initializeUserForm();
        }
      }
    });
  
  }



  onSubmit(e:Event){
    //alert(JSON.stringify(this.usersPasswordForm))
    this.userService.updateDirectlyPassword(this.userId,this.usersPasswordForm).subscribe(
      (response:any)=>{
        if(response){
          alert(response.message);
          this.updatedPassword = true;
        }
        this.eventEmitter.emit(this.updatedPassword);
        this.closeModal('modal54',e);
      },
      (err:any)=>{
        console.log(err);
      }
    );
  }

  closeModal(modalId: string,e:Event): void {
    e.preventDefault();
    let hospitalId = this.route.snapshot.paramMap.get("hospitalId");
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
        this.router.navigateByUrl(`/superadmin/users/${hospitalId}`);
    }
  }
}
