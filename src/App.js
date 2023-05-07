import styled from "styled-components";
import sound from "./audio/sound";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
function App() {
  const [moveKeys,setMoveKeys] = useState([]); 
  const pianoKeyEvent = { //키별 계이름 
    's':'C',
    'd':'D',
    'f':'E',
    'g':'F',
    'h':'G',
    'j':'A',
    'k':'B',
    'l':'highC'
  }
  const keysDom = {
    C : useRef(),
    D : useRef(),
    E : useRef(),
    F : useRef(),
    G : useRef(),
    A : useRef(),
    B : useRef(),
    highC : useRef()
  }
  useEffect(()=>{ //이벤트가 발생하면 state를 사용해 랜더링이되며 이벤트가 재생성되서 그걸 막기위해 useEffect 사용
    const playSound = (e)=>{ //키입력시 피아노소리 출력
      if (e.repeat) return;
      else if (e.key in pianoKeyEvent) { //입력한 키가 사용할키인지 확인
        const audio = new Audio(sound[pianoKeyEvent[e.key]]); //audio 생성 
        audio.volume=0.5; //소리크기 조절 
        audio.play()
        const clientRect = keysDom[pianoKeyEvent[e.key]].current.getBoundingClientRect();
        setMoveKeys(moveKeys=> [...moveKeys,<MovePianoKey key={moveKeys.length} type={pianoKeyEvent[e.key]} top={clientRect.top} left={clientRect.left} />])// 이동하는 에니메이션 요소 추가
      }
    }
    window.addEventListener("keydown",playSound); //브라우저 키입력 이벤트 
    return ()=>{
      window.removeEventListener("keydown",playSound);
    }
  },[moveKeys,setMoveKeys])
  return (
    <Wrapper>
      <PianoBox >
        <PianoKey type="C" ref={keysDom.C}/>
        <PianoKey type="D" ref={keysDom.D}/>
        <PianoKey type="E" ref={keysDom.E}/>
        <PianoKey type="F" ref={keysDom.F}/>
        <PianoKey type="G" ref={keysDom.G}/>
        <PianoKey type="A" ref={keysDom.A}/>
        <PianoKey type="B" ref={keysDom.B}/>
        <PianoKey type="highC" ref={keysDom.highC}/>
        {moveKeys}
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
  z-index: 1;
`
const PianoKey = styled.div`
  width: 100px;
  height: 250px;
  border-radius: 50px;
  background-color: ${({theme,type})=>theme.colors[type]};
`
const MovePianoKey = styled(PianoKey)`
  position: absolute;
  z-index: 10;
  left: ${({left})=> `${left}px`};
  animation: 2s topMove;
  opacity: 50%;
  @keyframes topMove {
    from {
      bottom: ${({top})=>`${top}px`}
    }
    to {
      bottom: ${({top})=>`${top*2+250}px`};
    }
  }
`
export default App;

