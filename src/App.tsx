import { createGlobalStyle, ThemeProvider } from 'styled-components'
import WebSocketContextProvider from './websocketManager/contextProvider'
import { Container } from './components/Container'
import { FocusHandler } from './components/FocusHandler'
import { myTheme } from './styling/theme'

const GlobalStyle = createGlobalStyle`
  body {
    color: ${myTheme.colors.text};
    background-color: ${myTheme.colors.background};
    font-family:'Roboto', sans-serif;
  }
  
  button {
    color: ${myTheme.colors.accent};
    border: 2px solid ${myTheme.colors.accent};
    border-radius: 5px;
    background-color: ${myTheme.colors.background};
    margin: 4px;
    padding: 4px;
    font-variant: small-caps;
    font-size: 14px;
    font-weight: 900;
    &:hover{
      background-color: ${myTheme.colors.accentDark};

    }
  }

`

function App() {
  return (
    <>
      <ThemeProvider theme={myTheme}>
        <GlobalStyle />
        <WebSocketContextProvider>
          <FocusHandler>
            <Container />
          </FocusHandler>
        </WebSocketContextProvider>
      </ThemeProvider>
    </>
  )
}

export default App
