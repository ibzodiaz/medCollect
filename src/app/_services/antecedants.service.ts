import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Antecedents } from '../_interfaces/antecedants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AntecedantsService {

  private url = `${environment.apiURL}/patients/antecedents`;

  constructor(private http: HttpClient) { }

  addPatient(patient:Antecedents): Observable<Antecedents>{
    return this.http.post<Antecedents>(this.url,patient).pipe(catchError(this.errorHandler));
  }

  updatePatient(patientId:string,patient:Antecedents): Observable<Antecedents>{
    return this.http.patch<Antecedents>(this.url+'/'+patientId,patient).pipe(catchError(this.errorHandler));
  }

  
  getAntecedantByPatientId(patientId:string):Observable<Antecedents>{
    return this.http.get<Antecedents>(this.url+'/'+patientId).pipe(catchError(this.errorHandler));
  }


  private errorHandler(error: any): Promise<any> {
    console.log('An error occurred', error);
    return Promise.reject(error.message || error);
 }
}
