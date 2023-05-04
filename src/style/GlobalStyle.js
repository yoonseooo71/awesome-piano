import {createGlobalStyle} from "styled-components"; 
import {normalize} from "styled-normalize" ;
const GlobalStyle = createGlobalStyle`
  ${normalize} 
  html {
    width: 100%;
    height: 100%; 
  } 

  body {
    width: 100%;
    height: 100%;
    background-color: black;
    margin: 0;
  }
`
export default GlobalStyle ;