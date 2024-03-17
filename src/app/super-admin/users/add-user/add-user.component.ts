import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Users } from 'src/app/_interfaces/users';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  constructor(
    private userService:UserService,
    private route:ActivatedRoute
  ){}

  usersForm:any;
  inserted:boolean = false;
  @Output() eventEmitter = new EventEmitter<boolean>();

  initializeUserForm(){
    return {
      hopitalId : this.route.snapshot.paramMap.get("hospitalId"),
      prenom: '',
      nom: '',
      email: '',
      pseudo: '',
      password: '',
      service: '',
      speciality: '',
      status: 'A'
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
    this.usersForm = this.initializeUserForm();
  }

  checkSelect(){
    if(this.usersForm.status == 'A'){
      this.usersForm.service = '';
      this.usersForm.speciality = '';
    }
  }

  onSubmit(e:Event){
    //alert(JSON.stringify(this.usersForm))
    this.userService.createNewUser(this.usersForm).subscribe(
      (response:any)=>{
        alert(response.message);
        this.inserted = true;
        this.eventEmitter.emit(this.inserted);
        this.closeModal('modal52',e);
      },
      (err:any)=>{
        console.log(err);
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
