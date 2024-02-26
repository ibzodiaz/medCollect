import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Ordonnance} from '../_interfaces/ordonnance';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdonnanceService {
  private url = 'http://localhost:3000/api/ordonnances'

  constructor(private http: HttpClient) { }

  addOrdonnance(ordonnance:Ordonnance): Observable<Ordonnance>{
    return this.http.post<Ordonnance>(this.url,ordonnance).pipe(catchError(this.errorHandler));
  }

  updateOrdonnance(id:string,ordonnance:Ordonnance): Observable<Ordonnance>{
    return this.http.patch<Ordonnance>(this.url+'/'+id,ordonnance).pipe(catchError(this.errorHandler));
  }

  
  getAllOrdonnance():Observable<Ordonnance>{
    return this.http.get<Ordonnance>(this.url).pipe(catchError(this.errorHandler));
  }

  getOrdonnanceById(id:string):Observable<Ordonnance>{
    return this.http.get<Ordonnance>(this.url+'/'+id).pipe(catchError(this.errorHandler));
  }

  deleteOrdonnanceById(id:string):Observable<Ordonnance>{
    return this.http.delete<Ordonnance>(this.url+'/'+id).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }
}
