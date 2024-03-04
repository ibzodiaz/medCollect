import { Component, Output, EventEmitter } from '@angular/core';
import { Motif } from 'src/app/_interfaces/motif';
import { MotifsService } from 'src/app/_services/motifs.service';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-motifs',
  templateUrl: './motifs.component.html',
  styleUrls: ['./motifs.component.css']
})
export class MotifsComponent {

  motifForm:Motif={
    motif: ''
  }

  add:boolean = true;
  update:boolean = false;
  id:string = '';

  motifsList:any;
  
  @Output() emittedEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  motifChanged:boolean = false;

  constructor(
    private motifsService:MotifsService,
    private sharedService:SharedService
  ){}

  ngOnInit():void{
    this.motifTable();
  }

  motifTable(){
    this.motifsService.getMotif().subscribe(
      (motifs:any)=>{
        this.motifsList=motifs;
        this.motifChanged = true;
        this.emittedEvent.emit(this.motifChanged);
      },
      (err:any)=>console.log(err.message)
    );
  }

  updateEvent(id:string,motif:string){
    this.motifForm.motif = motif;
    this.update = true;
    this.add = false;
    this.id = id;
  }

  onUpdate(){
    this.motifsService.updateMotif(this.id,this.motifForm).subscribe(
      (success:any)=>{
        //alert('Modifié');
        this.update = false;
        this.add = true;
        this.motifTable();
        this.motifForm.motif = '';
      }
    );
  }

  delete(id:string){
    this.motifsService.deleteMotifById(id).subscribe(
      (success:any)=>{
        //alert("supprimé!");
        this.motifTable();
      }
    );
  }

  onSubmit(){
    this.motifsService.addMotif(this.motifForm).subscribe(
      (success:any)=>{
        this.motifTable();
        this.motifForm.motif = '';
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
