import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Medicaments } from '../_interfaces/medicaments';

@Injectable({
  providedIn: 'root'
})
export class MedicamentsService {
  private url = 'http://localhost:3000/api/medicaments'

  constructor(private http: HttpClient) { }

  addMedicaments(medicaments:Medicaments): Observable<Medicaments>{
    return this.http.post<Medicaments>(this.url,medicaments).pipe(catchError(this.errorHandler));
  }

  updateMedicaments(id:string,medicaments:Medicaments): Observable<Medicaments>{
    return this.http.patch<Medicaments>(this.url+'/'+id,medicaments).pipe(catchError(this.errorHandler));
  }

  
  getAllMedicaments():Observable<Medicaments>{
    return this.http.get<Medicaments>(this.url).pipe(catchError(this.errorHandler));
  }

  getMedicamentsById(id:string):Observable<Medicaments>{
    return this.http.get<Medicaments>(this.url+'/'+id).pipe(catchError(this.errorHandler));
  }

  deleteMedicamentsById(id:string):Observable<Medicaments>{
    return this.http.delete<Medicaments>(this.url+'/'+id).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }
}
