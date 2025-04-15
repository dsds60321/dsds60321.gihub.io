// post1.ts
import type { BlogPost } from '@/app/types/blog';
import {GLOBAL} from "@/app/constants";

export const post3: BlogPost = {
    id: 'react-custom-hook',
    title: 'Custom Hook이란?',
    date: '2024-02-27',
    md: `### React Custom Hook
React에서 **Custom Hook(사용자 정의 훅)**은 React의 내장 Hook(\`useState\`, \`useEffect\`, \`useContext\`, 등)을 조합하여 재사용 가능한 로직을 캡슐화한 함수입니다.
Custom Hook은 주로 공통으로 사용하는 상태 로직을 분리하여 코드의 재사용성과 유지 보수성을 높이는 데 사용됩니다. Custom Hook은 일반 훅과 동일한 규칙과 방식으로 동작하며, React 컴포넌트에서 호출될 때 모든 Hook 기능을 사용할 수 있습니다.
### Custom Hook을 사용하는 이유
1. **로직의 재사용**
    - 여러 컴포넌트가 동일한 비즈니스 로직(State 관리, 데이터 가져오기 등)을 필요로 하는 경우 로직을 Custom Hook으로 분리하여 중복 코드를 줄일 수 있습니다.
    - 예: 데이터 패칭 로직, 폼 상태 관리, 모달 상태 관리 등.

2. **관심사의 분리**
    - 상태 관리와 비즈니스 로직을 컴포넌트에서 분리하여 코드 가독성을 향상시킵니다.
    - 컴포넌트는 UI를 정의하는 데 더 집중하고, 로직은 Hook으로 분리됩니다.

3. **상태와 로직 공유**
    - Custom Hook을 사용해 컴포넌트 간에 상태와 관련된 로직을 쉽게 공유할 수 있습니다.

4. **더 쉬운 테스트와 유지보수**
    - 상태와 로직을 Custom Hook으로 분리함으로써 테스트가 간단해지고, 로직의 변경이 더 쉬워집니다.

### Custom Hook의 규칙 (Rules of Hooks)
Custom Hook은 기존 React Hook을 기반으로 하기 때문에, React Hook의 규칙을 그대로 따릅니다.
#### 1. **"use"로 시작해야 함**
- Custom Hook의 이름은 반드시 \`"use"\`로 시작해야 React가 이를 훅으로 인식합니다.
- 예: \`useCounter\`, \`useFetch\`, \`useDebounce\`


> **이유**: React는 "use"로 시작하는 함수만을 Hook으로 간주하기 때문에, IDE 또는 ESLint가 React Hook의 규칙을 검증하거나 최적화할 수 있습니다.
>
\`\`\` javascript
// 올바른 예
function useCustomHook() {
  const data = "Sample Hook Data";
  return data;
}
\`\`\`
#### 2. **최상위 레벨에서만 호출해야 함**
- Hook은 반복문, 조건문, 중첩 함수 내에서 호출해서는 안 됩니다.
- React는 **Hook이 호출되는 순서**를 기준으로 상태를 관리하는데, 호출 순서가 달라지면 React가 상태를 제대로 관리할 수 없습니다.
\`\`\` javascript
// 잘못된 예: 조건문 안에서 훅 호출
function App() {
  if (someCondition) {
    const [state, setState] = useState(0); // 오류 발생
  }
}
\`\`\`
#### 3. **React 함수 내에서만 호출**
- Hook은 **React 함수 컴포넌트** 또는 **다른 Custom Hook** 내에서만 호출되어야 합니다.
- 일반 JavaScript 함수에서 Hook을 호출하면 레퍼런스나 상태 관리가 제대로 동작하지 않습니다.

### Custom Hook을 만드는 패턴
Custom Hook은 React의 상태 관리 훅(\`useState\`, \`useReducer\` 등)과 부수효과 훅(\`useEffect\`, \`useMemo\`) 등을 활용하여 컴포넌트 간 로직을 캡슐화합니다.
#### Custom Hook 구조:
1. React 내장 훅(\`useState\`, \`useEffect\`) 또는 다른 Custom Hook을 호출.
2. 상태와 이를 제어하는 함수들을 작성.
3. 필요한 값을 반환하여 컴포넌트에서 사용.

#### Custom Hook 예제:
\`useCounter\`라는 Custom Hook을 만들고, 이를 재사용하는 컴포넌트를 작성합니다.
\`\`\` javascript
import { useState } from "react";

// 1. Custom Hook 정의
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}

// 2. Custom Hook 사용
export default function CounterComponent() {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div>
      <h1>Custom Hook Example</h1>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
\`\`\`
### Custom Hook 활용 사례
#### 1. **데이터 패칭 (Fetching Data)**
API 요청 로직을 Custom Hook으로 작성하면 코드의 재사용성을 높일 수 있습니다.
\`\`\` javascript
import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error fetching data");
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [url]);

  return { data, isLoading, error };
}
\`\`\`
**사용:**
\`\`\` javascript
function App() {
  const { data, isLoading, error } = useFetch("https://api.example.com/data");

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return <div>{JSON.stringify(data)}</div>;
}
\`\`\`
#### 2. **Form 상태 관리 (Form Management)**
\`\`\` javascript
import { useState } from "react";

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => setValues(initialValues);

  return {
    values,
    handleInputChange,
    resetForm,
  };
}
\`\`\`
**사용:**
\`\`\` javascript
function FormComponent() {
  const { values, handleInputChange, resetForm } = useForm({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form values:", values);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="username"
        value={values.username}
        onChange={handleInputChange}
        placeholder="Username"
      />
      <input
        name="password"
        type="password"
        value={values.password}
        onChange={handleInputChange}
        placeholder="Password"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
\`\`\`
### Custom Hook으로 전역 상태 관리
Custom Hook과 Context API를 조합하면 전역 상태 관리도 간단하게 구현할 수 있습니다.
\`useContext\`와 \`createContext\`를 활용하여 **전역 상태를 공유**할 수 있습니다.
\`\`\` javascript
import React, { createContext, useContext, useState } from 'react';

const CounterContext = createContext();

export function CounterProvider({ children }) {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);

  return (
    <CounterContext.Provider value={{ count, increment, decrement }}>
      {children}
    </CounterContext.Provider>
  );
}

export function useCounter() {
  return useContext(CounterContext);
}
\`\`\`
**Usage:**
\`\`\` javascript
// App.js
import { CounterProvider, useCounter } from './useCounter';

function CounterComponent() {
  const { count, increment, decrement } = useCounter();
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

export default function App() {
  return (
    <CounterProvider>
      <CounterComponent />
    </CounterProvider>
  );
}
\`\`\`
### Custom Hook의 장점
1. **재사용성**
    - 컴포넌트 간의 반복적인 로직을 Custom Hook으로 묶을 수 있습니다.

2. **코드 가독성**
    - 관심사를 분리하여 각 컴포넌트의 역할을 명확히 할 수 있습니다.

3. **단위 테스트 용이**
    - Custom Hook은 독립적인 함수이기 때문에 테스팅이 쉽습니다.

4. **처리 간소화**
    - 복잡한 비즈니스 로직을 Custom Hook으로 옮기면 컴포넌트는 UI와 상호작용만 처리하게 됩니다.
[React 홈페이지](https://ko.legacy.reactjs.org)
    `,
    excerpt: 'CustomHook?',
    tags: ['React.js', 'custom hook'],
    author: GLOBAL.NAME,
    coverImage: '/images/js/react.png'
};