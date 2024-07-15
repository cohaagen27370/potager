import { ApplicationConfig, LOCALE_ID, importProvidersFrom, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';

const dbConfig: DBConfig  = {
  name: 'potagerDb',
  version: 1,
  objectStoresMeta: [{
    store: 'my-plants',
    storeConfig: { keyPath: 'id', autoIncrement: false },
    storeSchema: [
      { name: 'name', keypath: 'name', options: { unique: false } },
      { name: 'variety', keypath: 'variety', options: { unique: false } },
      { name: 'monthBeforeHarvesting', keypath: 'monthBeforeHarvesting', options: { unique: false } },
      { name: 'plantingDate', keypath: 'plantingDate', options: { unique: false } },
      { name: 'harvestingDate', keypath: 'harvestingDate', options: { unique: false } },
      { name: 'fertilizationDate', keypath: 'fertilizationDate', options: { unique: false } }
    ]
  },
  {
    store: 'my-preparations',
    storeConfig: { keyPath: 'id', autoIncrement: false },
    storeSchema: [
      { name: 'name', keypath: 'name', options: { unique: false } },
      { name: 'type', keypath: 'type', options: { unique: false } },
      { name: 'daysBeforeHarvesting', keypath: 'daysBeforeHarvesting', options: { unique: false } },
      { name: 'makingDate', keypath: 'makingDate', options: { unique: false } },
      { name: 'harvestingDate', keypath: 'harvestingDate', options: { unique: false } }
    ]
  },
  {
    store: 'my-stocks',
    storeConfig: { keyPath: 'id', autoIncrement: false },
    storeSchema: [
      { name: 'name', keypath: 'name', options: { unique: false } },
      { name: 'variety', keypath: 'variety', options: { unique: false } },
      { name: 'amount', keypath: 'amount', options: { unique: false } },
      { name: 'expirationDate', keypath: 'expirationDate', options: { unique: false } },
      { name: 'photoLink', keypath: 'photoLink', options: { unique: false } }
    ]
  }
]
};

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
    importProvidersFrom(NgxIndexedDBModule.forRoot(dbConfig)),
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR',
    }
  ],

};
