import styled from "styled-components";
import sound from "./audio/sound";
function App() {
  const pianoKeyEvent = {
    's':'C',
    'd':'D',
    'f':'E',
    'g':'F',
    'h':'G',
    'j':'A',
    'k':'B',
    'l':'highC'
  }
  const playSound = (e)=>{
    if (e.key in pianoKeyEvent) {
      const audio = new Audio(sound[pianoKeyEvent[e.key]]);
      audio.volume=0.5;
      audio.play(); 
    }
  }
  window.addEventListener("keydown",playSound);
  return (
    <Wrapper>
      <PianoBox >
        <PianoKey type="C"/>
        <PianoKey type="D"/>
        <PianoKey type="E"/>
        <PianoKey type="F"/>
        <PianoKey type="G"/>
        <PianoKey type="A"/>
        <PianoKey type="B"/>
        <PianoKey type="highC"/>
      </PianoBox>
    </Wrapper>
  );
}


const Wrapper = styled.div`
  width: 100vw;
  min-width: 1400px;
  height: 100vh;
  min-height: 300px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`
const PianoBox = styled.main`
  width: 1400px;
  min-width: 1400px;
  height: 300px;
  min-height: 300px;
  background-color: ${({theme})=>theme.colors.pianoBox};
  border-radius: 30px;
  display:  flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 70px;
`
const PianoKey = styled.div`
  width: 100px;
  height: 250px;
  border-radius: 50px;
  background-color: ${({theme,type})=>theme.colors[type]};
`

export default App;

