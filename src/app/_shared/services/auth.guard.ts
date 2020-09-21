import { UtilsService } from './utils.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(
    private router: Router,
    private authService : AuthService
    ) { }




  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    if (this.authService.isUserLoggedIn()) {
      return true;
    }
    localStorage.setItem('resetUrl',state.url);
    this.router.navigate(['auth/login']);
    return false;
  }
}
