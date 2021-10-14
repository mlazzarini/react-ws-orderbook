// import original module declarations
import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string
      text: string
      accent: string
      accentDark: string
      darkRed: string
      lightRed: string
      darkGreen: string
      lightGreen: string
    }
  }
}
