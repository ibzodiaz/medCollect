import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paracliniques } from '../_interfaces/paracliniques';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParacliniquesService {

  private url = 'http://localhost:3000/api/patients/signesparacliniques';

  constructor(private http: HttpClient) { }

  addParaClinicSigns(ParaclinicSigns:Paracliniques): Observable<Paracliniques>{
    return this.http.post<Paracliniques>(this.url,ParaclinicSigns).pipe(catchError(this.errorHandler));
  }

  updateParaClinicSigns(patientId:string,ParaclinicSigns:Paracliniques): Observable<Paracliniques>{
    return this.http.patch<Paracliniques>(this.url+'/'+patientId,ParaclinicSigns).pipe(catchError(this.errorHandler));
  }

  
  getParaClinicSignsByPatientId(patientId:string):Observable<Paracliniques>{
    return this.http.get<Paracliniques>(this.url+'/one/'+patientId).pipe(catchError(this.errorHandler));
  }


  private errorHandler(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }
}
