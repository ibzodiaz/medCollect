import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Motif } from '../_interfaces/motif';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MotifsService {
  private url = `${environment.apiURL}/motifs`

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
