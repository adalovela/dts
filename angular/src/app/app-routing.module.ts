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
  }
}
