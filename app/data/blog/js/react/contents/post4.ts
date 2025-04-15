// post1.ts
import type { BlogPost } from '@/app/types/blog';
import {GLOBAL} from "@/app/constants";

export const post4: BlogPost = {
    id: 'react-router',
    title: 'react-router란?',
    date: '2024-02-29',
    md: `### React Router란 무엇인가?
React Router는 React 애플리케이션에서 **동적 라우팅**을 구현하기 위한 라이브러리입니다.
React 애플리케이션은 SPA(Single Page Application)이기 때문에 페이지가 새로고침 없이도 URL 경로를 변경하고, 경로에 따라 다른 컴포넌트를 렌더링할 수 있게 합니다.
### React Router 주요 특징
1. **URL 기반 네이게이션**: React Router는 브라우저의 URL과 UI를 동기화시킵니다.
2. **SPA 동작**: 서버 요청 없이 브라우저에서 페이지 전환이 가능하며 페이지가 새로고침되지 않습니다.
3. **동적 라우팅 지원**: URL 파라미터, query string 전달 등을 통해 다양한 페이지 동작을 구현.

### 기본 구성 요소
#### 1. **BrowserRouter**
- 브라우저의 \`history API\`를 활용하여 UI와 URL을 동기화합니다.
- 애플리케이션 전체를 감싸며, 라우터의 동작을 제공합니다.
\`\`\` javascript
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes> {/* 라우트 정의 */}</Routes>
    </BrowserRouter>
  );
}
\`\`\`
#### 2. **RouterProvider**
- React Router v6 이상에서 사용할 수 있으며, \`createBrowserRouter\`로 만든 라우터 객체를 앱에 제공하는 컴포넌트입니다.
- 보다 **선언적인 방식**으로 라우트를 작성할 수 있습니다.
\`\`\` javascript
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />, // 에러 페이지
    children: [
      { path: "/", element: <HomePage />, index: true }, // 기본 경로
      { path: "about", element: <AboutPage /> }, // /about 경로
    ],
  },
]);

function Root() {
  return <RouterProvider router={router} />;
}
\`\`\`
#### 3. **Routes**
- 다수의 \`Route\` 컴포넌트를 포함하여 URL 경로에 따라 어떤 컴포넌트를 렌더링할지 정의합니다.

#### 4. **Route**
- 경로와 컴포넌트를 매핑하며, 특정 경로에 방문했을 때 렌더링할 컴포넌트를 정의합니다.
- 컴포넌트에서 URL 동적 파라미터를 제공할 수 있음.
\`\`\` javascript
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/about" element={<AboutPage />} />
  <Route path="/profile/:id" element={<ProfilePage />} />
</Routes>
\`\`\`
### 기타 주요 구성 요소
#### 5. **Link**
- HTML \`<a>\` 태그의 기능을 대체하며, 페이지를 새로고침하지 않고도 SPA 네비게이션을 제공합니다.
\`\`\` javascript
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <Link to="/">홈</Link>
      <Link to="/about">회사소개</Link>
    </nav>
  );
}
\`\`\`
#### 6. **NavLink**
- \`Link\`와 유사하지만, 현재 **경로와 일치할 때(active)** 스타일을 지정하거나 다른 동작을 처리할 수 있습니다.
\`\`\` javascript
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      {/* 현재 URL과 일치하면 isActive에서 true가 반환 됨 */}
      <NavLink 
        to="/"
        className={({ isActive }) => (isActive ? "active-link" : "link")}
        end // "/" 뒤에 추가 경로가 있으면 활성화되지 않음
      >
        홈
      </NavLink>
      <NavLink to="/about">회사소개</NavLink>
    </nav>
  );
}
\`\`\`
#### 7. **Outlet**
- 중첩 라우트에서 **자식 라우트를 렌더링할 위치**를 지정하는 데 사용됩니다. 레이아웃 컴포넌트에서 주로 사용됩니다.
\`\`\` javascript
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <header>헤더</header>
      {/* 아래 위치에 자식 라우트 렌더링 */}
      <main>
        <Outlet />
      </main>
      <footer>푸터</footer>
    </>
  );
}

// 중첩 라우트
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<HomePage />} /> {/* 기본 렌더링 */}
    <Route path="about" element={<AboutPage />} />
  </Route>
</Routes>;
\`\`\`
#### 8. **useParams**
- 동적 라우트의 파라미터 값을 가져옵니다.
- \`useParams\` 훅은 URL 파라미터를 객체 형태로 반환합니다.
\`\`\` javascript
import { useParams } from "react-router-dom";

function ProfilePage() {
  const { id } = useParams(); // URL 파라미터 추출

  return <h1>{\`id님의 프로필 페이지\`}</h1>;
}

// 사용 예시
<Route path="/profile/:id" element={<ProfilePage />} />;
// URL이 /profile/5라면, id 값은 "5"가 됩니다.
\`\`\`
### Error Page 생성 방법
React Router를 사용하면 잘못된 URL 요청에 대해 **에러 페이지**를 쉽게 정의할 수 있습니다.
#### 1. 기본 Error 페이지 설정
\`RouterProvider\`에서 \`errorElement\` 속성을 사용해 에러 페이지를 설정합니다.
\`\`\` javascript
function ErrorPage() {
  return <h1>404 - 페이지를 찾을 수 없습니다.</h1>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />, // 에러 페이지 렌더링
  },
]);
\`\`\`
#### 2. Switch와 Route로 Error 페이지 처리 (v5 문법)
- React Router v5에서는 Switch를 활용하여 에러 페이지를 처리할 수 있습니다.
\`\`\` javascript
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route component={NotFoundPage} /> {/* 모든 경로에 매치되지 않을 경우 */}
      </Switch>
    </Router>
  );
}
\`\`\`
### NavLink의 \`end\` 속성
NavLink는 경로와 정확히 일치하지 않을 경우에도 활성화 상태로 식별되기 때문에, **\`end\` 속성**을 사용하여 루트(end-point) 경로에 대한 제어를 할 수 있습니다.
\`\`\` javascript
<NavLink to="/" end>
  홈
</NavLink>
<NavLink to="/products">
  제품
</NavLink>
\`\`\`
위 설정에서 \`/\`는 홈페이지로, \`/products\`와 \`/products/123\` 같은 경로는 NavLink의 active 상태를 따로 유지합니다.
### Dynamic Routing (동적 파라미터)
React Router는 URL 경로에서 **동적 파라미터**를 받아 처리할 수 있습니다.
#### 1. 동적 라우트 정의
\`\`\` javascript
<Route path="/profile/:userId" element={<UserProfile />} />
\`\`\`
#### 2. useParams로 URL 파라미터 읽기
\`\`\` javascript
import { useParams } from "react-router-dom";

function UserProfile() {
  const { userId } = useParams();

  return <h1>{userId} 사용자의 프로필 페이지</h1>;
}
\`\`\`
### Index Route
- 부모 경로를 방문했을 때 기본으로 렌더링할 컴포넌트를 정의합니다.
- \`index: true\`를 설정하면, 해당 경로에 기본적으로 렌더링될 컴포넌트를 지정할 수 있습니다.
\`\`\` javascript
<Route path="/" element={<Layout />}>
  <Route index element={<HomePage />} /> {/* 기본 렌더링 경로 */}
  <Route path="about" element={<AboutPage />} />
</Route>
\`\`\`
### 구현 예제: React Router 기초
\`\`\` javascript
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  NavLink,
  useParams,
} from "react-router-dom";

const Home = () => <h1>홈 페이지</h1>;
const About = () => <h1>회사 소개</h1>;
const Profile = () => {
  const { userId } = useParams();
  return <h1>{userId}의 프로필 페이지</h1>;
};

const Layout = () => (
  <div>
    <header>
      <NavLink to="/" end>
        홈
      </NavLink>
      <NavLink to="/about">회사 소개</NavLink>
      <NavLink to="/profile/123">프로필</NavLink>
    </header>
    <main>
      <Outlet />
    </main>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "profile/:userId", element: <Profile /> },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;
export default App;
\`\`\`
[React 홈페이지](https://ko.legacy.reactjs.org)
    `,
    excerpt: 'React-router?',
    tags: ['React.js'],
    author: GLOBAL.NAME,
    coverImage: '/images/js/react.png'
};