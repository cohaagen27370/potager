import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { AlmanachService } from './almanach.service';
import { DayEphemerid, Meteo } from './almanach.model';
import { Subscription, take } from 'rxjs';
import { DatePipe } from '@angular/common';
import * as ephemeris  from '../../../../assets/scripts/ephemeris.json';
import {GeolocationService} from '@ng-web-apis/geolocation';


@Component({
  selector: 'ptgr-almanach',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './almanach.component.html',
  styleUrl: './almanach.component.scss'
})
export class AlmanachComponent implements OnInit, OnDestroy {

  ephemerid = signal<DayEphemerid | undefined>(undefined);
  now:Date = new Date();

  readonly geolocation$ = inject(GeolocationService);

  subscription!: Subscription;
  subscriptionLocation!: Subscription;
  subscriptionMeteo!: Subscription;

  saint = signal<string>('');
  city = signal<string>('');
  meteoAllDays = signal<Array<Meteo>>([]);

  meteo3Days = computed(() => {
    if (this.meteoAllDays())
      return this.meteoAllDays().filter(x => x.day <= 2 );

    return [];
  });

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();

    if (this.subscriptionLocation)
      this.subscriptionLocation.unsubscribe();
  }

  ngOnInit(): void {

    this.geolocation$.pipe(take(1)).subscribe(position =>

      this.subscriptionLocation = this.almanachService
                                      .getLocalisation(position.coords.latitude, position.coords.longitude)
                                      .pipe(take(1))
                                      .subscribe({
                                          next:(value) => {
                                            this.city.set(value.name);

                                            this.subscription = this.almanachService.getDayEphemerids(value.insee)
                                                                  .pipe(take(1))
                                                                  .subscribe({
                                                                      next:(value) => this.ephemerid.set(value),
                                                                      error:(err) => console.error(err)
                                                                  });

                                            this.subscriptionMeteo = this.almanachService.getMeteo(value.insee)
                                                                  .pipe(take(1))
                                                                  .subscribe({
                                                                      next:(value) => this.meteoAllDays.set(value),
                                                                      error:(err) => console.error(err)
                                                                  });

                                          },
                                          error:(err) => console.error(err)
                                      })
    );

    const currentMonth = this.now.getMonth();
    const currentDay = this.now.getDate();

    this.saint.set(`${Object.values(ephemeris)[currentMonth][currentDay-1][1]} ${Object.values(ephemeris)[currentMonth][currentDay-1][0]}`);

  }

  almanachService = inject(AlmanachService);

}
