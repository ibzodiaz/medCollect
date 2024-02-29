import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/_services/token.service';
import { UploadfilesService } from 'src/app/_services/uploadfiles.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {

  constructor(
    private uploadfilesService:UploadfilesService,
    private tokenService:TokenService,
    private route:ActivatedRoute
  ){}

  filesList:any[] = [];
  fileSize:string='';

  formatFileSize(fileSize: number): string {
    if (fileSize === 0) return '0 octets';

    const sizes = ['octets', 'Ko', 'Mo', 'Go', 'To'];
    const i = Math.floor(Math.log(fileSize) / Math.log(1024));

    return `${(fileSize / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  }


  ngOnInit():void{
    const userId:any = this.tokenService.getUserIdFromToken();
    const patientId:any = this.route.snapshot.paramMap.get('patientId');
    this.getFiles(patientId,userId);
  }

  getFiles(patientId:string,userId:string){
    this.uploadfilesService.getFilesByPatientId(patientId,userId).subscribe(
      (files:any)=>{
        this.filesList = files.map((file: any) => {
          return {
            ...file,
            fileSizeFormatted: this.formatFileSize(file.fileSize)
          };
        });
      },
      (err:any)=>console.log(err.message)
    );
  }

  actualize() {
    const userId:any = this.tokenService.getUserIdFromToken();
    const patientId:any = this.route.snapshot.paramMap.get('patientId');
    this.getFiles(patientId,userId);
  }

  downloadFile(fileName: string): void {
    const url = `http://localhost:3000/data/${fileName}`;
    fetch(url)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(error => console.error('Error downloading file:', error));
  }
  

  openModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "block";
      
    }
  }
}