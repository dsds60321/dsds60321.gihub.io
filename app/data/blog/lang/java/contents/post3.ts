// post1.ts
import type { BlogPost } from '@/app/types/blog';
import {GLOBAL} from "@/app/constants";

export const post3: BlogPost = {
    id: 'rmi',
    title: 'RMI',
    date: '2024-12-15',
    md: `# RMI

-   원격으로 객체의 메소드를 호출할 수 있게 해주는 API입니다. 이 기술을 사용하면, 한 자바 가상 머신(JVM)에서 실행되고 있는 객체가 다른 JVM에서 실행되고 있는 객체의 메소드를 마치 같은 JVM 안에서 실행되는 것처럼 호출할 수 있습니다. 이를 통해 분산 애플리케이션의 개발이 가능해집니다.
-   Socket 통신을 사용합니다.

### Stub :

-   클라이언트 측에서 사용되는 객체로, 원격 객체의 프록시 역할을 합니다. 클라이언트는 스텁을 통해 원격 메소드를 호출하며, 스텁은 이 호출을 네트워크를 통해 실제 원격 객체로 전달합니다.Skeleton :
-   서버 측에서 사용되던 객체로, RMI 시스템에서는 이제 더 이상 사용되지 않습니다(자바 2 플랫폼의 표준 에디션 5.0부터 제거됨). 과거에는 클라이언트로부터의 원격 호출을 받아서 실제 원격 객체의 메소드를 호출하는 역할을 했습니다.

### 절차

1.  Server는 Registry에 이름을 bind 합니다.
2.  Server는 레지스트리를 호출하여 이름을 원격 개체와 연결(또는 바인딩)합니다.
3.  클라이언트는 서버의 레지스트리에서 해당 이름으로 원격 개체를 찾은 다음 해당 개체에 대한 메서드를 호출
4.  RMI는 자바 객체 직렬화 메커니즘을 사용하여 객체를 전송합니다.

---

### AI rmi 설명

### RMI 서버

-   원격 인터페이스 정의: 서비스를 제공하는 메소드들을 포함하는 인터페이스를 정의합니다. 이 인터페이스는 java.rmi.Remote 인터페이스를 확장하며, 모든 메소드는 RemoteException을 던질 수 있도록 선언해야 합니다.
-   원격 객체 구현: 정의한 원격 인터페이스를 구현하는 클래스(원격 객체)를 만듭니다. 이 클래스는 실제 로직을 수행하고, UnicastRemoteObject 클래스를 상속받아 원격 객체로서의 기능을 갖춥니다.
-   원격 객체 등록: 서버는 구현한 원격 객체를 생성하고 RMI 레지스트리에 등록합니다. 이 때, 고유한 이름을 사용하여 클라이언트가 해당 서비스를 쉽게 찾을 수 있도록 합니다.
-   클라이언트 요청 대기: 서버는 클라이언트의 연결을 기다리고, 요청이 들어오면 해당 원격 메소드를 실행합니다. 실행 결과는 클라이언트에게 네트워크를 통해 전송됩니다.RMI 클라이언트

### RMI 클라이언트

-   원격 인터페이스 취득: 클라이언트는 원격 인터페이스를 사용하여 서버에 정의된 메소드 시그니처를 알 수 있습니다. 이 인터페이스는 클라이언트와 서버가 동일해야 합니다.
-   서비스 조회: 클라이언트는 RMI 레지스트리에서 원격 객체의 참조를 조회합니다. 이는 보통 서버에 대한 IP 주소와 원격 객체가 등록된 이름을 사용하여 이루어집니다.
-   스텁을 통한 원격 메소드 호출: 클라이언트는 조회한 원격 객체의 스텁을 사용하여 서버의 원격 메소드를 호출합니다. 스텁은 클라이언트 측의 대리 객체로서, 네트워크를 통해 서버의 실제 객체와 통신합니다.
-   결과 처리: 호출된 메소드의 처리가 끝나면, 결과는 서버로부터 클라이언트로 반환됩니다. 클라이언트는 이 결과를 받아서 활용하며, 필요한 경우 예외 처리를 수행합니다.

### 서버와 클라이언트 상호작용의 예

-   클라이언트: "안녕하세요, RMI 레지스트리? computePi 서비스를 찾고 있습니다."
-   RMI 레지스트리: "네, 여기 있습니다. 이 스텁을 사용하세요."
-   클라이언트: "감사합니다. (스텁을 통해) computePi 메소드를 호출합니다. 파라미터는 10000입니다."
-   서버 (원격 객체): "요청 받았습니다. 계산을 시작합니다... 완료했습니다. 여기 결과값 π입니다."
-   클라이언트: "결과를 받았습니다. 처리하겠습니다."

> 이러한 과정을 통해 서버와 클라이언트는 네트워크를 통해 마치 같은 시스템 내에서 작동하는 것처럼 원활하게 상호작용합니다. RMI는 이러한 복잡한 네트워크 작업을 추상화하여, 개발자가 마치 로컬 메소드 호출을 하듯이 원격 메소드를 사용할 수 있게 해줍니다.

![RMI 다이어그램](/images/java/rmi.png)

**참고** oracle rmi 설명글 : [https://docs.oracle.com/javase/tutorial/rmi/overview.html](https://docs.oracle.com/javase/tutorial/rmi/overview.html)
    `,
    excerpt: 'RMI',
    tags: ['java', 'rmi'],
    author: GLOBAL.NAME,
    coverImage: '/images/java/rmi.png'
};