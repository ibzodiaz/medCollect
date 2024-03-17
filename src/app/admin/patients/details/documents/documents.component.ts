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


  progression: { [key: string]: number } = {};


  downloadFile(id:string,fileName: string): void {
    const url = `${environment.apiURLDownload}/data/${fileName}`;
    this.progression[id] = 0;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('La réponse du serveur n\'est pas valide');
        }
  
        const contentLength = response.headers.get('Content-Length');
        const total = parseInt(contentLength || '0', 10);
        let loaded = 0;
  
        const reader = response.body!.getReader();
        const chunks: Uint8Array[] = [];
  
        const processResult = (result: any): any => {
          if (result.done) {
            //alert('Téléchargement terminé');
            this.progression[id] = 0;
  
            // Concaténer tous les morceaux de données en un seul Uint8Array
            const blob = new Blob(chunks, { type: 'application/octet-stream' });
  
            // Créer l'URL de l'objet Blob
            const url = window.URL.createObjectURL(blob);
  
            // Créer un élément <a> pour télécharger le fichier
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
  
            // Révoquer l'URL de l'objet Blob après le téléchargement
            window.URL.revokeObjectURL(url);
  
            return;
          }
  
          loaded += result.value.length;
  
          // Calculez la progression en pourcentage
          this.progression[id] = Math.round((loaded / total) * 100);
          //console.log(`${id} Progression du téléchargement : ${this.progression[id]}%`);
  
          // Stocker chaque morceau de données dans le tableau chunks
          chunks.push(result.value);
  
          // Continuez à lire le contenu
          return reader.read().then(processResult);
        };
  
        // Commencez à lire le contenu
        return reader.read().then(processResult);
      })
      .catch(error => console.error('Erreur lors du téléchargement du fichier :', error));
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