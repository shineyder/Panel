import {Injectable } from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest
} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, mergeMap, tap} from "rxjs/operators";
import { AuthInterceptor } from './auth-interceptor.service';
import { environment } from '../environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenInterceptorService implements HttpInterceptor {

  constructor(
    private http: HttpClient,
    private authInterceptor: AuthInterceptor,
    private localStorageService: StorageService,
    )
  {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
    .pipe(
      catchError(error => {
        const responseError = error as HttpErrorResponse;
        if (responseError.status === 401) {
          var tokenOld = this.localStorageService.get('auth_app_token')

          if (tokenOld == null) {
            return next.handle(req);
          }

          return this.http.post<any>(
            `${environment.baseURL}/auth/refresh`,
            {},
            {headers: new HttpHeaders().set('Authorization', `Bearer ${tokenOld.value}`)}
          )
          .pipe(
            tap(response => {
              tokenOld.value = response

              this.localStorageService.set('auth_app_token', tokenOld)
            }, error => {
              this.localStorageService.remove('auth_app_token')
            }),
            mergeMap(() => this.authInterceptor.intercept(req, next))
          );
        }
        return throwError(error);
      })
    );
  }
}
