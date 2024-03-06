import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meets } from '../_interfaces/meets';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeetsService {
  private url = `${environment.apiURL}/meetings`;

  constructor(private http: HttpClient) { }


  addMeet(patient:Meets): Observable<Meets>{
      return this.http.post<Meets>(this.url,patient).pipe(catchError(this.errorHandler));
  }

  getMeets():Observable<Meets>{
    return this.http.get<Meets>(this.url).pipe(catchError(this.errorHandler));;
  }

  getMeetsByDoctorId(doctorId:any):Observable<Meets>{
    return this.http.get<Meets>(this.url+'/'+doctorId).pipe(catchError(this.errorHandler));
  }

  getMeetsByPatientId(patientId:any,hostipalId:string):Observable<Meets>{
    return this.http.get<Meets>(this.url+'/meetingsbypatient/'+patientId+'/'+hostipalId).pipe(catchError(this.errorHandler));
  }

  getMeetsByPatientIdAndDoctorId(patientId:any,doctorId:string):Observable<Meets>{
    return this.http.get<Meets>(this.url+'/meetingsbydoctorandpatient/'+patientId+'/'+doctorId).pipe(catchError(this.errorHandler));
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
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }
}
