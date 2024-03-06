import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Users } from '../_interfaces/users';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient){}

  url = `${environment.apiURL}/users`;

  
  createNewUser(user:Users):Observable<Users>{
    return this.http.put<Users>(this.url,user).pipe(catchError(this.errorHandler));
  }

  updateUser(userId:string | null,user:any):Observable<Users>{
    return this.http.patch<Users>(this.url+'/'+userId,user).pipe(catchError(this.errorHandler));
  }

  updatePassword(userId:string | null,user:any):Observable<Users>{
    return this.http.patch<Users>(this.url+'/changePassword/'+userId,user).pipe(catchError(this.errorHandler));
  }

  deleteUser(userId:string):Observable<Users>{
    return this.http.delete<Users>(this.url+'/'+userId).pipe(catchError(this.errorHandler));
  }

  getUsers():Observable<Users>{
    return this.http.get<Users>(this.url).pipe(catchError(this.errorHandler));
  }

  getUserById(id:any):Observable<Users>{
    return this.http.get<Users>(this.url+'/'+id).pipe(catchError(this.errorHandler));
  }

  getUserByHospital(hospitalId:any):Observable<Users>{
    return this.http.get<Users>(this.url+'/usersbyhopital/'+hospitalId).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }
}
