import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRoleService } from '../user-role/user-role.service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuardGuard implements CanActivateChild {
  constructor(
    private userRoleServ: UserRoleService,
    private router: Router,
    ) { }
    
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userRoleServ.isLoggednInRoleAdmin()) {
      return true;
    }else {
      this.router.navigate(['pages/dashboard']);
      return false;
    }
  }

  
  
}
