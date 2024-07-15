export interface Stocks {
  id: string
  name: string
  variety : string
  amount:'Full' | 'Medium' | 'Low',
  expirationDate: Date,
  expirationAlert: boolean,
  photoLink: string
}
