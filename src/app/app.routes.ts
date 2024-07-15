import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path : '',
    pathMatch : 'full',
    redirectTo : 'plants'
  },
  {
    path : 'plants',
    title : "Mes plantations",
    loadComponent : () => import('./features/my-plants/my-plants-general/my-plants-general.component').then(m => m.MyPlantsGeneralComponent)
  },
  {
    path : 'preparations',
    title : "Mes préparations",
    loadComponent : () => import('./features/my-preparations/my-preparations-general/my-preparations-general.component').then(m => m.MyPreparationsGeneralComponent)
  },
  {
    path : 'stocks',
    title : "Mes stocks",
    loadComponent : () => import('./features/stocks/stocks.component').then(m => m.StocksComponent)
  },
  {
    path : 'miscellaneous',
    title : "Divers",
    loadComponent : () => import('./features/miscellaneous/miscellaneous.component').then(m => m.MiscellaneousComponent)
  }
];
