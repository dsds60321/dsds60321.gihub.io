// post1.ts
import type { BlogPost } from '@/app/types/blog';
import {GLOBAL} from "@/app/constants";

export const post2: BlogPost = {
    id: 'db-lock',
    title: '데이터베이스 Lock 종류와 문제',
    date: '2024-04-02',
    md: `### 데이터베이스 Lock의 종류와 문제점
* 데이터베이스에서 **Lock(잠금)**은 데이터의 **일관성**과 **무결성**을 보장하기 위한 필수적인 메커니즘입니다. 트랜잭션들이 동시에 데이터를 처리하는 과정에서 데이터 오류(동시성 문제)가 발생하지 않도록 Lock을 사용합니다. 하지만 Lock은 잘못 사용할 경우 성능 저하 및 데드락과 같은 문제를 초래할 수 있습니다.
---
### Lock의 종류
#### 1. 공유 Lock (Shared Lock, S-Lock)
- **설명**: 공유 Lock은 데이터를 **읽기 전용**으로 사용할 때 걸리는 Lock입니다. 즉, 특정 데이터에 공유 Lock이 걸려있다면 여러 트랜잭션이 동시에 해당 데이터를 읽을 수 있습니다.
그러나, **공유 Lock이 걸린 데이터는 수정이 불가능**합니다.
- **사용 사례**: 데이터베이스의 트랜잭션들이 동일한 데이터를 읽으면서도 동시성을 확보해야 할 때 사용합니다.


> 💡 **예시**:
> 온라인 서점에서 같은 책에 대한 재고를 여러 사용자가 동시에 조회할 수 있도록 허용하지만, 재고 수량을 변경하는 작업은 다른 Lock 전략에 따라 제한됩니다.
> 

#### 2. 배타 Lock (Exclusive Lock, X-Lock)
- **설명**: 배타 Lock은 데이터를 **수정하거나 작성(쓰기)**할 때 필요한 Lock으로, **Lock을 점유한 트랜잭션만 데이터에 접근 가능**합니다. 배타 Lock이 설정된 데이터는 다른 트랜잭션이 해당 데이터를 읽거나 수정할 수도 없습니다.
- **사용 사례**: 데이터의 **일관성**을 보장하기 위해 특정 트랜잭션이 데이터를 독점적으로 사용해야 하는 경우 사용됩니다.


> 💡 **예시**:
> 쇼핑몰에서 특정 사용자가 결제 중인 장바구니 데이터가 실시간으로 수정되지 않도록 막아야 하는 경우.
> 

#### 3. 의도 Lock (Intention Lock)
- **설명**: 의도 Lock은 다중 계층의 데이터를 Locking할 때, **계층적 Locking 구조를 효율적으로 관리하기 위해 도입된 메커니즘**입니다. 특정 데이터 계층(예: 행(Row))에 Lock을 설정하기 전에, 해당 데이터의 상위 레벨(예: 테이블 또는 페이지)에 의도 Lock을 설정합니다.
이를 통해 다른 트랜잭션이 해당 계층에 비일관적인 Lock을 설정하는 것을 방지합니다.
- **사용 사례**: 계층적 데이터베이스 구조(테이블 > 페이지 > 행)에서 Lock 충돌 방지, 데드락 예방 등을 위해 사용됩니다.


> 💡 **예시**:
> 특정 행(Row)에 배타 Lock을 설정하려고 할 때, 트랜잭션은 먼저 테이블과 페이지에 의도 Lock을 선언해야 합니다. 이를 통해 다른 트랜잭션이 상위 구조를 잠그는 것을 막아 작업 효율성을 높입니다.
> 

### Lock과 관련된 문제점
Lock은 데이터의 무결성과 동시성을 유지하는 데 중요하지만, 잘못된 사용이나 관리 부족으로 인해 특정한 문제들이 발생할 수 있습니다.
#### 1. 데드락 (Deadlock)
- **설명**: 두 개 이상의 트랜잭션이 서로의 Lock을 기다리는 상태입니다. 이로 인해 어떠한 트랜잭션도 작업을 진행할 수 없게 됩니다.
- **예시**:
    - 트랜잭션 A는 테이블 **A의 Row1**에 대한 Lock을, 트랜잭션 B는 테이블 **A의 Row2**에 대한 Lock을 보유한 상태에서, 서로가 점유한 Lock을 요청하는 경우 데드락 상태가 발생합니다.

- **해결 방법**:
    - 트랜잭션의 Locking 순서를 일관되게 유지(예: 항상 동일한 순서대로 Lock 요청)
    - 타임아웃 설정을 통해 데드락 감지 및 회복

#### 2. 성능 저하
- **설명**: **Lock의 과도한 사용** 또는 잘못된 Lock 전략은 데이터베이스 시스템의 성능을 크게 저하시킬 수 있습니다. 특히, 대규모 트랜잭션이나 다중 사용자가 데이터에 동시 접근하는 환경에서 이러한 문제가 심각하게 나타납니다.
- **대표적인 원인**:
    - 불필요하게 대량의 데이터를 잠그는 경우(예: 테이블 Lock 대신 행 Lock 사용 가능 시에도 테이블 Lock 사용)
    - 긴 트랜잭션 실행 시간으로 Lock의 점유 기간이 길어지는 경우
    - Lock 대기가 길어지는 상황(병목현상)

### Lock 관리의 모범 사례
1. **적절한 Lock 범위와 수준 지정**:
불필요한 Lock 확장을 방지하고, 필요한 최소 수준(테이블 대신 행 Lock 등)으로 설정합니다.
2. **짧은 트랜잭션 실행**:
트랜잭션 실행 시간을 최소화하여 Lock 점유 시간을 줄입니다.
3. **트랜잭션 커밋을 신속히 수행**:
Lock 해제가 트랜잭션 커밋 후 이루어지므로, 트랜잭션 커밋 또는 롤백을 더 빠르게 수행하도록 설계합니다.
4. **데드락 회피 & 감지 전략 도입**:
타임아웃 설정 및 Lock 순서 일관성 유지 등의 방식을 통해 데드락 발생을 방지합니다.
    `,
    excerpt: '데이터베이스 Lock',
    tags: ['db','db-lock', 'deadlock', 'mysql'],
    author: GLOBAL.NAME
};