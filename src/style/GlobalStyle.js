import {createGlobalStyle} from "styled-components"; 
import {normalize} from "styled-normalize" ;
const GlobalStyle = createGlobalStyle`
  ${normalize} 
  * {
    box-sizing: border-box;
    
  }
  body {
    overflow: hidden;
  }
`
export default GlobalStyle ;