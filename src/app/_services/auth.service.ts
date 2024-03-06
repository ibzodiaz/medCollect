import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Credentials } from '../_interfaces/credentials';
import { Token } from '../_interfaces/token';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = `${environment.apiURL}/auth/login`;

  constructor(private http: HttpClient) { }

  login(credentials:Credentials): Observable<Token>{
      return this.http.post<Token>(this.url,credentials).pipe(catchError(this.errorHandler));;
  }

  private errorHandler(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }
}
