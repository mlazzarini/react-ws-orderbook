export type Bids = number[][]
export type Asks = number[][]

export interface Snapshot {
  numLevels: number
  feed: 'book_ui_1_snapshot'
  product_id: string
  bids: Bids
  asks: Asks
}

export interface Delta extends Pick<Snapshot, 'product_id' | 'bids' | 'asks'> {
  feed: 'book_ui_1'
}
