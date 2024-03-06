import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { TokenService } from '../_services/token.service';
import { Observable } from 'rxjs';
import { UserService } from '../_services/user.service';

@Injectable({
  providedIn: 'root',
})
export class authAssistant implements CanActivate {

  constructor(
    private router: Router, 
    private tokenService: TokenService,
    private userService:UserService
    ) {}

    user:any;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const userId = this.tokenService.getUserIdFromToken();

    this.userService.getUserById(userId).subscribe(
        (user:any)=>{

            this.user = user.data;
        }
    );

    if(this.user.status !== 'A'){
        return true;
    }

    localStorage.removeItem('token');
    return this.router.navigate(['auth']);
  }
}
