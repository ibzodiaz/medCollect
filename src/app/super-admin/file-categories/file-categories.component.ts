import { Component, EventEmitter, Output } from '@angular/core';
import { FileCategoriesService } from 'src/app/_services/file-categories.service';

@Component({
  selector: 'app-file-categories',
  templateUrl: './file-categories.component.html',
  styleUrls: ['./file-categories.component.css']
})
export class FileCategoriesComponent {

  fileCategoriesForm:any={
    categories: ''
  }

  add:boolean = true;
  update:boolean = false;
  id:string = '';

  fileCategoriesList:any;
  
  @Output() emittedEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  fileCategoriesChanged:boolean = false;

  constructor(
    private FilecategoriesService:FileCategoriesService
  ){}

  ngOnInit():void{
    this.fileCategoriesTable();
  }

  fileCategoriesTable(){
    this.FilecategoriesService.getAllfileCategories().subscribe(
      (fileCategoriess:any)=>{
        this.fileCategoriesList=fileCategoriess;
        this.fileCategoriesChanged = true;
        this.emittedEvent.emit(this.fileCategoriesChanged);
      },
      (err:any)=>console.log(err.message)
    );
  }

  updateEvent(id:string,fileCategories:string){
    this.fileCategoriesForm.categories = fileCategories;
    this.update = true;
    this.add = false;
    this.id = id;
  }

  onUpdate(){
    this.FilecategoriesService.updatefileCategories(this.id,this.fileCategoriesForm).subscribe(
      (success:any)=>{
        //alert('Modifié');
        this.update = false;
        this.add = true;
        this.fileCategoriesTable();
        this.fileCategoriesForm.categories = '';
      }
    );
  }

  delete(id:string){
    this.FilecategoriesService.deletefileCategoriesById(id).subscribe(
      (success:any)=>{
        //alert("supprimé!");
        this.fileCategoriesTable();
      }
    );
  }

  onSubmit(){
    this.FilecategoriesService.addfileCategories(this.fileCategoriesForm).subscribe(
      (success:any)=>{
        this.fileCategoriesTable();
        this.fileCategoriesForm.categories = '';
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