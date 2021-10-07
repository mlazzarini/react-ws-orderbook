import { FunctionComponent, useState, useEffect } from 'react'
import { Snapshot } from '../core/types'
import webSocketContext from './createContext'

const { WebSocketContext } = webSocketContext

const WebSocketContextProvider: FunctionComponent = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket>()
  const [snapshot, setSnapshot] = useState<Snapshot | undefined>()
  const [delta, setDelta] = useState({})
  const [spread, setSpread] = useState(0)

  useEffect(() => {
    const topAsk = snapshot?.asks ? snapshot.asks[0][0] : 0
    const topBid = snapshot?.bids ? snapshot.bids[0][0] : 0
    setSpread(topAsk - topBid)
  }, [snapshot?.asks, snapshot?.bids])

  const connect = () => {
    const newSocket = new WebSocket('wss://www.cryptofacilities.com/ws/v1')
    setSocket(newSocket)
    newSocket.addEventListener('open', () => {
      const subscribeReq = {
        event: 'subscribe',
        feed: 'book_ui_1',
        product_ids: ['PI_XBTUSD'],
      }
      newSocket.send(JSON.stringify(subscribeReq))
    })

    newSocket.addEventListener('message', (res: any) => {
      const msg = JSON.parse(res.data)
      if (msg.feed === 'book_ui_1_snapshot') {
        setSnapshot(msg)
      }
      if (msg.feed === 'book_ui_1') {
        setDelta(msg)
      }
    })
  }

  const close = () => {
    console.log('Closing websocket', socket)
    socket?.close()
  }

  return (
    <WebSocketContext.Provider
      value={{
        connect,
        close,
        snapshot,
        delta,
        spread,
      }}>
      {children}
    </WebSocketContext.Provider>
  )
}

export default WebSocketContextProvider
