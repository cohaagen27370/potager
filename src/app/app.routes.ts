import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path : '',
    pathMatch : 'full',
    redirectTo : 'plants'
  },
  {
    path : 'plants',
    loadComponent : () => import('./features/my-plants/my-plants.component').then(m => m.MyPlantsComponent)
  },
  {
    path : 'preparations',
    loadComponent : () => import('./features/my-preparations/my-preparations.component').then(m => m.MyPreparationsComponent)
  },
  {
    path : 'miscellaneous',
    loadComponent : () => import('./features/miscellaneous/miscellaneous.component').then(m => m.MiscellaneousComponent)
  }
];
