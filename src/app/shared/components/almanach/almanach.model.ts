export interface DayEphemerid {
  sun_rise: string,
  sun_set: string,
  day_length: string
}

export interface ApiEphemerid {
  results : ApiEphemeridDatas
  status: string
}

export interface ApiEphemeridDatas {
  sunrise : string
  sunset : string
  day_length : string
}
