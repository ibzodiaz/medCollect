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
        this.assistantForm = user.data;
      },
      (err: any) => console.log(err.message)
    );

  }
  
  ngOnInit(): void {

    this.route.queryParamMap.subscribe((queryParams:any) => {
 
      if (queryParams.has('assistantId')) {
        const assistantId = queryParams.get('assistantId');
        if(assistantId){
          this.getAssistant(assistantId);
        }
      }
    });

    
    //console.log(JSON.stringify(this.assistantForm))

  }
  
  initializeAssistantForm(): void {
    this.assistantForm = {
      hopitalId: this.tokenService.getHospitalIdFromToken(),
      prenom: '',
      nom: '',
      email: '',
      pseudo: '',
      service: '',
      speciality: '',
      status: ''
    };
  }
  
  onSubmit(e:Event){
    
    //alert(this.sharedService.getterAssistantId())
    //alert(JSON.stringify(this.assistantForm))
    
    this.route.queryParamMap.subscribe((queryParams:any) => {
      if (queryParams.has('assistantId')) {
        const assistantId = queryParams.get('assistantId');
        if(assistantId){
          //alert(assistantId+'*****'+JSON.stringify(this.assistantForm))
          this.userService.updateUser(assistantId,this.assistantForm).subscribe(
            (response:any)=>{
              alert(response.message);
              this.closeModal('modal33',e);
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
