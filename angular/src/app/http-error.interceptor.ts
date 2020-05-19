import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApmService } from '@elastic/apm-rum-angular';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private apmService: any;

  constructor(@Inject(ApmService) service: ApmService) {
    this.apmService = service.init();
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error: ${error.status} - ${error.message}`;
        }
        this.apmService.captureError(error);
        return throwError(errorMessage);
      })
    );
  }
}
