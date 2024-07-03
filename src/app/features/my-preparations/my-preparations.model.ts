export interface Preparation {
  id: string
  name: string
  type : string
  amount:number
  daysBeforeHarvesting: number
  makingDate: Date
  harvestingDate: Date
  harvestingAlert: boolean
}
