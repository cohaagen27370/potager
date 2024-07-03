import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { AlmanachService } from './almanach.service';
import { DayEphemerid } from './almanach.model';
import { Subscription, take } from 'rxjs';
import { DatePipe } from '@angular/common';
import * as ephemeris  from '../../../../assets/scripts/ephemeris.json';

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

  subscription!: Subscription;

  saint = signal<string>('');

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.almanachService.getDayEphemerids().pipe(take(1)).subscribe({
      next:(value) => this.ephemerid.set(value),
      error:(err) => console.error(err)
    });

    const currentMonth = this.now.getMonth();
    const currentDay = this.now.getDate();

    this.saint.set(`${Object.values(ephemeris)[currentMonth][currentDay-1][1]} ${Object.values(ephemeris)[currentMonth][currentDay-1][0]}`);

  }

  almanachService = inject(AlmanachService);

}
