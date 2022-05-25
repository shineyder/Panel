import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { getDeepFromObject, NbAuthService, NbTokenService, NB_AUTH_OPTIONS } from "@nebular/auth";
import { Router } from "@angular/router";
import { User } from "../pages/home-adm/models/user.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  constructor(
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    private http: HttpClient,
    private nbAuthService: NbAuthService,
    private router: Router,) {
  }

  baseUrl = "http://localhost:8000/api/auth/";

  getUserAuthenticated(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}user`).pipe(
      map((obj) => obj),
      );
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
    return this.http.post(`${this.baseUrl}logout`, {});
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
