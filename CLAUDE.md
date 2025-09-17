# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 코드를 작업할 때 참고할 수 있는 가이드를 제공합니다.

앞으로 답변하는 모든 언어의 기본은 한국어로 대답해줘

## 프로젝트 개요

Story Dict는 "그거 이름이 뭐지?" 또는 "이 현상에 대한 단어가 뭐지?" 같은 질문에 답을 줄 수 있는 커뮤니티 서비스입니다. Turborepo를 사용한 모던한 모노레포 아키텍처로 구축되었습니다.

**한국어 프로젝트:** 모든 문서, 주석, 사용자 대면 콘텐츠는 한국어로 작성됩니다.

## 아키텍처

### 모노레포 구조

- **Turborepo**와 pnpm workspaces
- **프론트엔드:** `apps/fe/`의 Next.js 14 앱
- **백엔드:** `apps/be/`의 NestJS API
- **공유 패키지:** `packages/` 디렉토리 내
  - `@sd/db` - Prisma 데이터베이스 클라이언트 및 마이그레이션
  - `@sd/ui` - 공유 UI 컴포넌트 (Shadcn/ui 기반)
  - `@sd/utils` - 공유 유틸리티 함수
  - `@sd/tailwind-config` - 공유 Tailwind 설정
  - `@sd/typescript-config` - 공유 TypeScript 설정
  - `@sd/eslint-config` - 공유 ESLint 설정

### 백엔드 아키텍처 (NestJS)

- **모듈식 구조**와 버전별 API (`v0/`, `v1/`)
- **인증:** Google, Kakao, local 전략을 사용하는 Passport.js
- **데이터베이스:** 세션 기반 인증을 사용하는 Prisma ORM
- **파일 업로드:** presigned URL을 사용하는 AWS S3
- **API 구조:**
  - `/apis/v1/auth/` - 인증 엔드포인트
  - `/apis/v1/users/` - 사용자 관리
  - `/apis/v1/stories/` - 핵심 스토리 기능
  - `/apis/v1/stories/comments/` - 댓글 시스템
  - `/apis/v1/stories/*/reactions/` - 스토리/댓글 반응 시스템
  - `/apis/v1/images/` - 이미지 업로드 관리

### 프론트엔드 아키텍처 (Next.js 14)

- **App Router**와 TypeScript
- **상태 관리:** 서버 상태를 위한 TanStack Query
- **폼:** Zod 검증을 사용하는 React Hook Form
- **스타일링:** Shadcn/ui 컴포넌트를 사용하는 TailwindCSS
- **테마:** next-themes를 통한 다크/라이트 모드 지원
- **API 통합:** 백엔드에서 생성된 OpenAPI 타입

## 명령어

### 개발

```bash
# 프론트엔드와 백엔드 모두 개발 모드로 시작
pnpm dev

# 개별 앱 시작
pnpm be:dev    # 백엔드만 (포트는 가변)
pnpm fe:dev    # 프론트엔드만 (포트 9000)

# 데이터베이스 작업
pnpm db:generate  # Prisma 클라이언트 생성
pnpm db:push     # 스키마를 데이터베이스에 푸시
pnpm db:studio   # Prisma Studio 열기
pnpm db:migrate  # 마이그레이션 생성 및 실행
pnpm db:seed     # 테스트 데이터로 데이터베이스 시드
```

### 빌드 & 프로덕션

```bash
# 모든 앱 빌드
pnpm build

# 개별 앱 빌드
pnpm be:build
pnpm fe:build

# 프로덕션 서버 시작
pnpm start:prod
```

### 코드 품질

```bash
# 모든 패키지 린트
pnpm lint

# 코드 포맷팅
pnpm format

# 타입 체크 (특정 앱 디렉토리에서 실행)
cd apps/be && pnpm type-check
cd apps/fe && pnpm type-check
```

### 테스트

```bash
# 백엔드 테스트 (apps/be/에서)
pnpm test           # 단위 테스트
pnpm test:watch     # 감시 모드
pnpm test:cov       # 커버리지
pnpm test:e2e       # End-to-end 테스트
```

### API 개발

```bash
# 프론트엔드용 OpenAPI 타입 생성
pnpm openapi:generate
```

### Docker & 배포

```bash
# Docker 시스템 정리
pnpm docker:clean

# Docker Compose로 시작
pnpm docker:start

# 배포 (이미지 빌드 및 푸시)
pnpm docker:deploy
```

### 유지보수

```bash
# node_modules, .next, .turbo 정리 후 재설치
pnpm clean
```

## 중요 사항

### 데이터베이스 의존성

- 스키마 변경 후 항상 `pnpm db:generate` 실행
- 애플리케이션 빌드 전에 데이터베이스 작업이 완료되어야 함
- Turbo가 의존성 순서를 자동으로 처리

### 환경 설정

- 환경 파일: `.env.development`, `.env.production`
- 백엔드는 `NODE_ENV`에 따라 환경을 로드
- 프론트엔드는 Next.js 환경 처리 방식 사용

### 경로 별칭

- 백엔드는 내부 import에 `#be/` 접두사 사용
- 프론트엔드는 내부 import에 `#fe/` 접두사 사용
- 공유 패키지는 `@sd/` 워크스페이스 네임스페이스 사용

### 개발 워크플로우

1. `packages/database/`에서 데이터베이스 스키마 변경
2. `pnpm db:generate`를 실행하여 Prisma 클라이언트 업데이트
3. `apps/be/src/apis/`에서 백엔드 서비스 업데이트
4. `pnpm openapi:generate`를 실행하여 프론트엔드 타입 업데이트
5. `apps/fe/src/`에서 프론트엔드 컴포넌트 업데이트

### 한국어 지원

- 모든 사용자 대면 콘텐츠는 한국어
- 주석과 문서도 한국어일 수 있음
- 새로운 기능에서 한국어 일관성 유지
