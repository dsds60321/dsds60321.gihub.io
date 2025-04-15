// post1.ts
import type { BlogPost } from '@/app/types/blog';
import {GLOBAL} from "@/app/constants";

export const post2: BlogPost = {
    id: 'react',
    title: 'React란?',
    date: '2024-02-27',
    md: `### React 란?
**React**는 Facebook에서 개발하고, 오픈 소스로 제공되는 **UI(User Interface) 라이브러리**입니다. 주로 단일 페이지 애플리케이션(SPA)을 구축하기 위한 도구로 사용되며, 선언적 프로그래밍 방식 및 컴포넌트 기반 아키텍처를 통해 UI를 쉽게 관리할 수 있도록 도와줍니다.
#### React 주요 특징:
1. **컴포넌트 기반 설계**
    - React는 프로젝트를 **컴포넌트 단위**로 나누어서 개발합니다. 컴포넌트는 UI를 독립적이고 재사용 가능한 단위로 관리하게 해줍니다.
    - 컴포넌트를 사용하면 큰 애플리케이션을 분리하고 유지보수를 훨씬 쉽게 할 수 있습니다.

2. **선언적 프로그래밍**
    - 선언적으로 UI를 설계하여 상태 변화에 따라 자동으로 DOM 업데이트를 처리합니다.
    - 개발자는 "어떻게 UI를 그릴지"보다 "어떤 UI인지를 정의"하는 데 집중할 수 있습니다.

3. **JSX (JavaScript XML)**
    - JSX는 자바스크립트 코드 내에서 HTML을 작성할 수 있도록 하는 확장 문법입니다. 보다 직관적으로 UI를 설계할 수 있습니다.

4. **가상 DOM (Virtual DOM)**
    - 실제 DOM 변경 전에 메모리에 그려지는 가상 DOM을 사용하여 변경 점만 효율적으로 업데이트합니다.
    - 렌더링 효율성을 극대화하여 성능에 큰 이점을 제공합니다.

5. **한 방향 데이터 흐름**
    - React는 부모 컴포넌트에서 자식 컴포넌트로만 데이터가 전달됩니다(props). 이를 통해 데이터 흐름이 예측 가능하며, 디버깅이 쉽습니다.

### React 주요 개념
#### 1. JSX: JavaScript XML
- JSX는 React 컴포넌트를 작성하는 데 사용하는 문법입니다.
- HTML과 비슷해 보이지만, 실제로는 **JavaScript 코드**로 변환됩니다.
- {} 중괄호 안에는 JavaScript 코드를 쓸 수 있습니다.

**JSX 예제:**
\`\`\` javascript
function Greeting() {
  const name = "React";
  return <p>Hello, {name}!</p>;
}
\`\`\`
#### 2. 컴포넌트와 재사용
- React 컴포넌트는 **함수형** 또는 **클래스형**으로 작성할 수 있습니다.
- 컴포넌트 자체가 하나의 독립적인 블록처럼 동작하며, 재사용이 가능한 특성을 가지고 있습니다.
- 컴포넌트 이름은 항상 대문자로 시작하며, JSX 반환값이 무조건 하나의 루트 요소로 감싸져 있어야 합니다.
\`\`\` javascript
function Post(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <p>{props.body}</p>
    </div>
  );
}

function App() {
  return (
    <>
      <Post title="First Post" body="This is the first post." />
      <Post title="Second Post" body="This is another post." />
    </>
  );
}
\`\`\`
#### 3. Props (속성)
- **Props**는 부모 컴포넌트가 자식 컴포넌트에 값을 전달할 때 사용하는 속성입니다.
- Props는 **읽기 전용**이며, 자식 컴포넌트 내부에서 수정할 수 없습니다.
\`\`\` javascript
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

<Welcome name="John" />;
\`\`\`
#### 4. State (상태)
- **State**는 컴포넌트 내부에서 관리되는 데이터입니다.
- \`useState()\` Hook을 사용해 상태를 생성 및 관리할 수 있습니다.
- 상태가 변하면 React는 해당 컴포넌트를 다시 렌더링합니다.
\`\`\` javascript
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const increase = () => setCount((prev) => prev + 1);

  return (
    <div>
      <p>{count}</p>
      <button onClick={increase}>Increase</button>
    </div>
  );
}
\`\`\`
### React 스타일링
- **Inline Style**
객체 형태로 CSS를 작성합니다. 이때, 스타일 속성은 CamelCase로 기재해야 합니다.
\`\`\` javascript
<div style={{ color: "red", textAlign: "left" }}>Hello!</div>
\`\`\`
- **CSS Modules**
각 컴포넌트에 고유한 class name을 부여하여 간섭을 방지합니다.
\`\`\` javascript
// Button.module.css
.button {
  color: white;
  background-color: blue;
}

// Button.js
import styles from "./Button.module.css";

function Button() {
  return <button className={styles.button}>Click Me</button>;
}
\`\`\`
### React 주요 Hook 정리
#### 1. \`useState\`
- 컴포넌트의 상태를 저장 및 관리합니다.

#### 2. \`useEffect\`
- 컴포넌트의 **부수효과(Side Effect)**를 처리하기 위한 Hook.
- API 호출, DOM 조작, 구독 설정 등의 작업 시 사용됩니다.
\`\`\` javascript
useEffect(() => {
  // 특정 작업 수행
  console.log("컴포넌트 마운트될 때 실행됨");

  return () => {
    console.log("컴포넌트가 언마운트될 때 실행됨");
  };
}, []); // 의존성 배열 비워두면 최초 1회만 실행
\`\`\`
### React 라우팅: React Router Dom
#### 1. 설치 및 설정
\`\`\` bash
npm install react-router-dom
\`\`\`
#### 2. 주요 컴포넌트 소개
- **\`BrowserRouter\`**: 브라우저의 히스토리 API를 활용하여 UI를 제어.
- **\`Route\`**: URL 경로에 따라 표시할 컴포넌트를 정의.
- **\`Link\`**: 페이지 새로고침 없이 클라이언트 라우팅을 제공.
\`\`\` javascript
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

function HomePage() {
  return <h1>Home Page</h1>;
}

function AboutPage() {
  return <h1>About Page</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}
\`\`\`
### React Router 고급 개념
#### 1. RouterProvider와 createBrowserRouter
- \`RouterProvider\`는 React Router의 라우팅 시스템을 선언적 방식으로 제공하며, 더 정교한 설정을 지원합니다.
\`\`\` javascript
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
\`\`\`
#### 2. \`Outlet\` 컴포넌트
- 하위 라우트 컴포넌트를 렌더링할 위치를 지정할 때 사용.
\`\`\` javascript
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <header>Header</header>
      <Outlet />
      <footer>Footer</footer>
    </div>
  );
}
\`\`\`
#### 3. \`useNavigate\`
- 특정 경로로 이동할 때 사용.
\`\`\` javascript
import { useNavigate } from "react-router-dom";

function MyComponent() {
  const navigate = useNavigate();

  const goToAbout = () => {
    navigate("/about");
  };

  return <button onClick={goToAbout}>Go to About</button>;
}
\`\`\`
[React 홈페이지](https://ko.legacy.reactjs.org)
    `,
    excerpt: 'React?',
    tags: ['React.js'],
    author: GLOBAL.NAME,
    coverImage: '/images/js/react.png'
};