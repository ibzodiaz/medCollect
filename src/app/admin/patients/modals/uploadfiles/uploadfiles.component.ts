import { Component } from '@angular/core';
import { UploadfilesService } from 'src/app/_services/uploadfiles.service';

@Component({
  selector: 'app-uploadfiles',
  templateUrl: './uploadfiles.component.html',
  styleUrls: ['./uploadfiles.component.css']
})
export class UploadfilesComponent {

  constructor(
    private uploadfilesService:UploadfilesService
  ){}

  files:any;
  fileName:any = [];

  closeModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
    }
  }

  onFileSelected(event: any) {
    // const files: FileList = event.target.files;
    // this.files = {...files};
    // for(let i = 0 ; i < files.length; i++){
    //   console.log(this.files[i].name);
    //   this.fileName = [...this.fileName, this.files[i].name];
    // }

    const file: File = event.target.files[0];

    this.uploadfilesService.addFile(file).subscribe(
      response => {
        console.log('File uploaded successfully:', response);
        alert('File uploaded successfully:')
      },
      error => {
        console.error('Error uploading file:', error);
        alert('Error uploading file:')
      }
    );
    
  }

}
