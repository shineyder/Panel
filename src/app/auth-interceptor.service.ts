import {
  Injectable,
  OnDestroy
} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode
} from '@angular/common/http';
import { Observable,
  Subject,
  throwError
} from 'rxjs';
import {
  catchError,
  map
} from 'rxjs/operators';
import { AuthService } from './auth/auth.service'
import { NbToastrService } from '@nebular/theme';

@Injectable()
export class AuthInterceptor implements HttpInterceptor, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private toastrService: NbToastrService,
    private authService: AuthService
  )
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

    return next.handle(req1).pipe(
      map((event: HttpEvent<any>) => {return event}),
      catchError(
        (
          httpErrorResponse: HttpErrorResponse,
          _: Observable<HttpEvent<any>>
        ) => {
          if (httpErrorResponse.status === HttpStatusCode.Unauthorized) {
            this.toastrService.show('Sessão expirou!', 'Erro', { status: 'warning' })
            this.authService.doLogout();
          }
          return throwError(httpErrorResponse);
        }
      )
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
