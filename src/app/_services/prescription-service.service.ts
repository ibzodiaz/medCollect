import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prescription } from '../_interfaces/prescription';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  private url = 'http://localhost:3000/api/patients/prescription'

  constructor(private http: HttpClient) { }

  addPrescription(prescription:Prescription): Observable<Prescription>{
    return this.http.post<Prescription>(this.url,prescription).pipe(catchError(this.errorHandler));
  }

  updatePrescription(id:string,prescription:Prescription): Observable<Prescription>{
    return this.http.patch<Prescription>(this.url+'/'+id,prescription).pipe(catchError(this.errorHandler));
  }

  getPrescriptionByPatient(patientId:string,consultationId:string):Observable<Prescription>{
    return this.http.get<Prescription>(this.url+'/'+patientId+'/'+consultationId).pipe(catchError(this.errorHandler));
  }

  deletePrescriptionById(id:string):Observable<Prescription>{
    return this.http.delete<Prescription>(this.url+'/'+id).pipe(catchError(this.errorHandler));
  }

  deletePrescriptionByConsultation(patientId:string,consultationId:string):Observable<Prescription>{
    return this.http.delete<Prescription>(this.url+'/'+patientId+'/'+consultationId).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }
}
