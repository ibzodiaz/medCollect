import { Component } from '@angular/core';
import { HopitalService } from 'src/app/_services/hopital.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {

  url:string = `${environment.apiURLDownload}`;
  
  isLoading:boolean = false;
  hospitals:any;

  constructor(
    private hopitalService:HopitalService
  ){}

  ngOnInit():void{
    this.isLoading = true;
    this.getHospital();
  }

  getHospital(){
    this.hopitalService.getHopital().subscribe(
      (hospital:any)=>{
        if(hospital){
          this.hospitals = hospital;
          this.isLoading = false;
        }
      },
      (err:any)=>console.log(err.message)
    );
  }

  hospitalChanged:boolean = false;
  
  hospitalsUpdated(eventValue:boolean){
    
    this.hospitalChanged = eventValue;

    if(this.hospitalChanged){
      this.getHospital();
    }
  }


  openModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
    }
  }
}
