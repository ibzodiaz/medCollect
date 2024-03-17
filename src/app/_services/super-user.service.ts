import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SuperUser } from '../_interfaces/super-user';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperUserService {

  constructor(private http: HttpClient){}

  url = `${environment.apiURL}/super-users`;

  
  createNewSuperUser(user:SuperUser):Observable<SuperUser>{
    return this.http.put<SuperUser>(this.url,user).pipe(catchError(this.errorHandler));
  }

  updateSuperUser(userId:string | null,user:any):Observable<SuperUser>{
    return this.http.patch<SuperUser>(this.url+'/'+userId,user).pipe(catchError(this.errorHandler));
  }

  updatePassword(userId:string | null,user:any):Observable<SuperUser>{
    return this.http.patch<SuperUser>(this.url+'/changePassword/'+userId,user).pipe(catchError(this.errorHandler));
  }

  deleteSuperUser(userId:string):Observable<SuperUser>{
    return this.http.delete<SuperUser>(this.url+'/'+userId).pipe(catchError(this.errorHandler));
  }

  getSuperUser():Observable<SuperUser>{
    return this.http.get<SuperUser>(this.url).pipe(catchError(this.errorHandler));
  }

  getSuperUserById(id:any):Observable<SuperUser>{
    return this.http.get<SuperUser>(this.url+'/'+id).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }
}
