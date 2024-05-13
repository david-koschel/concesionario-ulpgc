import {ApplicationConfig} from '@angular/core';
import {InMemoryScrollingOptions, provideRouter, withInMemoryScrolling} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {authorizationInterceptor} from "./security/interceptor";
import {provideAnimations} from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withInMemoryScrolling(scrollConfig)),
    provideHttpClient(withInterceptors([authorizationInterceptor])),
    provideAnimations(), provideAnimationsAsync()
  ]
};
