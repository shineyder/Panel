import { Injectable, OnDestroy } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  constructor()
  {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var tokenValid = JSON.parse(window.localStorage.getItem('auth_app_token'))

    if (tokenValid == null) {
      return next.handle(req);
    }

    const req1 = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${tokenValid.value}`),
    });

    return next.handle(req1);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
