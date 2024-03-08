import { HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShareFilesService } from 'src/app/_services/share-files.service';
import { UploadfilesService } from 'src/app/_services/uploadfiles.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-share-files',
  templateUrl: './share-files.component.html',
  styleUrls: ['./share-files.component.css']
})
export class ShareFilesComponent {

  fileForm:any = {
    fileName: '',
    fileSize: '',
    filePath: '',
    fileType: '',
    fileCategory:'',
    annotatedFile: ''
  }

  progress: number = 0;

  constructor(
    private route:ActivatedRoute,
    private shareFilesService:ShareFilesService
  ){}

  ngOnInit():void{
    this.getFiles();
  }

  uploaded:boolean = false;
  message:string = '';

  onFileSelected(modalId: string, event: any) {
    const file: File = event.target.files[0];
  
    this.progress = 0;
    this.message = '';
    this.uploaded = true;
    this.shareFilesService.addFile(file, this.fileForm).subscribe(
      (event: any) => {
        if(event){
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event.type === HttpEventType.Response) {
            // Le fichier a été téléchargé avec succès
            this.message = 'Le fichier est chargé avec succès.';
            this.getFiles();
          }
        }
      },
      (error: any) => {
        console.error('Error uploading file:', error);
        //alert('Error uploading file:')
      }
    );
  }
  

  filesList:any[] = [];
  fileSize:string='';

  isLoading:boolean = true;

  formatFileSize(fileSize: number): string {
    if (fileSize === 0) return '0 octets';

    const sizes = ['octets', 'Ko', 'Mo', 'Go', 'To'];
    const i = Math.floor(Math.log(fileSize) / Math.log(1024));

    return `${(fileSize / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
  }

  getFiles(){
    this.isLoading = true;
    this.shareFilesService.getAllFiles().subscribe(
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
    this.shareFilesService.updateFile(this.fileId,this.fileForm).subscribe(
      (response:any)=>{
        this.getFiles();
        this.isDialogOpen = false;
      }
    );
  }

  readFile(fileName:string){
    return `${environment.apiURLDownload}/data/${fileName}`;
  }
    
  searchTerm: string = '';

  get filteredfiles(): any[] {
    // Convertir le terme de recherche en minuscules pour effectuer une recherche insensible à la casse
    const searchTermLowerCase = this.searchTerm.toLowerCase();

    // Filtrer les fichiers par nom de fichier, catégorie de fichier ou fichier annoté
    return this.filesList.filter((file: any) => {
      return (
        file.fileName.toLowerCase().includes(searchTermLowerCase) ||
        file.fileCategory.toLowerCase().includes(searchTermLowerCase) ||
        file.annotatedFile.toLowerCase().includes(searchTermLowerCase)
      );
    });
  }

  
}