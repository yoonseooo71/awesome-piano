import styled from "styled-components";
import sounds from "./audio/sound";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
function App() {
  const [moveKeys, setMoveKeys] = useState([]); //에니메이션 컴포넌트 state
  const moveKeysRef = useRef([]); // effect에서 state값을바꾸어도 느리게 적용되에서 사용함
  const keysDom = useRef({}); //Ref를 여러개사용하기위해 current 값에 오브젝트를 넣어줌

  const setMoveKeysRef = useCallback(//state 와 Ref.current 에 값을 한번에 넣는 함수
    (data) => {
      moveKeysRef.current = data;
      setMoveKeys(data);
    },
    [setMoveKeys]
  );

  const playSound = useCallback((sound) => {//소리출력하는 함수
    const audio = new Audio(sound); //audio 생성
    audio.volume = 0.5; //소리크기 조절
    audio.play();
  }, []);

  const animationEndHandler = useCallback(//요소 에니메이션 끝났을때 요소 제거하는 함수
    (event) => {
      const filterMoveKeys = moveKeysRef.current.filter( //유니크 id값을사용하여 id가 같은 요소를 제거
        (element) => element.props.id !== event.target.id
      ); 
      setMoveKeysRef(filterMoveKeys);
    },
    [setMoveKeysRef]
  );

  const keyDownHandler = useCallback(//키입력시 피아노소리 출력
    (e) => {
      const changeKey = {
        //키별 계이름
        s: "C",
        d: "D",
        f: "E",
        g: "F",
        h: "G",
        j: "A",
        k: "B",
        l: "highC",
      };
      const inputKey = e.key.toLowerCase(); //입력 받은 키보드키 (소문자전환)
      if (e.repeat) return; //키누르는중 중복 이벤트 발생
      else if (inputKey in changeKey) {
        //입력한 키가 사용할키인지 확인
        const sound = changeKey[inputKey]; //계이름
        playSound(sounds[sound]); //피아노 소리 출력
        const clientRect = keysDom.current[sound].getBoundingClientRect(); //요소위치값 가져오기
        setMoveKeysRef([ 
          ...moveKeysRef.current,
          <TopMovePianoKey
            id={uuidv4()}
            key={uuidv4()}
            type={sound}
            bottom={clientRect.bottom}
            top={clientRect.top}
            left={clientRect.left}
            onAnimationEnd={animationEndHandler}
          />,
          <BottomMovePianoKey
            id={uuidv4()}
            key={uuidv4()}
            type={sound}
            bottom={clientRect.bottom}
            top={clientRect.top}
            left={clientRect.left}
            onAnimationEnd={animationEndHandler}
          />,
        ]); // 이동하는 에니메이션 요소 추가
      }
    },
    [playSound, setMoveKeysRef, keysDom, animationEndHandler]
  );

  useEffect(() => {
    //이벤트가 발생하면 state를 사용해 랜더링이되며 이벤트가 재생성되서 그걸 막기위해 useEffect 사용
    window.addEventListener("keydown", keyDownHandler); //브라우저 키입력 이벤트
    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [keyDownHandler]);

  return (
    <Wrapper>
      <PianoBox>
        <PianoKey type="C" ref={(el) => (keysDom.current["C"] = el)} />
        <PianoKey type="D" ref={(el) => (keysDom.current["D"] = el)} />
        <PianoKey type="E" ref={(el) => (keysDom.current["E"] = el)} />
        <PianoKey type="F" ref={(el) => (keysDom.current["F"] = el)} />
        <PianoKey type="G" ref={(el) => (keysDom.current["G"] = el)} />
        <PianoKey type="A" ref={(el) => (keysDom.current["A"] = el)} />
        <PianoKey type="B" ref={(el) => (keysDom.current["B"] = el)} />
        <PianoKey type="highC" ref={(el) => (keysDom.current["highC"] = el)} />
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
`;
const PianoBox = styled.main`
  width: 1400px;
  min-width: 1400px;
  height: 300px;
  min-height: 300px;
  background-color: ${({ theme }) => theme.colors.pianoBox};
  border-radius: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 70px;
  z-index: 1;
`;
const PianoKey = styled.div`
  width: 100px;
  height: 250px;
  border-radius: 50px;
  background-color: ${({ theme, type }) => theme.colors[type]};
`;
const TopMovePianoKey = styled(PianoKey)` //시작위치에서 화면 위로 이동하는 에니메이션 컴포넌트
  position: absolute;
  z-index: 10;
  left: ${({ left }) => `${left}px`};
  animation: 1s ease-in 0s topMove;
  opacity: 50%;
  @keyframes topMove {
    from {
      bottom: ${({ top }) => `${top}px`};
    }
    to {
      bottom: ${({ top }) => `${top * 2 + 250}px`};
    }
  }
`;
const BottomMovePianoKey = styled(TopMovePianoKey)` //화면 아래에서 시작위치로 이동하는 에니메이션 컴포넌트
  animation: 1s ease-in-out 1s bottomMove; //2초 딜레이
  @keyframes bottomMove {
    from {
      top: ${({ bottom }) => `${bottom * 2 - 250}px`};
    }
    to {
      top: ${({ bottom }) => `${bottom - 250}px`};
    }
  }
`;
export default App;
