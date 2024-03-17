import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/_services/shared.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {

  constructor(
    private userService:UserService,
    private route:ActivatedRoute,
    private router:Router,
    private sharedService:SharedService
  ){ }

  usersForm:any = {};
  userId:any;
  user:any;

  updated:boolean = false;
  @Output() eventEmitter = new EventEmitter<boolean>();

  initializeUserForm(){

    this.usersForm = {
      hopitalId : this.route.snapshot.paramMap.get("hospitalId"),
      prenom: '',
      nom: '',
      email: '',
      pseudo: '',
      service: '',
      speciality: '',
      status: ''
    }
    
  }

  ngOnInit():void{
    this.route.queryParamMap.subscribe((queryParams:any) => {
 
      if (queryParams.has('userId')) {
        this.userId = queryParams.get('userId');
        if(this.userId){
          this.initializeUserForm();
          this.getUserInformations();
        }
      }
    });
  
  }

  checkSelect(){
    if(this.usersForm.status == 'A'){
      this.usersForm.service = '';
      this.usersForm.speciality = '';
    }
  }

  getUserInformations(){
    this.userService.getUserById(this.userId).subscribe(
      (user:any)=>{
        if(user){
          this.usersForm  = user.data;
        }
      },
      (err:any)=>console.log(err.message)
    );
  }

  onSubmit(e:Event){
    //alert(JSON.stringify(this.usersForm))
    this.userService.updateUser(this.userId,this.usersForm).subscribe(
      (response:any)=>{
        if(response){
          alert(response.message);
          this.updated = true;
        }
        this.eventEmitter.emit(this.updated);
        this.closeModal('modal53',e);
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
