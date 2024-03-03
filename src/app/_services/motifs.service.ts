import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Motif } from '../_interfaces/motif';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MotifsService {
  private url = 'http://localhost:3000/api/motifs'

  constructor(private http: HttpClient) { }

  addMotif(motif:Motif): Observable<Motif>{
    return this.http.post<Motif>(this.url,motif).pipe(catchError(this.errorHandler));
  }

  getMotif(): Observable<Motif>{
    return this.http.get<Motif>(this.url).pipe(catchError(this.errorHandler));
  }

  updateMotif(id:string,motif:Motif): Observable<Motif>{
    return this.http.patch<Motif>(this.url+'/'+id,motif).pipe(catchError(this.errorHandler));
  }

  deleteMotifById(id:string):Observable<Motif>{
    return this.http.delete<Motif>(this.url+'/'+id).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }
}
