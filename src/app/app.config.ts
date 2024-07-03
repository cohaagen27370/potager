import { ApplicationConfig, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {DEFAULT_CONFIG, NgForageOptions, NgForageConfig, Driver} from 'ngforage';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
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
    }
  ],

};
