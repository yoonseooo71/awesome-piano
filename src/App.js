import styled from "styled-components";
function App() {
  return (
    <Wrapper>
      <PianoBox>
        <PianoKey type="C"/>
        <PianoKey type="D"/>
        <PianoKey type="E"/>
        <PianoKey type="F"/>
        <PianoKey type="G"/>
        <PianoKey type="A"/>
        <PianoKey type="B"/>
        <PianoKey type="C"/>
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
  height: 300px;
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

