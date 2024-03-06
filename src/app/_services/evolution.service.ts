import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Evolution } from '../_interfaces/evolution';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvolutionService {

 
  private url = `${environment.apiURL}/patients/evolution`;

  constructor(private http: HttpClient) { }

  addEvolution(evolution:Evolution): Observable<Evolution>{
    return this.http.post<Evolution>(this.url,evolution).pipe(catchError(this.errorHandler));
  }

  updateEvolution(patientId:string,consultationId:string,evolution:Evolution): Observable<Evolution>{
    return this.http.patch<Evolution>(this.url+'/'+patientId+'/'+consultationId,evolution).pipe(catchError(this.errorHandler));
  }

  
  getEvolutionByPatientId(patientId:string,consultationId:string):Observable<Evolution>{
    return this.http.get<Evolution>(this.url+'/'+patientId+'/'+consultationId).pipe(catchError(this.errorHandler));
  }


  private errorHandler(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }
}
