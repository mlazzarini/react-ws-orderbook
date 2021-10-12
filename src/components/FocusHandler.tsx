import {
  FunctionComponent,
  useEffect,
  useContext,
  useState,
  useCallback,
} from 'react'
import styled from 'styled-components'
import contextWebSocket from '../websocketManager/createContext'

const { WebSocketContext } = contextWebSocket

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`

const PromptMessage = styled.div`
  width: 200px;
  height: 100px;
  background-color: #ffffff;
  border: 1px solid black;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Line = styled.div`
  margin: 10px;
`

export const FocusHandler: FunctionComponent = ({ children }) => {
  const { connect, close } = useContext(WebSocketContext)
  const [disconnected, setDisconnected] = useState(true)

  const onBlur = useCallback(() => {
    close()
    setDisconnected(true)
  }, [close])

  const onReconnect = () => {
    connect()
    setDisconnected(false)
  }

  useEffect(() => {
    window.addEventListener('blur', onBlur)
    return () => {
      window.removeEventListener('blur', onBlur)
    }
  }, [onBlur])

  return (
    <>
      {disconnected && (
        <Overlay>
          <PromptMessage>
            <Line>Disconnected.</Line>
            <Line>Ready to go again?</Line>
            <Line>
              <button onClick={onReconnect}>YES</button>
            </Line>
          </PromptMessage>
        </Overlay>
      )}
      {children}
    </>
  )
}
