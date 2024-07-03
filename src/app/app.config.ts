import { ApplicationConfig, LOCALE_ID, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {DEFAULT_CONFIG, NgForageOptions, NgForageConfig, Driver} from 'ngforage';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideHttpClient(withFetch()),
    provideRouter(routes,
      withHashLocation(),
      withRouterConfig({ onSameUrlNavigation: 'reload' })
    ),
    {
      provide: DEFAULT_CONFIG,
      useValue: {
        name: 'Potager',
        driver: [
          Driver.INDEXED_DB,
          Driver.LOCAL_STORAGE
        ]
      } as NgForageOptions
    },
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR',
    }
  ],

};
