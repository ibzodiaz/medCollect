import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Uploadfiles } from 'src/app/_interfaces/uploadfiles';
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

  @Output() emittedEvent =  new EventEmitter<boolean>();
  inserted:boolean = false;

  constructor(
    private uploadfilesService:UploadfilesService,
    private route:ActivatedRoute,
    private tokenService:TokenService
  ){}

  ngOnInit():void{
    this.fileForm;
  }

  closeModal(modalId: string,e:Event): void {
    e.preventDefault();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
    }
  }

  onFileSelected(modalId: string,event: any) {

    const file: File = event.target.files[0];

    this.uploadfilesService.addFile(file,this.fileForm).subscribe(
      response => {
        //console.log('File uploaded successfully:', response);
        //alert('File uploaded successfully:');
        this.inserted = true;
        this.emittedEvent.emit(this.inserted);
        
        this.closeModal(modalId,event);
      },
      error => {
        console.error('Error uploading file:', error);
        //alert('Error uploading file:')
      }
    );
    
  }

}
