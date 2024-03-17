import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HopitalService } from 'src/app/_services/hopital.service';
import { SharedService } from 'src/app/_services/shared.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  constructor(
    private userService:UserService,
    private route:ActivatedRoute,
    private router: Router,
    private hospitalService:HopitalService,
    private sharedService:SharedService
  ){}

  usersList:any = [];
  hospital:any;
  isLoading:boolean = false;

  nombreDocteurs:number = 0;
  nombreAssistants:number = 0;

  inserted:boolean = false;
  updated:boolean = false;
  updatedPassword:boolean = false;

  ngOnInit():void{
    this.getUsersByHospital();
    this.getHospitalInformations();
  }

  checkInsertionState($event:boolean){
    this.inserted = $event;
    
    if(this.inserted){
      this.getUsersByHospital();
      this.getHospitalInformations();
    }
  }

  checkUpdateState($event:boolean){
    this.updated = $event;
    
    if(this.updated){
      this.getUsersByHospital();
      this.getHospitalInformations();
    }
  }

  checkUpdatePasswordState($event:boolean){
    this.updatedPassword = $event;
    
    if(this.updatedPassword){
      this.getUsersByHospital();
      this.getHospitalInformations();
    }
  }

  getHospitalInformations(){
    let hospitalId = this.route.snapshot.paramMap.get('hospitalId');
    this.hospitalService.getHopitalById(hospitalId).subscribe(
      (hospital:any)=>{
        this.hospital = hospital;
      },
      (err:any)=>console.log(err.message)
    );
  }
  
  getOnlyAssitant(){
    let hospitalId = this.route.snapshot.paramMap.get('hospitalId');
    this.isLoading = true;
    this.userService.getUserByHospital(hospitalId).subscribe(
      (users:any)=>{
        if(users){
          this.usersList = users.data.filter((user:any)=>user.status == 'A');
          this.isLoading = false;
        }
      },
      (err:any)=>{
        if(err){
          this.isLoading = false;
        }
        console.log(err)
      }
    );
  }

  getOnlyDoctor(){
    let hospitalId = this.route.snapshot.paramMap.get('hospitalId');
    this.isLoading = true;
    this.userService.getUserByHospital(hospitalId).subscribe(
      (users:any)=>{
        if(users){
          this.usersList = users.data.filter((user:any)=>user.status != 'A');
          this.isLoading = false;
        }
      },
      (err:any)=>{
        if(err){
          this.isLoading = false;
        }
        console.log(err)
      }
    );
  }

  openModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
    }
  }

  openModalAndUpdate(modalId: string,userId:any): void {
    let hospitalId = this.route.snapshot.paramMap.get("hospitalId");
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
        this.router.navigateByUrl(`/superadmin/users/${hospitalId}?userId=${userId}`);
    }
  }

  getUsersByHospital(){
    let hospitalId = this.route.snapshot.paramMap.get('hospitalId');
    this.isLoading = true;
    this.userService.getUserByHospital(hospitalId).subscribe(
      (users:any)=>{
        if(users){
          this.usersList = users.data;
          this.nombreDocteurs = users.data.filter((user:any)=>user.status != 'A').length;
          this.nombreAssistants = users.data.filter((user:any)=>user.status == 'A').length;
          this.isLoading = false;
        }
      },
      (err:any)=>{
        if(err){
          this.isLoading = false;
        }
        console.log(err)
      }
    );
  }

  searchTerm: string = '';

  // Obtenir les Users filtrés en fonction du terme de recherche
  get filteredUsers(): any[] {
    // Sinon, filtrez les Users par nom ou prénom
    return this.usersList.filter((user:any) =>
      user.prenom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

}
