import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/_services/token.service';
import { UploadfilesService } from 'src/app/_services/uploadfiles.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent {

  fileForm:any = {
    fileCategory:''
  }

  urlDownload:string = '';

  constructor(
    private uploadfilesService:UploadfilesService,
    private tokenService:TokenService,
    private route:ActivatedRoute
  ){}

  filesList:any[] = [];
  fileSize:string='';

  isLoading:boolean = true;

  formatFileSize(fileSize: number): string {
    if (fileSize === 0) return '0 octets';

    const sizes = ['octets', 'Ko', 'Mo', 'Go', 'To'];
    const i = Math.floor(Math.log(fileSize) / Math.log(1024));

    return `${(fileSize / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  }


  ngOnInit():void{
    this.urlDownload = environment.apiURLDownload;
    const userId:any = this.tokenService.getUserIdFromToken();
    const patientId:any = this.route.snapshot.paramMap.get('patientId');
    this.getFiles(patientId,userId);
  }

  getFiles(patientId:string,userId:string){
    this.isLoading = true;
    this.uploadfilesService.getFilesByPatientId(patientId,userId).subscribe(
      (files:any)=>{
        this.filesList = files.map((file: any) => {
          return {
            ...file,
            fileSizeFormatted: this.formatFileSize(file.fileSize)
          };
        });
        setInterval(()=>{
          this.isLoading = false;
        },2000)
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
    const url = `${environment.apiURLDownload}/data/${fileName}`;
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
  
  readFile(fileName:string){
    return `${environment.apiURLDownload}/data/${fileName}`;
  }

  openModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "block";
      
    }
  }

  isDialogOpen: boolean = false;
  messageTitle: string = '';
  messageContent: string = '';


  closeMessageDialog(): void {
    this.isDialogOpen = false;
  }

  fileId:string = '';

  openDialog(id:string){
    this.fileId = id;
    this.isDialogOpen = true;
  }

  updateFileCategory(){
    this.uploadfilesService.updateFile(this.fileId,this.fileForm).subscribe(
      (response:any)=>{
        const userId:any = this.tokenService.getUserIdFromToken();
        const patientId:any = this.route.snapshot.paramMap.get('patientId');
        this.getFiles(patientId,userId);
        this.isDialogOpen = false;
      }
    );
  }

  searchTerm: string = '';

  get filteredfiles(): any[] {

    // Sinon, filtrez les files par motif ou date
    const searchTermLowerCase = this.searchTerm.toLowerCase();
    return this.filesList.filter((file: any) => {
      return file.fileName.toLowerCase().includes(searchTermLowerCase) ||
            file.fileCategory.toLowerCase().includes(searchTermLowerCase)
    });
  }
}