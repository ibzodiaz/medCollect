import { Component } from '@angular/core';

@Component({
  selector: 'app-uploadfiles',
  templateUrl: './uploadfiles.component.html',
  styleUrls: ['./uploadfiles.component.css']
})
export class UploadfilesComponent {

  files:any;
  fileName:any = [];

  closeModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "none";
    }
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    this.files = {...files};
    for(let i = 0 ; i < files.length; i++){
      console.log(this.files[i].name);
      this.fileName = [...this.fileName, this.files[i].name];
    }
  }
}
