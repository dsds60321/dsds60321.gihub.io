// post1.ts
import { BlogPost } from '@/app/types/blog';

export const post2: BlogPost = {
    id: 'react-components',
    title: 'React 컴포넌트 만들기',
    date: '2024-06-01',
    content: `
      <p>React는 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리입니다...</p>
      <h2>컴포넌트 만들기</h2>
      <p>React 컴포넌트는 다음과 같이 작성합니다...</p>
      <pre><code>function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}</code></pre>
    `,
    md: `
# React 컴포넌트 만들기

React는 사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리입니다...

## 컴포넌트 만들기

React 컴포넌트는 다음과 같이 작성합니다...

\`\`\`jsx
function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}
\`\`\`
    `,
    excerpt: 'React 컴포넌트를 작성하는 방법에 대한 가이드',
    tags: ['React', 'Components', '프론트엔드'],
    author: '김개발',
    coverImage: '/images/react-components.jpg'
};