import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import {
  Endpoints,
  ENDPOINTS_TOKEN,
} from '@course-platform/shared/data-access';
import { SharedFeatAuthModule } from '@course-platform/shared/feat-auth';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app.routing';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { TopbarModule } from './layout/topbar/topbar.module';
import { CommonModule } from '@angular/common';

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `/assets/i18n/`, '.json');
}

export function endpointsFactory() {
  return {
    courseServiceUrl: environment.courseServiceUrl,
  } as Endpoints;
}

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    TopbarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    SharedFeatAuthModule,
  ],
  exports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    TopbarModule,
    TranslateModule,
    SharedFeatAuthModule,
  ],
  providers: [
    {
      provide: ENDPOINTS_TOKEN,
      useFactory: endpointsFactory,
    },
  ],
})
export class RemoteEntryModule {}
