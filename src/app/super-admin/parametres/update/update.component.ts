import { Component } from '@angular/core';
import { SuperUserService } from 'src/app/_services/super-user.service';
import { TokenService } from 'src/app/_services/token.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {

  doctor:any;
  superUserId:string | null='';

  superUserForm:any = {
    prenom: '',
    nom: '',
    email: '',
    pseudo: ''
  }

  constructor(
    private superUserService:SuperUserService,
    private tokenService: TokenService
  ){}

  ngOnInit():void{
    this.getSuperUserInfos();
  }

  getSuperUserInfos(){
    this.superUserId = this.tokenService.getSuperUserIdFromToken();
    this.superUserService.getSuperUserById(this.superUserId).subscribe(
      (user:any)=>{
        this.doctor = user.data;
        //alert(JSON.stringify(this.doctor))
        this.initializeForm();
      }
    );
  }

  initializeForm():void{
    this.superUserForm = {
      prenom: this.doctor.prenom,
      nom: this.doctor.nom,
      email: this.doctor.email,
      pseudo: this.doctor.pseudo,
      service: this.doctor.service,
      speciality: this.doctor.speciality
    }
  }


  onSubmit(){

    this.superUserService.updateSuperUser(this.superUserId,this.superUserForm).subscribe(
      (response:any)=>{
        this.isDialogOpen = true;
        this.messageTitle = "Modifié";
        this.getSuperUserInfos();
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
