import { FunctionComponent, useState } from 'react'
import webSocketContext from './createContext'

const { WebSocketContext } = webSocketContext

const WebSocketContextProvider: FunctionComponent = ({ children }) => {
  const [socket, setSocket] = useState<WebSocket>()
  const [snapshot, setSnapshot] = useState({})
  const [delta, setDelta] = useState({})

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
      }}>
      {children}
    </WebSocketContext.Provider>
  )
}

export default WebSocketContextProvider
