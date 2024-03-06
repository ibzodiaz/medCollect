import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Hopital } from '../_interfaces/hopital';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HopitalService {
  constructor(private http: HttpClient){}

  url = `${environment.apiURL}/hopital`;

  getHopital():Observable<Hopital>{
    return this.http.get<Hopital>(this.url).pipe(catchError(this.errorHandler));;
  }

  getHopitalById(id:any):Observable<Hopital>{
    return this.http.get<Hopital>(this.url+'/'+id).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }
}
