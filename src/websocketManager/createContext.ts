import { createContext } from 'react'
import { Delta, Snapshot } from '../core/types'

export interface WebSocketContextType {
  connect: () => void
  close: () => void
  snapshot: any //Snapshot
  delta: any //Delta
  spread: number
  toggleFeed: () => void
}

const WebSocketContext = createContext<WebSocketContextType>({
  connect: () => {},
  close: () => {},
  snapshot: {},
  delta: {},
  spread: 0,
  toggleFeed: () => {},
})

export default { WebSocketContext }
