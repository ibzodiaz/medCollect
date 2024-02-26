import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Consultation } from '../_interfaces/consultation';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  private url = 'http://localhost:3000/api/patients/consultation'

  constructor(private http: HttpClient) { }

  addConsultation(consultation:Consultation): Observable<Consultation>{
    return this.http.post<Consultation>(this.url,consultation).pipe(catchError(this.errorHandler));
  }

  updateConsultation(id:string,consultation:Consultation): Observable<Consultation>{
    return this.http.patch<Consultation>(this.url+'/'+id,consultation).pipe(catchError(this.errorHandler));
  }

  
  getConsultationByPatientId(id:string):Observable<Consultation>{
    return this.http.get<Consultation>(this.url+'/one/'+id).pipe(catchError(this.errorHandler));
  }

  deleteConsultationById(id:string):Observable<Consultation>{
    return this.http.delete<Consultation>(this.url+'/'+id).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }

}
