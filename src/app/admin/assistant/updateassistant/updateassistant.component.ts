import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SharedService } from 'src/app/_services/shared.service';
import { TokenService } from 'src/app/_services/token.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-updateassistant',
  templateUrl: './updateassistant.component.html',
  styleUrls: ['./updateassistant.component.css']
})
export class UpdateassistantComponent {
  constructor(
    private userService:UserService,
    private tokenService:TokenService,
    private sharedService:SharedService,
    private route:ActivatedRoute
  ){}

  user: any;
  assistantForm: any = {};

  getAssistant(assistantId:string){
    this.userService.getUserById(assistantId).subscribe(
      (user: any) => {
        this.user = user.data;
        this.initializeAssistantForm();
      },
      (err: any) => console.log(err.message())
    );

  }
  
  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      const assistantId = params.get('assistantId');
      if(assistantId){
        this.getAssistant(assistantId);
      }
    });

    
    //console.log(JSON.stringify(this.assistantForm))

  }
  
  initializeAssistantForm(): void {
    this.assistantForm = {
      hopitalId: this.user.hopitalId._id,
      prenom: this.user.prenom,
      nom: this.user.nom,
      email: this.user.email,
      pseudo: this.user.pseudo,
      password: '',
      service: '',
      speciality: '',
      status: this.user.status
    };
  }
  
  onSubmit(){
    
    //alert(this.sharedService.getterAssistantId())
    //alert(JSON.stringify(this.assistantForm))

    this.route.paramMap.subscribe((params: ParamMap) => {
      const assistantId = params.get('assistantId');
      if(assistantId){
        //alert(assistantId+'*****'+JSON.stringify(this.assistantForm))
        this.userService.updateUser(assistantId,this.assistantForm).subscribe(
          (success:any)=>{
            alert("Modifié!");
          },
          (err:any)=>console.log(err.message)
        );
  
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
