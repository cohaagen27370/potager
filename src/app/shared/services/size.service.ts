import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable, output } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  resize = new Subject<string | undefined>();

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
        Breakpoints.XLarge,
      ])
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            console.info(this.displayNameMap.get(query));

            switch(this.displayNameMap.get(query))
            {
              case 'XSmall':
              case 'Small':
                this.resize.next('mobile');
                break;
              case 'Medium':
                  this.resize.next('tablet');
                  break;
              default:
                  this.resize.next('desktop');
                  break;
            }


          }
        }
      });
  }
}
