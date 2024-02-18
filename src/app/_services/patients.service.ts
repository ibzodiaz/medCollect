import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patients } from '../_interfaces/patients';
import { BehaviorSubject, Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  
  private url = "http://localhost:3000/api/patients";

  constructor(private http: HttpClient) { }
  
  private _patientsList: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  patientsList$ = this._patientsList.asObservable();

  get patientsList(): any[] {
    return this._patientsList.getValue();
  }

  setPatientsList(value: any[]): void {
    this._patientsList.next(value);
  }

  addPatient(patient:Patients): Observable<Patients>{
      return this.http.post<Patients>(this.url,patient).pipe(catchError(this.errorHandler));
  }

  getPatients():Observable<Patients>{
    return this.http.get<Patients>(this.url).pipe(catchError(this.errorHandler));;
  }

  getPatientById(id:string):Observable<Patients>{
    return this.http.get<Patients>(this.url+'/'+id).pipe(catchError(this.errorHandler));
  }

  deletePatients(id:string):Observable<Patients>{
    return this.http.delete<Patients>(this.url+'/'+id).pipe(catchError(this.errorHandler));
  }

  updatePatients(id: string, patient: Patients): Observable<Patients> {
    return this.http.patch<Patients>(this.url+'/'+id, patient).pipe(catchError(this.errorHandler));
  }
  

  private errorHandler(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }
}
