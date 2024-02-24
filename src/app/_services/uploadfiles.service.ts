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

  addFile(file:File): Observable<Uploadfiles>{
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<Uploadfiles>(this.url,formData).pipe(catchError(this.errorHandler));
  }

  updateFile(id:string,file:File): Observable<Uploadfiles>{
    return this.http.patch<Uploadfiles>(this.url+'/'+id,file).pipe(catchError(this.errorHandler));
  }

  
  getFilesByPatientId(patientId:string):Observable<Uploadfiles>{
    return this.http.get<Uploadfiles>(this.url+'/one/'+patientId).pipe(catchError(this.errorHandler));
  }

  deleteFileById(id:string):Observable<Uploadfiles>{
    return this.http.delete<Uploadfiles>(this.url+'/'+id).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }
 
}
