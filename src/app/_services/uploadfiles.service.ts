import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Uploadfiles } from '../_interfaces/uploadfiles';

@Injectable({
  providedIn: 'root'
})
export class UploadfilesService {


  private url = 'http://localhost:3000/api/patients/fichiers'

  constructor(private http: HttpClient) { }

  addFile(file:File,uploadfiles:Uploadfiles): Observable<Uploadfiles>{
    const formData = new FormData();
    const fileName = Date.now() + "_" +file.name;
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('fileSize', file.size.toString());
    formData.append('fileType', file.type);
    formData.append('filePath', 'data/'+fileName);
    formData.append('fileCategory', uploadfiles.fileCategory);
    formData.append('userId', uploadfiles.userId);
    formData.append('patientId', uploadfiles.patientId);


    //alert(JSON.stringify(data))
    return this.http.post<Uploadfiles>(this.url,formData).pipe(catchError(this.errorHandler));
  }

  updateFile(id:string,file:File): Observable<Uploadfiles>{
    return this.http.patch<Uploadfiles>(this.url+'/'+id,file).pipe(catchError(this.errorHandler));
  }

  
  getFilesByPatientId(patientId:string,userId:string):Observable<Uploadfiles>{
    return this.http.get<Uploadfiles>(this.url+'/'+patientId+'/'+userId).pipe(catchError(this.errorHandler));
  }

  deleteFileById(id:string):Observable<Uploadfiles>{
    return this.http.delete<Uploadfiles>(this.url+'/'+id).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }
 
}
