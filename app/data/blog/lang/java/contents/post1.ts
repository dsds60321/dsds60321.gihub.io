// post1.ts
import type { BlogPost } from '@/app/types/blog';
import {GLOBAL} from "@/app/constants";

export const post1: BlogPost = {
    id: 'jvm',
    title: 'JAVA 구성',
    date: '2023-12-13',
    md: `
    # JAVA

## JVM, JRE, JDK

### JVM (Java Virtual Machine)
- 자바 가상머신으로 자바 바이트코드(.class) 파일을 OS에 특화된 코드로 변환(인터프리터, JIT 컴파일러)하여 실행
- 바이트 코드를 실행하는 구현체입니다.
- JVM 벤더: 오라클, 아마존 등 (구현체)
- 실행 과정: Java 소스 → .class(바이트 코드) → JVM에서 OS에 맞게 코드로 변환

### JRE (Java Runtime Environment)
- 자바 애플리케이션 실행을 위한 배포판
- 실행을 위함이니 당연히 그 안에 JVM이 들어있습니다. (프로퍼티 세팅/리소스)
- 개발 관련 도구는 없습니다. (개발은 JDK가 제공)

### JDK (Java Development Kit)
- 자바 개발에 필요한 도구 모음
- JRE를 포함하며 컴파일러, 디버거 등 개발 도구 제공
- 오라클은 자바 11부터 JDK만 제공하고 JRE를 별도로 제공하지 않습니다.

**계층 구조: JDK > JRE > JVM**

## JVM 구조

![JVM](/images/java/jvm.png "JVM")

### 클래스 로더 시스템
- .class에서 바이트코드를 읽고 메모리에 저장
- 로딩: 클래스를 읽어오는 과정
- 링크: 레퍼런스 연결
- 초기화: static 값 초기화 및 변수에 할당

### 메모리
- 메소드 영역: 클래스 수준의 정보(클래스 이름, 부모 클래스 이름, 메소드, 변수) 저장, 공유 자원
- 힙 영역: 객체를 저장, 공유 자원 (인스턴스)
- 스택 영역: 스레드마다 런타임 스택을 만들고, 그 안에 메소드 호출을 스택 프레임이라는 블록으로 쌓음. 스레드 종료 시 런타임 스택도 사라짐
- PC(Program Counter) 레지스터: 스레드마다 스레드 내 현재 실행할 스택 프레임을 가리키는 포인터
- 네이티브 메소드 스택: 네이티브 메소드 실행 시 사용하는 스택

### 실행 엔진
- 인터프리터: 바이트 코드를 한 줄씩 실행
- JIT 컴파일러: 인터프리터 효율을 높이기 위해 사용. 반복되는 코드를 모두 네이티브 코드로 바꿈. 변경된 네이티브 코드를 사용
- GC(Garbage Collector): 참조되지 않는 객체를 정리

## 클래스 로딩 과정
클래스 로딩은 로딩 → 링크 → 초기화 순으로 진행됩니다.

### 로딩
- 클래스 로더가 .class 파일 바이너리 데이터를 만들고 메소드 영역에 저장
  - 메소드 영역에 저장되는 데이터:
    - FQCN(Fully Qualified Class Name): 패키지 경로를 포함한 전체 클래스명
    - 클래스, 인터페이스, 이넘, 메소드, 변수 정보
- 로딩이 끝나면 해당 클래스 타입의 Class 객체를 생성하여 힙 영역에 저장

### 클래스 로더
- 클래스 로더는 계층 구조로 기본적으로 3가지 제공:
  - 부트스트랩 클래스 로더: JAVA_HOME\lib에 있는 코어 자바 API, 최상위 우선순위
  - 플랫폼 클래스 로더: JAVA_HOME\lib\ext 폴더 또는 java.ext.dirs 시스템 변수 위치의 클래스를 읽음
  - 애플리케이션 클래스 로더: 애플리케이션 클래스패스(-classpath 옵션 또는 환경변수 값에 해당 위치)의 클래스를 읽음

### 링크
링크는 Verify, Prepare, Resolve로 나뉩니다:
- 검증(Verify): .class 파일이 유효한지 체크
- 준비(Prepare): 클래스 변수(static 변수)와 기본값에 필요한 메모리 할당
- 해결(Resolve): 심볼릭 메모리 레퍼런스를 메서드 영역에 있는 실제 레퍼런스와 교체

### 초기화
- static 변수의 값을 할당 (static 블록이 있을 시 이때 실행)
    `,
    excerpt: 'JAVA 구성',
    tags: ['java', 'jvm'],
    author: GLOBAL.NAME,
    coverImage: '/images/java/jvm.png'
};