import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Uploadfiles } from 'src/app/_interfaces/uploadfiles';
import { FileCategoriesService } from 'src/app/_services/file-categories.service';
import { TokenService } from 'src/app/_services/token.service';
import { UploadfilesService } from 'src/app/_services/uploadfiles.service';

@Component({
  selector: 'app-uploadfiles',
  templateUrl: './uploadfiles.component.html',
  styleUrls: ['./uploadfiles.component.css']
})
export class UploadfilesComponent {

  fileForm:Uploadfiles = {
    userId: this.tokenService.getUserIdFromToken(),
    patientId: this.route.snapshot.paramMap.get('patientId'),
    fileName: '',
    fileSize: '',
    filePath: '',
    fileType: '',
    fileCategory:''
  }

  categories:any= [];

  @Output() emittedEvent =  new EventEmitter<boolean>();
  inserted:boolean = false;

  constructor(
    private uploadfilesService:UploadfilesService,
    private route:ActivatedRoute,
    private tokenService:TokenService,
    private FilecategoriesService:FileCategoriesService
  ){}

  ngOnInit():void{
    this.fileForm;
    this.getCategoriesFile();
  }

  
  getCategoriesFile(){
    this.FilecategoriesService.getAllfileCategories().subscribe(
      (categories:any)=>{
        this.categories = categories;
      },
      (err:any)=> console.log(err.message)
    );
  }

  closeModal(modalId: string,e:Event): void {
    e.preventDefault();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
    }
  }

  progress:number = 0;
  message:string = '';
  uploaded:boolean = false;

  onFileSelected(modalId: string,e: any) {

    const file: File = e.target.files[0];
    this.progress = 0;
    this.message = '';
    this.uploaded = true;

    this.uploadfilesService.addFile(file,this.fileForm).subscribe(
      (event:any) => {

        if(event){
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event.type === HttpEventType.Response) {
            // Le fichier a été téléchargé avec succès
      
            this.inserted = true;
            this.emittedEvent.emit(this.inserted);
            this.uploaded = false;
            this.closeModal(modalId,e);
         
          }
        }
 
      },
      (error:any) => {
        console.error('Error uploading file:', error);
        //alert('Error uploading file:')
      }
    );
    
  }

}
