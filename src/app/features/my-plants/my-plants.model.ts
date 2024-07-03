export interface Plant {
  id: string
  name: string
  variety: string | undefined
  monthBeforeHarvesting: number
  plantingDate: Date
  harvestingDate: Date
  harvestingAlert: boolean
  fertilizationDate: Date | undefined
  fertilizationAlert: boolean
}
