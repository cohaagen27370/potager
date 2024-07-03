import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiEphemerid, DayEphemerid } from './almanach.model';
import { HttpClient } from '@angular/common/http';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class AlmanachService {

  http = inject(HttpClient);

  getDayEphemerids() : Observable<DayEphemerid> {
    return this.http.get<ApiEphemerid>('https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400').pipe(
      map((response) => {
      return {
        sun_rise : format(new Date('2024-03-07 ' + response.results.sunrise),'HH:mm:ss'),
        sun_set : format(new Date('2024-03-07 ' +response.results.sunset),'HH:mm:ss'),
        day_length : response.results.day_length
      }})
    );
  }
}
