// post1.ts
import type { BlogPost } from '@/app/types/blog';
import {GLOBAL} from "@/app/constants";

export const post5: BlogPost = {
    id: 'react-useref-portals',
    title: 'useRef 와 Portals?',
    date: '2024-03-01',
    md: `### **Refs**
React에서 **Ref(참조)**는 DOM 요소를 직접 접근하거나, 컴포넌트 내부 값의 상태 업데이트 없이 값을 저장하거나 관리할 때 사용합니다.
#### **\`useRef\`의 주요 용도**
1. **DOM 접근**
    - \`<input>\`과 같은 DOM 요소에 직접 접근이 필요할 때 사용됩니다.

2. **저장된 값 유지**
    - ref의 \`.current\` 속성은 컴포넌트의 라이프사이클 동안 값을 유지합니다. 이 값의 변경은 리렌더를 발생시키지 않습니다.

#### **\`useRef\`로 DOM 요소 접근하기**
React에서는 일반적으로 DOM 접근을 최소화하는 declarative한 방식을 권장하지만, 특정 상황에서는 DOM 접근(포커스 제어, 스크롤 위치 제어 등)이 필요합니다.
**예제: 버튼 클릭으로 input에 포커스**
\`\`\` javascript
import React, { useRef } from "react";

function TextInputWithFocusButton() {
  const inputRef = useRef(); // ref 생성

  const onButtonClick = () => {
    inputRef.current.focus(); // ref를 사용해 input에 포커스
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="포커스 테스트" />
      <button onClick={onButtonClick}>Input에 포커스</button>
    </div>
  );
}

export default TextInputWithFocusButton;
\`\`\`
#### **저장 가능한 값 관리**
\`useRef\`는 값 상태를 저장하면서 리렌더를 발생시키지 않아 **UI 업데이트가 필요 없는 값** 관리에 적합합니다.
**예제: 값 저장하기 (렌더링 최소화)**
클릭 횟수를 저장하지만 업데이트될 때 컴포넌트를 리렌더링하지 않는 경우:
\`\`\` javascript
import React, { useRef, useState } from "react";

function CounterWithoutRerender() {
  const countRef = useRef(0); // 내부 상태 저장
  const [renderCount, setRenderCount] = useState(0); // 리렌더링을 위한 상태

  const incrementCounter = () => {
    countRef.current += 1; // 값만 증가(리렌더 X)
    console.log("현재 값:", countRef.current);
  };

  const triggerRerender = () => {
    setRenderCount((prev) => prev + 1); // 강제 리렌더링
  };

  return (
    <div>
      <p>Ref로 관리된 값: {countRef.current}</p>
      <p>리렌더링된 횟수: {renderCount}</p>
      <button onClick={incrementCounter}>값 증가</button>
      <button onClick={triggerRerender}>강제 리렌더링</button>
    </div>
  );
}

export default CounterWithoutRerender;
\`\`\`
#### **Ref와 상태의 차이**

| 특징 | **State** | **Ref** |
| --- | --- | --- |
| **변경 시 리렌더** | State가 변경되면 리렌더링 발생 | Ref 값이 변경되어도 리렌더링되지 않음 |
| **초기화 여부** | 초깃값을 설정하고 필요하면 초기화 가능 | \`.current\`에 직접 저장 및 초기화 |
| **주요 사용처** | UI 상태 관리 및 렌더링 필요 | DOM 접근 또는 값 저장 목적 |
| **주요 예시** | \`useState\`, \`setState\` | \`useRef\` |
### **Portals**
React의 **Portal**은 컴포넌트를 현재 React 트리 밖의 특정 DOM 노드에 렌더링해야 할 때 사용하는 기능입니다.
주로 **모달, 팝업, 툴팁**과 같은 UI 컴포넌트를 렌더링할 때 유용합니다.
#### **Portal의 특징**
1. **DOM 계층을 벗어난 렌더링**
    - React 컴포넌트가 렌더링되지만, React DOM 구조 외의 별도 DOM 노드에 컴포넌트를 추가할 수 있습니다.

2. **이벤트 버블링**
    - Portals로 렌더링된 DOM은 React 트리 상으로는 부모 트리에 속하기 때문에 이벤트 버블링은 여전히 React 트리를 따릅니다.

#### **Portal 기본 사용법**
React에서 포털을 사용하려면 \`ReactDOM.createPortal\` 메서드를 사용해야 합니다.
\`\`\` javascript
import ReactDOM from "react-dom";

function Modal({ children }) {
  const modalRoot = document.getElementById("modal-root"); // 렌더링 위치
  return ReactDOM.createPortal(children, modalRoot); // 특정 DOM 노드에 렌더링
}

function App() {
  return (
    <div>
      <h1>React Portal Demo</h1>
      <Modal>
        <h2>모달 팝업 컴포넌트</h2>
        <p>이 내용은 모달-root에 렌더링됩니다.</p>
      </Modal>
    </div>
  );
}

export default App;
\`\`\`
**포털 DOM 구조:**
\`\`\` html
<div id="app-root"></div>
<div id="modal-root"></div>
\`\`\`
#### **Modal 컴포넌트 활용 예**
포탈과 함께 \`useState\`를 사용해 모달을 열고 닫는 동작을 구현할 수 있습니다.
\`\`\` javascript
import React, { useState } from "react";
import ReactDOM from "react-dom";

function Modal({ onClose, children }) {
  const modalRoot = document.getElementById("modal-root");

  return ReactDOM.createPortal(
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {children}
        <button onClick={onClose}>닫기</button>
      </div>
    </div>,
    modalRoot
  );
}

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const openModalHandler = () => setIsOpen(true);
  const closeModalHandler = () => setIsOpen(false);

  return (
    <div>
      <h1>React Portal Example</h1>
      <button onClick={openModalHandler}>모달 열기</button>
      {isOpen && <Modal onClose={closeModalHandler}>모달 내부 컨텐츠</Modal>}
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
};

export default App;
\`\`\`
#### **Portal의 이벤트 버블링 특성**
React 포탈에서 이벤트 버블링은 여전히 React 트리를 따라 진행됩니다.
**예제: 이벤트 버블링이 부모 React 트리에 전파됨**
\`\`\` javascript
function Modal({ children }) {
  return ReactDOM.createPortal(
    <div onClick={() => console.log("모달 클릭")}>
      {children}
    </div>,
    document.getElementById("modal-root")
  );
}

function App() {
  const clickHandler = () => {
    console.log("앱에서 클릭 이벤트 발생");
  };

  return (
    <div onClick={clickHandler}>
      <h1>React Portal Event Bubbling</h1>
      <Modal>
        <p>포탈 내부 (이벤트 전파 O)</p>
      </Modal>
    </div>
  );
}

export default App;
\`\`\`
**결과:** 모달 영역을 클릭하면 \`모달 클릭\`과 \`앱에서 클릭 이벤트 발생\`이 모두 실행됩니다. (React 이벤트 버블링)
### **Refs & Portals의 활용 예**
**모달에서 외부의 클릭 감지하기**
- 포털로 렌더링된 모달이 열려 있을 때 **모달 외부를 클릭**해 모달을 닫도록 구현할 수 있습니다.

**예제 코드:**
\`\`\` javascript
import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";

function Modal({ onClose, children }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target)) {
        onClose(); // 외부 클릭 시 모달 닫기
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div style={styles.overlay}>
      <div ref={overlayRef} style={styles.modal}>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

export default Modal;
\`\`\`
---
1. **Refs**
    - DOM 접근 및 리렌더링 없이 값 유지.
    - 값 참조, 이벤트 처리 기능 구현에 유용.

2. **Portals**
    - React 트리에서 벗어난 DOM 노드에 컴포넌트를 렌더링.
    - 모달, 팝업 등을 페이지 레이아웃과 독립적으로 구현.

[React 홈페이지](https://ko.legacy.reactjs.org)
    `,
    excerpt: 'useRef 와 Portals',
    tags: ['React.js', 'useRef', 'Portals'],
    author: GLOBAL.NAME,
    coverImage: '/images/js/react.png'
};