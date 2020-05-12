import { NgModule, Inject } from '@angular/core';
import { Routes, Router, RouterModule } from '@angular/router';
import { ApmService } from '@elastic/apm-rum-angular';

const routes: Routes = [
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: ApmService,
      useClass: ApmService,
      deps: [Router],
    },
  ],
})
export class AppRoutingModule {
  constructor(@Inject(ApmService) service: ApmService) {
    const apm = service.init({
      serviceName: 'si-frontend',
      serverUrl: 'http://localhost:8200/',
      serviceVersion: '1.0.0',
      logLevel: 'debug',
    });

    apm.setUserContext({
      username: 'Zeus',
      id: '123',
      email: 'zeuslabrador@protonmail.com',
    });

    apm.addFilter((payload: any) => {
      if (payload.errors) {
        payload.errors.forEach((err: any) => {
          if (err.context.custom.status) {
            apm.addLabels({
              name: err.context.custom.name,
              message: err.context.custom.message,
              ok: err.context.custom.ok,
              status: err.context.custom.status,
              status_text: err.context.custom.statusText,
              url: err.context.custom.url,
            });
          }
          if (!err.context.custom.status) {
            apm.addLabels({
              name: 'window error',
              message: err.exception.message,
              status: '200',
              status_text: err.exception.type,
              url: err.context.page.url,
            });
          }
        });
      }
      return payload;
    });
  }
}
