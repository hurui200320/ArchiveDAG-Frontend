import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Observable} from 'rxjs';
import {NbAuthService} from "@nebular/auth";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: NbAuthService
  ) {
  }

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated();
  }

}
