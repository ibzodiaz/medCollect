import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Users } from '../_interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient){}

  url = "http://localhost:3000/api/users";

  getUsers():Observable<Users>{
    return this.http.get<Users>(this.url).pipe(catchError(this.errorHandler));;
  }

  getUserById(id:any):Observable<Users>{
    return this.http.get<Users>(this.url+'/'+id).pipe(catchError(this.errorHandler));
  }

  getUserByHospital(hospitalId:any):Observable<Users>{
    return this.http.get<Users>(this.url+'/usersbyhopital/'+hospitalId).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }
}
