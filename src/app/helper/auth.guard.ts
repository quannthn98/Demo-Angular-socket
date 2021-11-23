import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserToken} from '../interface/user-token';
import {AuthService} from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  currentUser: UserToken;

  constructor(private authService: AuthService,
              private router: Router) {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.currentUser) {
      return true;
    } else {
      this.router.navigate(['/', 'login'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.currentUser) {
      return true;
    } else {
      this.router.navigate(['/', 'login'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }


}
