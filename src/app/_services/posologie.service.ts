import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Posologie } from '../_interfaces/posologie';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PosologieService {
  private url = `${environment.apiURL}/posologie`

  constructor(private http: HttpClient) { }

  addPosologie(posologie:Posologie): Observable<Posologie>{
    return this.http.post<Posologie>(this.url,posologie).pipe(catchError(this.errorHandler));
  }

  updatePosologie(id:string,posologie:Posologie): Observable<Posologie>{
    return this.http.patch<Posologie>(this.url+'/'+id,posologie).pipe(catchError(this.errorHandler));
  }

  
  getAllPosologie():Observable<Posologie>{
    return this.http.get<Posologie>(this.url).pipe(catchError(this.errorHandler));
  }

  getPosologieById(id:string):Observable<Posologie>{
    return this.http.get<Posologie>(this.url+'/'+id).pipe(catchError(this.errorHandler));
  }

  deletePosologieById(id:string):Observable<Posologie>{
    return this.http.delete<Posologie>(this.url+'/'+id).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }
}
