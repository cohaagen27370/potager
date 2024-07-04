import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable, output, signal } from '@angular/core';
import { Subject, distinctUntilChanged } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  resize = signal<string | undefined>('');

  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge
      ])
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.resize.set(this.displayNameMap.get(query));
            console.debug(this.resize());
          }
        }
      });
  }
}
