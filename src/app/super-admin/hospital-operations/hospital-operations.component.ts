import { Component, EventEmitter, Output } from '@angular/core';
import { Hopital } from 'src/app/_interfaces/hopital';
import { HopitalService } from 'src/app/_services/hopital.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hospital-operations',
  templateUrl: './hospital-operations.component.html',
  styleUrls: ['./hospital-operations.component.css']
})
export class HospitalOperationsComponent {

  url:string = `${environment.apiURLDownload}`;

  hospitalsForm:Hopital={
    Nom: '',
    Lieu: '',
    Logo: null
  } 

  add:boolean = true;
  update:boolean = false;
  id:string = '';

  
  isDialogOpen: boolean = false;
  messageTitle: string = '';
  messageContent: string = '';

  hospitalsList:any;
  
  @Output() emittedEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  hospitalChanged:boolean = false;

  constructor(
    private hopitalService:HopitalService
  ){}

  ngOnInit():void{
    this.hospitalsTable();
  }

  hospitalsTable(){
    this.hopitalService.getHopital().subscribe(
      (hospital:any)=>{
        this.hospitalsList=hospital;
        this.hospitalChanged = true;
        this.emittedEvent.emit(this.hospitalChanged);
      },
      (err:any)=>console.log(err.message)
    );
  }


  updateEvent(id:string,hospitals:Hopital){
    this.hospitalsForm = hospitals;
    this.update = true;
    this.add = false;
    this.id = id;

  }

  onUpdate(){

    this.hopitalService.updateHopital(this.id,this.hospitalsForm).subscribe(
      (response:any)=>{
        //alert('Modifié');

        this.update = false;
        this.add = true;
        this.hospitalsTable();
        this.hospitalsForm.Nom = '';
        this.hospitalsForm.Lieu = '';
      }
    );
  }

  deleteConfirm(){
    this.isDialogOpen = true;
  }

  delete(id:string){
    this.hopitalService.deleteHopital(id).subscribe(
      (response:any)=>{
        //alert("supprimé!");
        this.hospitalsTable();
        this.isDialogOpen = false;
      }
    );
  }

  
  closeMessageDialog(): void {
    this.isDialogOpen = false;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.hospitalsForm.Logo = file;
  }

  onSubmit(){

    console.log(this.hospitalsForm)

    this.hopitalService.addHopital(this.hospitalsForm).subscribe(
      (response:any)=>{
        //alert(response);
  
        this.hospitalsTable();
        this.hospitalsForm.Nom = '';
        this.hospitalsForm.Lieu = '';
        this.hospitalsForm.Logo = null;
      },
      (err:any)=>console.log(err.message)
    );
    
  }

  closeModal(modalId: string): void {

    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
    }
  }
}