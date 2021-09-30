import { createContext } from 'react'
import { Delta, Snapshot } from '../core/types'

export interface WebSocketContextType {
  connect: () => void
  close: () => void
  snapshot: any //Snapshot
  delta: any //Delta
}

const WebSocketContext = createContext<WebSocketContextType>({
  connect: () => {},
  close: () => {},
  snapshot: {},
  delta: {},
})

export default { WebSocketContext }
