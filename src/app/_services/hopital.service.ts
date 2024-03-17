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

  addHopital(hospital:Hopital):Observable<Hopital>{
    
    const formData = new FormData();
    const fileName = Date.now() + "_" +hospital.Logo?.name;

    if(hospital.Logo){
      formData.append('Logo', hospital.Logo);
      formData.append('logoName', fileName);
      formData.append('logoPath', 'logos/'+fileName);
      formData.append('Nom', hospital.Nom);
      formData.append('Lieu', hospital.Lieu);
    }

    //alert(JSON.stringify(data))
    return this.http.post<Hopital>(this.url,formData, {
      reportProgress: true,
      observe: 'events',
    }).pipe(catchError(this.errorHandler));
  }

  updateHopital(id:any,hospital:any):Observable<Hopital>{
    const formData = new FormData();

    if(hospital.Logo){
      const fileName = Date.now() + "_" +hospital.Logo?.name;
      formData.append('Logo', hospital.Logo);
      formData.append('logoName', fileName);
      formData.append('logoPath', 'logos/'+fileName);
    }
    else
    {    
      formData.append('logoName', hospital.logoName);
      formData.append('logoPath', hospital.logoPath);  
    }

    formData.append('Nom', hospital.Nom);
    formData.append('Lieu', hospital.Lieu);
  
    return this.http.patch<Hopital>(this.url+'/'+id,formData, {
      reportProgress: true,
      observe: 'events',
    }).pipe(catchError(this.errorHandler));
  }

  deleteHopital(id:any):Observable<Hopital>{
    return this.http.delete<Hopital>(this.url+'/'+id).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }
}
