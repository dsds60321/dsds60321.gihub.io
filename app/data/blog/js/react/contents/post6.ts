// post1.ts
import type { BlogPost } from '@/app/types/blog';
import {GLOBAL} from "@/app/constants";

export const post6: BlogPost = {
    id: 'react-memo',
    title: 'React 최적화',
    date: '2024-03-02',
    md: `### React는 어떻게 DOM을 업데이트하는가?
#### 1. **Virtual DOM**
React는 **Virtual DOM**(가상 DOM)을 사용하여 성능을 최적화합니다.
- React는 렌더링할 UI를 Virtual DOM에 재구성한 뒤, 이전 Virtual DOM과 비교하여 변경사항만 실제 **DOM에 반영**합니다.
- 이러한 작업은 **Diffing Algorithm**(비교 알고리즘)에 의해 수행됩니다.

#### 2. **Diffing Algorithm**
- Diffing은 **이전 Virtual DOM**과 **새 Virtual DOM**을 비교하여 변경된 부분만 확인하는 작업입니다.
- **Key 속성**은 React가 List를 효율적으로 비교하고, 각 요소의 변경 상태를 파악할 수 있게 돕는 핵심 요소입니다.

#### 3. **Batching Updates**
- React는 상태 업데이트를 **Batching(일괄처리)**하여 한꺼번에 DOM 업데이트를 수행합니다.
- 상태 변화나 이벤트 핸들러가 여러 번 호출되더라도, 한 번에 처리해 성능을 개선합니다.

### React 렌더링 최적화를 위한 주요 기술
### 1. **React.memo**
\`React.memo\`는 컴포넌트의 **불필요한 렌더링을 방지**하는 고차 컴포넌트(Higher-Order Component, HOC)입니다.
#### **사용 목적**
- 부모 컴포넌트가 리렌더링될 때, 자식 컴포넌트의 props가 변화하지 않았을 경우 해당 자식 컴포넌트의 리렌더링을 방지합니다.

#### **코드 예제**
\`\`\` javascript
import React from 'react';

const MyComponent = React.memo(({ value }) => {
  console.log("MyComponent 렌더링!");
  return <p>{value}</p>;
});

const ParentComponent = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>증가</button>
      {/* React.memo로 인해 count 변경 시 MyComponent는 리렌더링되지 않음 */}
      <MyComponent value="Hello, World!" />
    </div>
  );
};

export default ParentComponent;
\`\`\`
#### **유의점**
1. **얕은 비교 방식**: React.memo는 props를 **얕은 비교**만 수행하므로, 객체와 배열 같은 참조형 데이터가 변하지 않아도 새로운 객체로 전달되면 재렌더링됩니다. 이를 방지하려면 \`useCallback\` 또는 \`useMemo\`와 함께 사용해야 합니다.
2. **불필요한 사용 금지**:
    - 모든 컴포넌트에 \`React.memo\`를 사용하는 것은 오히려 성능 저하를 초래할 수 있습니다.
    - 반드시 **성능 병목 구간**에서 사용해야 합니다.

### 2. **useCallback**
\`useCallback\`은 **함수를 메모이제이션**하여 동일한 함수 인스턴스를 유지합니다.
#### **사용 목적**
- 부모 컴포넌트가 리렌더링될 때, 자식 컴포넌트에 전달하는 함수가 계속 새로 생성되는 것을 방지.
- 함수가 props로 전달될 때, 자식 컴포넌트에서 불필요한 리렌더링을 방지.

#### **코드 예제**
\`\`\` javascript
import React, { useState, useCallback } from 'react';
import React.memo from 'react';

const Button = React.memo(({ onClick, label }) => {
  console.log(\`label 버튼 렌더링\`);
  return <button onClick={onClick}>{label}</button>;
});

function App() {
  const [count, setCount] = useState(0);

  // 함수 메모이제이션
  const handleClick = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []); // 의존성 배열: 특정 상태 변경 시 재생성

  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={handleClick} label="증가" />
    </div>
  );
}
\`\`\`
#### **유의점**
1. **의존성 배열 관리**:
    - 의존성 배열은 반드시 명확하게 작성되어야 합니다.
    - 의존하는 상태를 빠뜨리면 **예기치 않은 동작**이 발생합니다.

2. **필요한 경우에만 사용**:
    - 모든 함수를 \`useCallback\`으로 감싸는 것은 불필요합니다.
    - 함수 메모이제이션으로 인한 추가적인 메모리 사용과 관리 비용이 발생할 수 있습니다.

### 3. **useMemo**
\`useMemo\`는 **값의 계산 결과를 메모이제이션**하는 데 사용됩니다.
컴포넌트가 리렌더링될 때마다 비용이 큰 연산을 다시 수행하지 않고 기존 계산 값을 재사용합니다.
#### **사용 목적**
- 연산 비용이 큰 작업의 결과를 캐싱하여 성능 저하 방지.
- 값의 메모이제이션을 통해 불필요한 계산 회피.

#### **코드 예제**
\`\`\` javascript
import React, { useState, useMemo } from 'react';

function ExpensiveComponent({ num }) {
  const computeExpensiveValue = (num) => {
    console.log("비용이 큰 연산 수행...");
    return num * 2; // 예시 계산
  };

  // useMemo를 사용한 최적화
  const computedValue = useMemo(() => computeExpensiveValue(num), [num]);

  return <div>계산 결과: {computedValue}</div>;
}

function App() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(1);

  return (
    <div>
      <ExpensiveComponent num={value} />
      <button onClick={() => setValue((prev) => prev + 1)}>값 변경</button>
      <button onClick={() => setCount((prev) => prev + 1)}>카운트 변경</button>
      <p>Count: {count}</p>
    </div>
  );
}

export default App;
\`\`\`
#### **유의점**
1. **비용이 큰 계산에만 사용**:
    - 단순한 연산이나 빈번하지 않은 연산에서는 굳이 사용할 필요가 없습니다.

2. **객체와 배열의 참조 동일성 유지**:
    - useMemo는 객체나 배열의 동일성(referential equality)을 보장하므로, React.memo와 함께 사용 시 유용합니다.

### 4. **Key 속성의 역할**
React는 **Key**를 기반으로 리스트에서 개별 요소를 식별합니다.
Key는 React의 **Diffing Algorithm**이 어떤 요소가 변경, 추가 또는 삭제되었는지 파악하는 데 도와줍니다.
#### **Key를 설정하는 이유**
1. **효율적인 리스트 업데이트**:
    - Key를 사용하면 React가 Virtual DOM과 실제 DOM 간의 변경점을 효율적으로 계산합니다.

2. **불필요한 리렌더링 방지**:
    - React는 Key를 사용하여 변하지 않는 요소를 재사용하므로 성능 최적화가 가능합니다.

#### **Key 사용 예제**
\`\`\` javascript
function List({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li> // 고유한 ID를 Key로 사용
      ))}
    </ul>
  );
}
\`\`\`
#### **주의사항**
1. **고유 ID 사용**:
    - Key 값은 그룹 내에서 고유해야 합니다. 데이터베이스에서 제공하는 ID 값이 적절합니다.

2. **Index 사용 지양**:
    - 배열의 Index를 Key로 사용하면 요소의 순서가 바뀌거나 추가/삭제 시 올바르게 작동하지 않을 수 있습니다.

### 최적화 요약

| 최적화 방법 | 사용 목적 | 주요 특징 |
| --- | --- | --- |
| **React.memo** | 불필요한 하위 컴포넌트의 리렌더링 방지 | Props 변경 시에만 재렌더링 |
| **useCallback** | 함수 메모이제이션 | 동일한 함수 참조를 유지 |
| **useMemo** | 계산 결과 메모이제이션 | 복잡한 계산 로직의 캐싱 |
| **Key 속성** | 리스트 항목 업데이트 효율화 | 고유한 Key로 변경된 항목 정확히 파악 |

[React 홈페이지](https://ko.legacy.reactjs.org)
    `,
    excerpt: 'React 최적화',
    tags: ['React.js', 'useMemo', 'useCallback'],
    author: GLOBAL.NAME,
    coverImage: '/images/js/react.png'
};