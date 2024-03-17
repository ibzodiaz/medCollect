import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShareFiles } from '../_interfaces/share-files';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShareFilesService {

  private url = `${environment.apiURL}/partage`

  constructor(private http: HttpClient) { }

  addFile(file:File,shareFiles:ShareFiles): Observable<ShareFiles>{
    const formData = new FormData();
    const fileName = Date.now() + "_" +file.name;
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('fileSize', file.size.toString());
    formData.append('fileType', file.type);
    formData.append('filePath', 'data/'+fileName);
    formData.append('fileCategory', shareFiles.fileCategory);
    formData.append('annotatedFile', shareFiles.annotatedFile);

    //alert(JSON.stringify(data))
    return this.http.post<ShareFiles>(this.url,formData, {
      reportProgress: true,
      observe: 'events',
    }).pipe(catchError(this.errorHandler));
  }

  updateFile(id:string,file:File): Observable<ShareFiles>{
    return this.http.patch<ShareFiles>(this.url+'/'+id,file).pipe(catchError(this.errorHandler));
  }

  
  getAllFiles():Observable<ShareFiles>{
    return this.http.get<ShareFiles>(this.url).pipe(catchError(this.errorHandler));
  }

  getFileById(id:string | null):Observable<ShareFiles>{
    return this.http.get<ShareFiles>(this.url+'/'+id).pipe(catchError(this.errorHandler));
  }

  deleteFileById(id:string):Observable<ShareFiles>{
    return this.http.delete<ShareFiles>(this.url+'/'+id).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }
 
}
