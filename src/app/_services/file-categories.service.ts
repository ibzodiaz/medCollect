import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileCategoriesService {

  private url = `${environment.apiURL}/categories`

  constructor(private http: HttpClient) { }

  addfileCategories(fileCategories:any): Observable<any>{
    return this.http.post<any>(this.url,fileCategories).pipe(catchError(this.errorHandler));
  }

  updatefileCategories(id:string,fileCategories:any): Observable<any>{
    return this.http.patch<any>(this.url+'/'+id,fileCategories).pipe(catchError(this.errorHandler));
  }

  getAllfileCategories():Observable<any>{
    return this.http.get<any>(this.url).pipe(catchError(this.errorHandler));
  }

  deletefileCategoriesById(id:string):Observable<any>{
    return this.http.delete<any>(this.url+'/'+id).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }
}
