import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { getDeepFromObject, NbAuthService, NB_AUTH_OPTIONS } from "@nebular/auth";
import { Router } from "@angular/router";
import { User } from "../pages/home-adm/models/user.model";
import { map, takeUntil } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { StorageService } from "../storage.service";
import { NbToastrService } from "@nebular/theme";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  private ngUnsubscribe = new Subject<void>();

  constructor(
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    private http: HttpClient,
    private nbAuthService: NbAuthService,
    private router: Router,
    private localStorageService: StorageService,
    private toastrService: NbToastrService,
    ) {
  }

  getUserAuthenticated(): Observable<User> {
    return this.http.get<User>(`${environment.baseURL}/auth/user`)
    .pipe(map((obj) => obj));
  }

  doLogout(): void {
    this.logout()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((result) => {
      this.nbAuthService.logout('email')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((result => {
        this.localStorageService.remove('auth_user')
        this.router.navigate(['auth/login']);
      }));
    }, error => {
      this.toastrService.show('Falha ao deslogar!', 'Erro', { status: 'warning' })
    });
  }

  logout(): Observable<any> {
    return this.http.post(`${environment.baseURL}/auth/logout`, {});
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
