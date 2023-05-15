import C from "../audio/C.mp3";
import D from "../audio/D.mp3";
import E from "../audio/E.mp3";
import F from "../audio/F.mp3";
import G from "../audio/G.mp3";
import A from "../audio/A.mp3";
import B from "../audio/B.mp3";
import highC from "../audio/highC.mp3";
type Sound = {
  [k:string]:string
}

const sounds:Sound = { //all sound file export 
  C,
  D,
  E,
  F,
  G,
  A,
  B,
  highC
}


export default sounds ;