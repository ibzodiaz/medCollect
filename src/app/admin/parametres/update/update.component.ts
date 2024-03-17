import { Component } from '@angular/core';
import { TokenService } from 'src/app/_services/token.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {

  doctor:any;
  doctorId:string | null='';

  doctorForm:any = {
    prenom: '',
    nom: '',
    email: '',
    pseudo: '',
    service: '',
    speciality: '',
    status:'A'
  }

  constructor(
    private userService:UserService,
    private tokenService: TokenService
  ){}

  ngOnInit():void{
    this.getDoctorInfos();
  }

  getDoctorInfos(){
    this.doctorId = this.tokenService.getUserIdFromToken();
    this.userService.getUserById(this.doctorId).subscribe(
      (user:any)=>{
        this.doctor = user.data;
        //alert(JSON.stringify(this.doctor))
        this.initializeForm();
      }
    );
  }

  initializeForm():void{
    this.doctorForm = {
      prenom: this.doctor.prenom,
      nom: this.doctor.nom,
      email: this.doctor.email,
      pseudo: this.doctor.pseudo,
      service: this.doctor.service,
      speciality: this.doctor.speciality,
      status: this.doctor.status
    }
  }


  onSubmit(){

    this.userService.updateUser(this.doctorId,this.doctorForm).subscribe(
      (response:any)=>{
        this.isDialogOpen = true;
        this.messageTitle = "Modifié";
        this.getDoctorInfos();
      },
      (err:any)=>console.log(err.message)
    );
  }

    
  isDialogOpen: boolean = false;
  messageTitle: string = '';
  messageContent: string = '';


  closeMessageDialog(): void {
    this.isDialogOpen = false;
  }
}
