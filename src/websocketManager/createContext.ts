import { createContext } from 'react'
import { Delta, Snapshot } from '../core/types'

export interface WebSocketContextType {
  connect: () => void
  close: () => void
  snapshot: any //Snapshot
  delta: any //Delta
  spread: number
}

const WebSocketContext = createContext<WebSocketContextType>({
  connect: () => {},
  close: () => {},
  snapshot: {},
  delta: {},
  spread: 0,
})

export default { WebSocketContext }
