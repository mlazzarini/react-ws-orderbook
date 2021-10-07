export type Bids = number[][]
export type Asks = number[][]

export type Feed = 'PI_XBTUSD' | 'PI_ETHUSD'

export interface Snapshot {
  numLevels: number
  feed: 'book_ui_1_snapshot'
  product_id: Feed
  bids: Bids
  asks: Asks
}

export interface Delta extends Pick<Snapshot, 'product_id' | 'bids' | 'asks'> {
  feed: 'book_ui_1'
}
