import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { TokenService } from '../_services/token.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {

  constructor(private router: Router, private tokenService: TokenService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.tokenService.isLogged()){
      return true;
    }
    return this.router.navigate(['auth']);
  }
}
