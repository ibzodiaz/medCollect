import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Cliniques } from '../_interfaces/cliniques';

@Injectable({
  providedIn: 'root'
})
export class CliniquesService {

  private url = 'http://localhost:3000/api/patients/signescliniques';

  constructor(private http: HttpClient) { }

  addClinicSigns(clinicSigns:Cliniques): Observable<Cliniques>{
    return this.http.post<Cliniques>(this.url,clinicSigns).pipe(catchError(this.errorHandler));
  }

  updateClinicSigns(patientId:string,clinicSigns:Cliniques): Observable<Cliniques>{
    return this.http.patch<Cliniques>(this.url+'/'+patientId,clinicSigns).pipe(catchError(this.errorHandler));
  }

  
  getClinicSignsByPatientId(patientId:string):Observable<Cliniques>{
    return this.http.get<Cliniques>(this.url+'/one/'+patientId).pipe(catchError(this.errorHandler));
  }


  private errorHandler(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }
}
