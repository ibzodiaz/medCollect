import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paracliniques } from '../_interfaces/paracliniques';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParacliniquesService {

  private url = `${environment.apiURL}/patients/signesparacliniques`;

  constructor(private http: HttpClient) { }

  addParaClinicSigns(ParaclinicSigns:Paracliniques): Observable<Paracliniques>{
    return this.http.post<Paracliniques>(this.url,ParaclinicSigns).pipe(catchError(this.errorHandler));
  }

  updateParaClinicSigns(patientId:string,consultationId:string,ParaclinicSigns:Paracliniques): Observable<Paracliniques>{
    return this.http.patch<Paracliniques>(this.url+'/'+patientId+'/'+consultationId,ParaclinicSigns).pipe(catchError(this.errorHandler));
  }

  
  getParaClinicSignsByPatientId(patientId:string,consultationId:string):Observable<Paracliniques>{
    return this.http.get<Paracliniques>(this.url+'/'+patientId+'/'+consultationId).pipe(catchError(this.errorHandler));
  }


  private errorHandler(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }
}
