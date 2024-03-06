import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Cliniques } from '../_interfaces/cliniques';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CliniquesService {

  private url = `${environment.apiURL}/patients/signescliniques`;

  constructor(private http: HttpClient) { }

  addClinicSigns(clinicSigns:Cliniques): Observable<Cliniques>{
    return this.http.post<Cliniques>(this.url,clinicSigns).pipe(catchError(this.errorHandler));
  }

  updateClinicSigns(patientId:string,consultationId:string,clinicSigns:Cliniques): Observable<Cliniques>{
    return this.http.patch<Cliniques>(this.url+'/'+patientId+'/'+consultationId,clinicSigns).pipe(catchError(this.errorHandler));
  }

  
  getClinicSignsByPatientId(patientId:string,consultationId:string):Observable<Cliniques>{
    return this.http.get<Cliniques>(this.url+'/'+patientId+'/'+consultationId).pipe(catchError(this.errorHandler));
  }


  private errorHandler(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }
}
