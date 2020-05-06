import { NgModule, Inject } from '@angular/core';
import { Routes, Router, RouterModule } from '@angular/router';
import { ApmService } from '@elastic/apm-rum-angular';

const appName = require('../../package.json').name;
const appVersion = require('../../package.json').version;

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
      serviceName: appName,
      serverUrl: 'http://localhost:8200/',
      serviceVersion: appVersion,
    });

    apm.setUserContext({
      username: 'Zeus',
      id: '001',
    });
  }
}
