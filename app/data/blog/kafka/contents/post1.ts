// post1.ts
import type { BlogPost } from '@/app/types/blog';
import {GLOBAL} from "@/app/constants";

export const post1: BlogPost = {
    id: 'kafka-start',
    title: '[Apache Kafka] Kafka란?',
    date: '2024-06-01',
    md: `
Apache Kafka는 **분산형 스트리밍 플랫폼**으로, 고속 처리, 데이터 일관성, 확장성을 제공하며 실시간 데이터 스트리밍과 이벤트 기반 시스템에서 널리 사용됩니다.

Kafka의 특징과 개념에 대해 작성해보도록 하겠습니다.

---

### **특징**

-   **높은 처리량**: 대규모 데이터 스트림을 초당 수백만 건 이상 처리 가능.
-   **내구성**: 메시지를 디스크에 저장하며, 지정된 보관 기간 동안 데이터 손실 없이 유지.
-   **확장성**: 노드를 추가하여 클러스터 및 파티션을 손쉽게 확장 가능.
-   **실시간 데이터 스트리밍**: 이벤트 기반 아키텍처를 통해 데이터를 실시간으로 처리.
-   **분산 구조**: 분산된 브로커 환경에서 안정성을 제공.
-   **유연성**: 다양한 유형의 데이터 처리(메시지 큐 역할, 스트리밍 데이터 처리 등)를 지원.

Kafka는 데이터 스트리밍이 필수적인 **실시간 채팅 시스템**, **로그 분석**등 **마이크로서비스 간 통신** 등에서 특화된 성능을 발휘합니다.

---

## **주요 개념**

Kafka의 구조는 크게 **토픽(Topic)**, **프로듀서(Producer)**, **컨슈머(Consumer)**, 그리고 **메시지 큐(Message Queue)**와 같은 주요 개념으로 이루어져 있습니다.

### **Topic (토픽)**

Kafka에서 토픽은 데이터를 저장하고 전달하는 **논리적 메시지 스트림 단위**입니다. 데이터는 특정 토픽에 적재되며, 프로듀서는 데이터를 전송하고 컨슈머는 이를 읽어 사용합니다.

-   **특징**:
    -   메시지가 전달되는 "채널"로, 데이터를 주고받는 기본 단위.
    -   각 토픽은 하나 이상의 파티션(Partition)으로 나뉘어 메시지가 분산 저장됨.
    -   토픽의 메시지는 기본적으로 특정 시간 또는 크기 제한에 따라 저장되며(예: 7일), 지나면 삭제됩니다.
-   **파티션(Partition)**:
    -   하나의 토픽은 여러 파티션으로 나누어질 수 있으며, 이는 성능 향상 및 데이터 병렬 처리를 가능하게 합니다.
    -   파티션 내에서는 메시지가 순서대로 저장되지만, 전체 토픽에서는 순서가 보장되지 않을 수 있습니다.
-   **예시**:
    -   "user-activity": 사용자 활동 로그를 수집.
    -   "chat-messages": 실시간 채팅 메시지를 전달.
    -   "order-payments": 전자 상거래에서의 주문 결제 데이터를 저장.

### **Producer (프로듀서)**

프로듀서는 Kafka에서 **데이터를 전송하는 주체**로, 데이터를 특정 토픽으로 전송합니다.

-   **역할**:
    -   데이터를 토픽의 파티션에 적재(전송).
    -   파티션을 효율적으로 분배하여 성능 최적화.
    -   메시지 송신 완료 시 확인(Acknowledgment)을 수신.
-   **동작 방식**:
    -   특정 토픽으로 데이터를 송신.
    -   데이터를 송신할 때 Round-Robin 방식(기본 설정) 또는 키를 기반으로 특정 파티션에 메시지를 할당.
-   **구현 예시**: 전자 상거래 시스템에서 주문 데이터를 "order-topic"으로 전송.

\`\`\`
bin/kafka-console-producer.sh --topic order-topic --bootstrap-server localhost:9092
\`\`\`

### **Consumer (컨슈머)**

컨슈머는 Kafka에서 **데이터를 읽어오는 주체**로, 토픽을 구독(Subscribe)하여 데이터를 처리합니다.

-   **역할**:
    -   Kafka 토픽에서 데이터를 읽고 처리.
    -   컨슈머 그룹 단위로 데이터 병렬 처리 가능(데이터 부하 분산).
    -   메시지의 오프셋(Offset)을 관리하여 상태 추적 가능.
-   **Consumer Group**:
    -   동일한 그룹 ID를 가진 컨슈머들이 하나의 Consumer Group을 형성.
    -   하나의 파티션은 각 그룹 내의 특정 컨슈머에게만 할당됨.
    -   여러 Consumer Group이 동일한 토픽으로부터 독립적으로 데이터를 처리할 수 있음.
-   **구현 예시**: 채팅 메시지를 'chat-topic'에서 읽어오는 Consumer.

\`\`\`
bin/kafka-console-consumer.sh --topic chat-topic --bootstrap-server localhost:9092 --from-beginning
\`\`\`

---

## **Kafka 작동 과정**

Kafka의 기본 동작 과정은 다음과 같습니다: 예시로 chat-topic을 생성해보겠습니다.

1.  **Zookeeper 실행**:
    -   Kafka 클러스터를 관리하며, 브로커 간의 메타데이터와 상태를 유지 관리.  
        실행 명령:

\`\`\`
bin/zookeeper-server-start.sh config/zookeeper.properties
\`\`\`

2.  **Kafka 서버 실행**:
    -   Kafka 브로커가 실행되며 데이터를 저장하고 토픽을 관리. 실행 명령:

\`\`\`
bin/kafka-server-start.sh config/server.properties
\`\`\`

![카프카 실행](/images/kafka/start-sh.png "카프카 실행")

3.  **Topic 생성**:
    -   데이터를 저장하고자 하는 채널을 생성.

\`\`\`
bin/kafka-topics.sh --create --topic chat-topic --bootstrap-server localhost:9092 --replication-factor 1 --partitions 3
\`\`\`

![토픽 생성](/images/kafka/topic-create.png "토픽 생성")

4.  이미 생성된 토픽이 있다면 삭제 :

\`\`\`
bin/kafka-topics.sh --delete --topic chat-topic --bootstrap-server localhost:9092
\`\`\`

5.  **Producer에서 데이터 전송**:
    -   Producer가 메시지를 생성하여 토픽으로 전송.
    -   \`bin/kafka-console-producer.sh --topic chat-topic --bootstrap-server localhost:9092\`
6.  **Consumer에서 메시지 처리**:
    -   구독한 토픽의 메시지를 처리.
    -   \`--from-beginning\`은 특정 Kafka 토픽의 \\*\\*모든 메시지를 읽기 위한 옵션입니다.

\`\`\`
bin/kafka-console-consumer.sh --topic chat-topic --bootstrap-server localhost:9092 --from-beginning
\`\`\`

![데이터 처리](/images/kafka/read.png "데이터 처리")

---

## **장점**

1.  **확장성**: 브로커와 파티션 추가로 처리량을 손쉽게 확장.
2.  **내구성**: 데이터를 디스크에 저장함으로써 안정적인 데이터 전달.
3.  **Flexibility**: 메시지 큐와 Publish/Subscribe 모델의 장점을 결합.
4.  **고성능**: 초당 수백만 건 이상의 메시지를 처리할 수 있는 뛰어난 처리량.

\`\`\`
참고: Spring + Apache Kafka는 Spring 공식홈페이지에 잘 나와있습니다.
\`\`\`

[Spring 공식 문서](https://docs.spring.io/spring-boot/reference/messaging/kafka.html)
    `,
    excerpt: 'Kafka란?',
    tags: ['Kafka'],
    author: GLOBAL.NAME,
    coverImage: '/images/kafka/kafka.png'
};