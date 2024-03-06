import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Planning } from '../_interfaces/planning';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  private url = `${environment.apiURL}/planning`;

  constructor(private http: HttpClient) { }


  addPlanning(patient:Planning): Observable<Planning>{
      return this.http.post<Planning>(this.url,patient).pipe(catchError(this.errorHandler));
  }

  getPlanning():Observable<Planning>{
    return this.http.get<Planning>(this.url).pipe(catchError(this.errorHandler));;
  }

  getPlanningByDoctorId(userId:any):Observable<Planning>{
    return this.http.get<Planning>(this.url+'/'+userId).pipe(catchError(this.errorHandler));
  }

  deletePlanning(id:any):Observable<Planning>{
    return this.http.delete<Planning>(this.url+'/'+id).pipe(catchError(this.errorHandler));
  }

  updatePlanning(id: any, patient: Planning): Observable<Planning> {
    return this.http.patch<Planning>(this.url+'/'+id, patient).pipe(catchError(this.errorHandler));
  }
  

  private errorHandler(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }
}
