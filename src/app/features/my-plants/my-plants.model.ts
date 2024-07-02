export interface Plant {
  name: string
  variety: string | undefined
  monthBeforeHarvesting: number
  plantingDate: Date
  harvestingDate: Date
  lastFertilizerDate: Date | undefined
}
