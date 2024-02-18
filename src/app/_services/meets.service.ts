import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meets } from '../_interfaces/meets';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetsService {
  private url = "http://localhost:3000/api/meetings";

  constructor(private http: HttpClient) { }


  addMeet(patient:Meets): Observable<Meets>{
      return this.http.post<Meets>(this.url,patient).pipe(catchError(this.errorHandler));
  }

  getMeets():Observable<Meets>{
    return this.http.get<Meets>(this.url).pipe(catchError(this.errorHandler));;
  }

  getMeetsByDoctorId(id:any):Observable<Meets>{
    return this.http.get<Meets>(this.url+'/'+id).pipe(catchError(this.errorHandler));
  }

  getMeetsByHospitalId(hostipalId:any):Observable<Meets>{
    return this.http.get<Meets>(this.url+'/meetingbyhospital/'+hostipalId).pipe(catchError(this.errorHandler));
  }

  deleteMeetById(id:string):Observable<Meets>{
    return this.http.delete<Meets>(this.url+'/'+id).pipe(catchError(this.errorHandler));
  }

  updateMeetById(id: string, patient: Meets): Observable<Meets> {
    return this.http.patch<Meets>(this.url+'/'+id, patient).pipe(catchError(this.errorHandler));
  }
  

  private errorHandler(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }
}
