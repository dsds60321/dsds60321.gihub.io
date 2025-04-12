// post1.ts
import type { BlogPost } from '@/app/types/blog';
import {GLOBAL} from "@/app/constants";

export const post2: BlogPost = {
    id: 'concurrent-exception',
    title: 'ConcurrentModificationException',
    date: '2023-12-15',
    md: `
    

# Java에서 ConcurrentModificationException 이해하기: Stream 사용 시 주의점

Java 개발을 하다 보면 흔히 마주치게 되는 예외 중 하나가 \`ConcurrentModificationException\`입니다. 특히 Stream API를 활용할 때 이 예외가 자주 발생하는데, 오늘은 이 예외가 발생하는 원인과 해결 방법을 심층적으로 알아보겠습니다.

## ConcurrentModificationException이란?

\`ConcurrentModificationException\`은 컬렉션을 순회하는 도중에 해당 컬렉션의 구조가 변경될 때 발생하는 예외입니다. 주로 반복자(Iterator)를 사용하거나 Stream API를 통해 컬렉션을 처리하는 과정에서 원본 컬렉션을 수정하면 발생합니다.

## Stream에서 발생하는 예시

다음은 Stream API를 사용하면서 흔히 발생하는 \`ConcurrentModificationException\` 사례입니다:

\`\`\`java
List<String> fruits = new ArrayList<>(Arrays.asList("사과", "바나나", "체리", "아보카도"));

// 잘못된 방식: Stream 처리 중 원본 컬렉션 수정
fruits.stream()
    .filter(fruit -> fruit.startsWith("아"))
    .forEach(fruits::remove);  // 예외 발생!
\`\`\`

위 코드에서는 Stream의 \`forEach\` 단계에서 원본 컬렉션인 \`fruits\`를 직접 수정하려고 시도하기 때문에 예외가 발생합니다. Stream은 내부적으로 Iterator를 사용하는데, 이 Iterator가 컬렉션을 순회하는 도중에 컬렉션의 구조가 변경되면 안전장치가 작동하여 예외를 발생시킵니다.

## 해결 방법 1: 중간 결과 활용하기

가장 간단한 해결 방법은 Stream 연산의 결과를 새로운 컬렉션으로 수집한 후, 원본 컬렉션을 수정하는 것입니다:

\`\`\`java
List<String> fruits = new ArrayList<>(Arrays.asList("사과", "바나나", "체리", "아보카도"));

// 올바른 방식: 중간 결과를 활용하여 원본 컬렉션 수정
List<String> fruitsToRemove = fruits.stream()
    .filter(fruit -> fruit.startsWith("아"))
    .collect(Collectors.toList());

fruits.removeAll(fruitsToRemove);
\`\`\`

이 방식에서는 Stream 연산이 완료된 후 원본 컬렉션을 수정하므로 예외가 발생하지 않습니다.

## 해결 방법 2: 안전한 컬렉션 사용하기

\`ConcurrentHashMap\`이나 \`CopyOnWriteArrayList\`와 같은 스레드 안전(thread-safe) 컬렉션을 사용하면 동시 수정 문제를 해결할 수 있습니다:

\`\`\`java
List<String> fruits = new CopyOnWriteArrayList<>(Arrays.asList("사과", "바나나", "체리", "아보카도"));

// CopyOnWriteArrayList는 순회 중 수정이 안전함
fruits.stream()
    .filter(fruit -> fruit.startsWith("아"))
    .forEach(fruits::remove);  // 안전하게 동작!
\`\`\`

\`CopyOnWriteArrayList\`는 요소를 수정할 때마다 내부적으로 배열을 복사하기 때문에 반복 중 수정이 안전합니다. 다만, 큰 컬렉션에서는 성능 문제가 발생할 수 있으니 주의해야 합니다.

## 해결 방법 3: 전통적인 for 루프 사용하기

가장 확실한 방법 중 하나는 인덱스 기반의 전통적인 for 루프를 사용하는 것입니다:

\`\`\`java
List<String> fruits = new ArrayList<>(Arrays.asList("사과", "바나나", "체리", "아보카도"));

// 인덱스 기반 for 루프를 사용하여 안전하게 요소 제거
for (int i = 0; i < fruits.size(); i++) {
    if (fruits.get(i).startsWith("아")) {
        fruits.remove(i);
        i--;  // 인덱스 조정 필수!
    }
}
\`\`\`

이 방식에서는 \`i--\`를 통해 요소를 제거한 후 인덱스를 조정하는 것이 매우 중요합니다. 그렇지 않으면 요소를 건너뛰는 문제가 발생할 수 있습니다.

## 해결 방법 4: Iterator의 remove() 메서드 활용하기

Iterator를 직접 사용하면서 그 안에서 제공하는 \`remove()\` 메서드를 활용하는 것도 좋은 방법입니다:

\`\`\`java
List<String> fruits = new ArrayList<>(Arrays.asList("사과", "바나나", "체리", "아보카도"));

Iterator<String> iterator = fruits.iterator();
while (iterator.hasNext()) {
    String fruit = iterator.next();
    if (fruit.startsWith("아")) {
        iterator.remove();  // 안전한 제거 방법
    }
}
\`\`\`

Iterator의 \`remove()\` 메서드는 컬렉션의 현재 요소를 안전하게 제거할 수 있도록 설계되었습니다.

## 해결 방법 5: removeIf() 메서드 활용하기

Java 8부터는 \`Collection\` 인터페이스에 \`removeIf()\` 메서드가 추가되었습니다. 이 메서드는 Predicate를 받아 조건에 맞는 요소를 안전하게 제거합니다:

\`\`\`java
List<String> fruits = new ArrayList<>(Arrays.asList("사과", "바나나", "체리", "아보카도"));

// removeIf 메서드로 간결하게 처리
fruits.removeIf(fruit -> fruit.startsWith("아"));
\`\`\`

이 방식은 코드가 간결하면서도 \`ConcurrentModificationException\`을 방지할 수 있어 매우 유용합니다.

## 성능과 가독성 비교

각 해결 방법의 성능과 가독성을 비교해보면:

| 방식 | 성능 | 가독성 | 안전성 |
|------|------|--------|--------|
| 중간 결과 활용 | 중간 (메모리 사용 증가) | 좋음 | 매우 좋음 |
| 안전한 컬렉션 | 낮음 (큰 컬렉션에서) | 좋음 | 매우 좋음 |
| for 루프 | 좋음 | 보통 | 좋음 (인덱스 관리 필요) |
| Iterator의 remove() | 좋음 | 보통 | 좋음 |
| removeIf() | 매우 좋음 | 매우 좋음 | 매우 좋음 |

## 결론

Stream API는 Java에서 컬렉션을 처리하는 강력한 도구이지만, 부주의하게 사용하면 \`ConcurrentModificationException\`과 같은 예외에 직면할 수 있습니다. 이러한 예외를 방지하는 가장 좋은 방법은:

1. Stream 처리 중에는 원본 컬렉션을 수정하지 않기
2. 필요한 경우 중간 결과를 새로운 컬렉션으로 수집한 후 원본 컬렉션 수정하기
3. Java 8 이상에서는 \`removeIf()\`와 같은 안전한 메서드 활용하기

이러한 원칙을 지키면 Stream API의 장점을 충분히 활용하면서도 예외 없이 안정적인 코드를 작성할 수 있습니다.
    `,
    excerpt: 'ConcurrentModificationException 이해하기',
    tags: ['java', 'stream'],
    author: GLOBAL.NAME,
    coverImage: '/images/java/java.jpg'
};