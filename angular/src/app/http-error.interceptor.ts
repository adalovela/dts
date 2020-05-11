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

        this.apmService.addLabels({
          name: error.name,
          message: error.message,
          ok: error.ok,
          status: error.status,
          status_text: error.statusText,
          url: error.url,
        });

        this.apmService.addFilter((payload: any) => {
          if (payload.errors) {
            payload.errors.forEach((err: any) => {
              err.exception.type = 'HTTP Error';
              err.exception.code = error.status;
            });
          }
          if (payload.transactions) {
            payload.transactions.forEach((tr: any) => {
              tr.spans.forEach((span: any) => {
                if (span.context && span.context.http.status_code) {
                  span.context.http.status_code = error.status;
                }
              });
            });
          }
          console.debug(payload);
          return payload;
        });

        this.apmService.captureError(new Error(errorMessage));
        return throwError(errorMessage);
      })
    );
  }
}
