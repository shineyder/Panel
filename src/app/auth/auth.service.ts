import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { getDeepFromObject, NbAuthService, NB_AUTH_OPTIONS } from "@nebular/auth";
import { Router } from "@angular/router";
import { User } from "../pages/home-adm/models/user.model";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  constructor(
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    private http: HttpClient,
    private nbAuthService: NbAuthService,
    private router: Router) {
  }

  getUserAuthenticated(): Observable<User> {
    return this.http.get<User>(`${environment.baseURL}/auth/user`)
    .pipe(map((obj) => obj));
  }

  doLogout(): void {
    window.localStorage.removeItem('auth_user')
    this.logout()
    .subscribe((result) => {
      this.nbAuthService.logout('email').subscribe((result => {
        this.router.navigate(['auth/login']);
      }));
    });
  }

  logout(): Observable<any> {
    return this.http.post(`${environment.baseURL}/auth/logout`, {});
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
