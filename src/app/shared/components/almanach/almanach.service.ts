import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiCity, ApiMeteo, ApiEphemerid, City, DayEphemerid, Meteo } from './almanach.model';
import { HttpClient } from '@angular/common/http';
import * as forecast  from '../../../../assets/scripts/forecast.json';

@Injectable({
  providedIn: 'root'
})
export class AlmanachService {

  http = inject(HttpClient);

  private readonly API_TOKEN: string = process.env["API_METEO_TOKEN"]!;

  getDayEphemerids(insee:string) : Observable<DayEphemerid> {
    return this.http.get<ApiEphemerid>(`https://api.meteo-concept.com/api/ephemeride/0?token=${this.API_TOKEN}&insee=${insee}`).pipe(
      map((response) => {
      return {
        sun_rise : response.ephemeride.sunrise,
        sun_set : response.ephemeride.sunset,
        day_length : response.ephemeride.duration_day,
        diff_duration : response.ephemeride.diff_duration_day
      }})
    );
  }

  getLocalisation(latitude:number, longitude:number) : Observable<City> {
    return this.http.get<ApiCity>(`https://api.meteo-concept.com/api/location/city?token=${this.API_TOKEN}&latlng=${latitude},${longitude}`).pipe(
      map((response) => {
        return {
          insee : response.city.insee,
          name : response.city.name
        } as City})
    );
  }

  getMeteo(insee:string) : Observable<Meteo[]> {
    return this.http.get<ApiMeteo>(`https://api.meteo-concept.com/api/forecast/daily?token=${this.API_TOKEN}&insee=${insee}`).pipe(
      map((response) => response.forecast.map((meteo) =>
        {
          return {
            ...meteo,weatherIcon : this.getMeteoIcon(meteo.weather), weatherDescription : Object.values(forecast)[meteo.weather]
          }
      })
    ));
  }

  getMeteoIcon(iconCode:number) {
    switch(iconCode) {
      case 0:
        return 'images/meteo/day.svg';
      case 1:
      case 2:
      case 3:
        return 'images/meteo/cloudy-day-1.svg';
      case 4:
        return 'images/meteo/cloudy-day-2.svg';
      case 5:
      case 6:
      case 7:
        return 'images/meteo/cloudy-day-3.svg';
      case 10:
        return 'images/meteo/rainy-1.svg';
      case 11:
        return 'images/meteo/rainy-2.svg';
      case 12:
        return 'images/meteo/rainy-3.svg';
      case 13:
        return 'images/meteo/rainy-4.svg';
      case 14:
        return 'images/meteo/rainy-5.svg';
      case 15:
      case 16:
        return 'images/meteo/rainy-6.svg';
      case 20:
      case 30:
      case 40:
      case 43:
      case 46:
      case 47:
        return 'images/meteo/snowy-4.svg';
      case 21:
      case 31:
      case 41:
      case 44:
        return 'images/meteo/snowy-5.svg';
      case 22:
      case 32:
      case 42:
      case 45:
      case 48:
        return 'images/meteo/snowy-6.svg';
      case 100:
      case 101:
      case 102:
      case 103:
      case 104:
      case 105:
      case 106:
      case 107:
      case 108:
      case 120:
      case 121:
      case 122:
      case 123:
      case 124:
      case 125:
      case 126:
      case 127:
      case 128:
      case 129:
      case 130:
      case 131:
      case 132:
      case 133:
      case 134:
      case 135:
      case 136:
      case 137:
      case 138:
        return 'images/meteo/thunder.svg';
      case 235:
        return 'images/meteo/rainy-7.svg';
      default:
        return 'images/meteo/cloudy.svg';
    }
  }

}
