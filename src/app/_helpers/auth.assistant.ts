import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { TokenService } from '../_services/token.service';
import { Observable } from 'rxjs';
import { UserService } from '../_services/user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class authAssistant implements CanActivate {

  constructor(
    private router: Router, 
    private tokenService: TokenService,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const userId = this.tokenService.getUserIdFromToken();

    return this.userService.getUserById(userId).pipe(
      map((user: any) => {
        if (user.data.status === 'A') {
          return this.router.parseUrl('auth'); // Rediriger vers la page d'authentification si le statut est 'A'
        } else {
          return true; // Autoriser l'accès à la route si le statut n'est pas 'A'
        }
      })
    );
  }
}
