import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private router:Router) { }

  saveToken(token: string): void{
    localStorage.setItem('token', token);
    this.router.navigate(['admin']);
  }

  getUserIdFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const payloadBase64 = token.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));
      const userId = payload.id;
      return userId;
    }
    return null;
  }

  
  getHospitalIdFromToken(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const payloadBase64 = token.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));
      const hospitalId = payload.hospital;
      return hospitalId;
    }
    return null;
  }

  isLogged():boolean{
    const token = localStorage.getItem('token');
    return !! token;
  }

  clearToken():void{
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  saveTokenSuperUser(token: string): void{
    localStorage.setItem('superToken', token);
    this.router.navigate(['superadmin']);
  }

  isLoggedSuperUser():boolean{
    const token = localStorage.getItem('superToken');
    return !! token;
  }

  getSuperUserIdFromToken(): string | null {
    const token = localStorage.getItem('superToken');
    if (token) {
      const payloadBase64 = token.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));
      const superUserId = payload.id;
      return superUserId;
    }
    return null;
  }

  clearTokenSuperUser():void{
    localStorage.removeItem('superToken');
    this.router.navigate(['/']);
  }

}
