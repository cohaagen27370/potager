export interface DayEphemerid {
  sun_rise: string,
  sun_set: string,
  day_length: string
  diff_duration:number
}

export interface ApiEphemerid {
  ephemeride : ApiEphemeridDatas
}

export interface ApiEphemeridDatas {
  sunrise : string
  sunset : string
  duration_day : string
  diff_duration_day : number
  moon_age:number
  moon_phase:string
}

export interface ApiCity {
  city: City
}

export interface City {
  insee: string
  cp : string
  latitude: number
  longitude:number
  name:string
}

export interface ApiMeteo {
  forecast: Meteo[]
}

export interface Meteo {
  day: number
  datetime: Date
  weather: number
  tmin: number
  tmax:number
  weatherIcon: string
  weatherDescription: string
}
