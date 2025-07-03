# 📚 이야기 일지 프로젝트 스타일 가이드

## 0. 언어 설정
- **모든 리뷰, 코멘트, 제안사항은 한국어로 작성**
- 코드 리뷰 시 기술 용어도 가능한 한 한국어로 번역하여 사용
- 응답 언어: 한국어 (Korean)

---

## 1. 프로젝트 구조

### 1.1 모노레포 구조
```
story-dict/
├── apps/                    # 애플리케이션
│   ├── fe/                 # Next.js 프론트엔드
│   ├── be/                 # NestJS 백엔드
│   └── storybook/          # 스토리북
├── packages/               # 공유 패키지
│   ├── database/          # Prisma 데이터베이스
│   ├── ui/                # shadcn/ui 컴포넌트
│   ├── utils/             # 유틸리티 함수
│   ├── eslint-config/     # ESLint 설정
│   ├── tailwind-config/   # Tailwind CSS 설정
│   └── typescript-config/ # TypeScript 설정
└── .gemini/               # Gemini Code Assist 설정
```

### 1.2 패키지 관리
- **패키지 매니저**: pnpm 사용 (v9.x)
- **워크스페이스**: pnpm workspace 활용
- **의존성 관리**: 루트에서 공통 의존성 관리, 개별 패키지에서 특화 의존성 관리
- **기술 스택**:
  - 프론트엔드: Next.js 15, React 19, TypeScript
  - 백엔드: NestJS, Prisma ORM, PostgreSQL
  - 스타일링: Tailwind CSS v4, shadcn/ui
  - 상태 관리: TanStack Query (React Query)

---

## 2. 브랜치 전략

### 2.1 브랜치 네이밍
- `master`: 프로덕션 브랜치
- `development`: 개발 브랜치
- `feat/기능명`: 새 기능 개발
- `refactor/대상`: 리팩토링
- `hotfix/문제명`: 긴급 수정

### 2.2 브랜치 사용 규칙
- 모든 기능 개발은 `feat/` 브랜치에서 시작
- PR은 `development` → `master` 순서로 진행
- 한국어 브랜치명 허용 (예: `test/테스트`)

---

## 3. 커밋 컨벤션

### 3.1 커밋 메시지 형식
```
깃모지: 한국어 커밋 메시지

예시:
✨: 새로운 스토리 생성 기능 추가
🐛: 사용자 인증 버그 수정
♻️: 스토리 서비스 코드 리팩토링
📝: API 문서 업데이트
```

### 3.2 자주 사용하는 깃모지
- ✨ `:sparkles:` - 새 기능
- 🐛 `:bug:` - 버그 수정
- ♻️ `:recycle:` - 리팩토링
- 📝 `:memo:` - 문서 작성/수정
- 🎨 `:art:` - 코드 구조 개선
- ⚡ `:zap:` - 성능 개선
- 🔒 `:lock:` - 보안 개선

---

## 4. 파일 임포트 규칙

### 4.1 절대 경로 사용
```tsx
// ✅ 좋은 예시 - 절대 경로
import { Button } from "@sd/ui";
import { apis } from "#fe/apis";
import { PrismaService } from "#be/apis/v0/prisma/prisma.service";

// ❌ 나쁜 예시 - 상대 경로 (같은 레벨 제외)
import { Button } from "../../../packages/ui/src/components/Button";
```

### 4.2 경로 별칭 정의
- `@sd/*`: packages 패키지들
- `#fe/*`: apps/fe 내부 경로
- `#be/*`: apps/be 내부 경로

### 4.3 임포트 순서
1. 외부 라이브러리 (React, Next.js 등)
2. 내부 패키지 (@sd/*)
3. 앱 내부 모듈 (#fe/*, #be/*)
4. 상대 경로 임포트 (같은 디렉토리만)

---

## 5. 코딩 스타일

### 5.1 TypeScript 사용
- 모든 파일은 TypeScript로 작성
- `any` 타입 사용 금지 (불가피한 경우 주석으로 사유 명시)
- 인터페이스명은 `I` 접두사 사용하지 않음
- Props 타입은 `Props` 접미사 사용

```tsx
// ✅ 좋은 예시
interface StoryDetailProps {
  storyTitle: string;
}

// ❌ 나쁜 예시
interface IStoryDetailProps {
  storyTitle: string;
}
```

### 5.2 컴포넌트 작성 규칙
- 함수형 컴포넌트 사용
- `React.FC` 타입 명시
- 컴포넌트명은 PascalCase
- 파일명도 PascalCase (컴포넌트와 일치)

```tsx
// ✅ 좋은 예시
const StoryDetail: React.FC<StoryDetailProps> = ({ storyTitle }) => {
  // 컴포넌트 로직
};

export default StoryDetail;
```

### 5.3 훅 사용 규칙
- 커스텀 훅은 `use` 접두사 사용
- 비즈니스 로직은 커스텀 훅으로 분리
- React Query 사용 시 `useSuspenseQuery` 권장

---

## 6. 폴더 구조 및 파일 명명

### 6.1 컴포넌트 구조
- 기능별/섹션별 그룹화를 통한 체계적 관리
- 공통 컴포넌트는 `components/` 루트에 배치
- 페이지별 전용 컴포넌트는 `_components/` 디렉토리 사용

```
components/
├── layouts/               # 레이아웃 컴포넌트
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Sidebar/
├── ui/                   # 기본 UI 컴포넌트 (shadcn/ui 확장)
│   ├── Button.tsx
│   └── Input.tsx
├── customs/              # 프로젝트 전용 공통 컴포넌트
│   ├── SearchDialogButton.tsx
│   └── EmptyAlert.tsx
└── magics/               # 애니메이션/특수 효과 컴포넌트
    └── FadeText.tsx

# 페이지별 컴포넌트 (예시: 스토리 상세 페이지)
app/stories/[title]/_components/
├── Section01/            # 스토리 헤더 섹션
│   ├── StoryReactions.tsx
│   └── StoryReactionPopover.tsx
├── Section02/            # 스토리 내용 섹션
│   └── MarkdownViewer.tsx
├── Section03/            # 댓글 섹션
│   ├── Comment.tsx
│   └── CommentList.tsx
└── StoryDetail.tsx       # 메인 컴포넌트
```

**네이밍 규칙:**
- 컴포넌트 파일명: PascalCase
- 디렉토리명: camelCase 또는 kebab-case
- 섹션 구분 시 Section01, Section02 등 숫자 사용 가능

### 6.2 API 구조 (백엔드)
- 버전별 API 관리를 통한 하위 호환성 보장
- RESTful API 설계 원칙 준수
- 모듈별 분리를 통한 유지보수성 향상

```
apis/
├── v0/                     # 초기 버전 (레거시)
│   ├── ping/              # 헬스체크
│   └── prisma/            # 데이터베이스 서비스
└── v1/                     # 현재 메인 버전
    ├── auth/              # 인증/인가
    │   ├── google/        # 소셜 로그인 전략
    │   ├── kakao/
    │   └── local/
    ├── stories/           # 스토리 관리
    │   ├── dtos/          # 데이터 전송 객체
    │   ├── comments/      # 댓글 시스템
    │   │   ├── dtos/
    │   │   └── reactions/ # 댓글 반응
    │   └── reactions/     # 스토리 반응
    ├── users/             # 사용자 관리
    │   ├── dto/
    │   └── constant/
    └── images/            # 이미지 업로드
        └── dto/
```

**확장 고려사항:**
- v2 API 추가 시 기존 v1과 병행 운영
- 새로운 도메인 (알림, 통계 등) 추가 가능
- 마이크로서비스 분리 시 도메인별 독립적 관리

### 6.3 페이지 구조 (프론트엔드)
- Next.js App Router 구조 사용
- 라우트 그룹 `()` 활용하여 관련 페이지 그룹화
- 동적 라우트 `[]` 사용 시 의미있는 파라미터명 사용
- 중첩 라우팅을 통한 논리적 페이지 구조

```
app/
├── (home)/                # 메인 페이지 그룹
├── (auth)/                # 인증 관련 페이지 그룹
│   ├── login/
│   └── signup/
├── stories/               # 스토리 관련 페이지
│   ├── (list)/           # 목록 페이지들
│   ├── (write-and-edit)/ # 작성/편집 페이지들
│   ├── [title]/          # 개별 스토리 상세
│   ├── category/         # 카테고리별 스토리
│   ├── random/           # 랜덤 스토리
│   └── search/           # 스토리 검색
└── (admin)/               # 관리자 페이지 그룹 (향후 확장)
    └── dashboard/
```

**확장 고려사항:**
- 새로운 기능 추가 시 적절한 라우트 그룹 생성
- 관리자 기능, 사용자 프로필 등 향후 추가될 페이지 고려
- 각 페이지는 `page.tsx`, `loading.tsx`, `error.tsx` 조합으로 구성

---

## 7. 스타일링 규칙

### 7.1 Tailwind CSS v4 사용
- 유틸리티 클래스 우선 사용
- 커스텀 CSS는 최소화
- shadcn/ui 컴포넌트 활용

```tsx
// ✅ 좋은 예시
<div className="mx-auto flex max-w-3xl flex-col gap-4">
  <h1 className="text-2xl font-bold">{story.title}</h1>
</div>
```

### 7.2 반응형 디자인
- 모바일 퍼스트 접근
- Tailwind 반응형 접두사 사용
- 접근성 고려한 디자인

---

## 8. 상수 및 타입 관리

### 8.1 상수 정의
```tsx
// constants/category.ts
export const STORY_CATEGORIES = {
  ETYMOLOGY: 'etymology',
  GENERAL: 'general',
  // ...
} as const;

export type StoryCategory = typeof STORY_CATEGORIES[keyof typeof STORY_CATEGORIES];
```

### 8.2 공통 타입
- `packages/utils/src/schemas.ts`에 공통 스키마 정의
- Zod 스키마 사용 권장
- API 응답 타입은 백엔드와 공유
- 매핑 유틸리티: `packages/utils/src/mappings/`에 카테고리, 반응 매핑 함수 정의

---

## 9. 데이터베이스 (Prisma)

### 9.1 스키마 관리
- `packages/database/prisma/schema.prisma`에 통합 관리
- 마이그레이션 파일은 의미있는 이름 사용
- 관계 설정 시 명확한 이름 사용

### 9.2 시드 데이터
- `prisma/seed/` 디렉토리에 카테고리별 시드 파일 분리
- 개발/테스트 환경에서 일관된 데이터 제공

---

## 10. 에러 처리

### 10.1 백엔드 에러 처리
```tsx
// ✅ 좋은 예시
if (!story) {
  throw new NotFoundException("찾는 스토리가 존재하지 않습니다.");
}
```

### 10.2 프론트엔드 에러 처리
- Error Boundary 사용 (`error.tsx` 파일 활용)
- 사용자 친화적인 한국어 에러 메시지
- 로딩 상태와 에러 상태 분리
- TanStack Query의 `useSuspenseQuery` 사용으로 로딩/에러 상태 자동 처리

---

## 11. 접근성 (Accessibility)

### 11.1 시맨틱 HTML 사용
- 의미에 맞는 HTML 태그 사용: `<article>`, `<section>`, `<header>`, `<main>`, `<nav>`, `<time>`
- 헤딩 태그 순서 준수 (h1 → h2 → h3)
- 목록은 `<ul>`, `<ol>`, `<li>` 사용

```tsx
// ✅ 좋은 예시
<article className="story-container">
  <header>
    <h1>{story.title}</h1>
    <time dateTime={story.createdAt}>{formattedDate}</time>
  </header>
  <section className="story-content">
    <p>{story.summary}</p>
  </section>
</article>
```

### 11.2 이미지 접근성
- `alt` 속성 필수 제공 (빈 alt="" 사용 시 이유 명시)
- 장식용 이미지는 `aria-hidden="true"` 또는 빈 alt 사용
- 의미있는 alt 텍스트 작성

```tsx
// ✅ 좋은 예시
<Image
  src={story.thumbnailPath}
  alt={`${story.title} 스토리의 썸네일 이미지`}
  fill
  className="rounded-md object-cover"
/>

// 장식용 이미지
<Image
  src="/decoration.png"
  alt=""
  aria-hidden="true"
  className="decoration"
/>
```

### 11.3 ARIA 속성 활용
- `aria-label`: 접근 가능한 이름 제공
- `aria-describedby`: 추가 설명 연결
- `aria-expanded`: 펼침/접힘 상태 표시
- `aria-hidden`: 스크린 리더에서 숨김
- `role`: 요소의 역할 명시

```tsx
// ✅ 좋은 예시
<button
  aria-label="스토리에 좋아요 표시"
  aria-pressed={isLiked}
  onClick={handleLike}
>
  <HeartIcon aria-hidden="true" />
  {likeCount}
</button>

<div
  role="tabpanel"
  aria-labelledby="tab-comments"
  aria-hidden={!isCommentTabActive}
>
  {/* 댓글 내용 */}
</div>
```

### 11.4 키보드 접근성
- 모든 인터랙티브 요소는 키보드로 접근 가능
- Tab 순서가 논리적이어야 함
- `tabIndex` 적절히 사용 (-1, 0만 권장)
- Enter/Space 키로 버튼 활성화 가능

```tsx
// ✅ 좋은 예시
const handleKeyDown = (event: React.KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    handleAction();
  }
};

<div
  role="button"
  tabIndex={0}
  onKeyDown={handleKeyDown}
  onClick={handleAction}
  aria-label="스토리 카드 선택"
>
  {/* 카드 내용 */}
</div>
```

### 11.5 폼 접근성
- `<label>` 요소와 입력 필드 연결
- 필수 필드는 `required` 속성과 시각적 표시
- 오류 메시지는 `aria-describedby`로 연결
- 플레이스홀더에만 의존하지 않기

```tsx
// ✅ 좋은 예시
<div className="form-field">
  <label htmlFor="story-title" className="required">
    스토리 제목 (필수)
  </label>
  <input
    id="story-title"
    type="text"
    required
    aria-describedby="title-error"
    aria-invalid={hasError}
  />
  {hasError && (
    <div id="title-error" role="alert" className="error-message">
      제목은 필수 입력 항목입니다.
    </div>
  )}
</div>
```

### 11.6 색상 접근성
- 색상만으로 정보 전달 금지
- WCAG AA 기준 색상 대비 준수 (4.5:1)
- 중요한 정보는 아이콘/텍스트와 함께 표시

```tsx
// ✅ 좋은 예시
<div className="status-indicator">
  <CheckIcon aria-hidden="true" />
  <span>게시 완료</span>
</div>

// ❌ 나쁜 예시 - 색상만으로 상태 표시
<div className="status-green"></div>
```

### 11.7 동적 콘텐츠 접근성
- 동적 변경사항은 `aria-live` 영역 사용
- 로딩 상태는 `aria-busy` 또는 적절한 안내 제공
- 페이지 제목 동적 업데이트

```tsx
// ✅ 좋은 예시
<div aria-live="polite" aria-atomic="true">
  {isLoading ? '스토리를 불러오는 중...' : '스토리 로드 완료'}
</div>

<button
  aria-busy={isSubmitting}
  disabled={isSubmitting}
>
  {isSubmitting ? '저장 중...' : '스토리 저장'}
</button>
```

### 11.8 모바일 접근성
- 터치 타겟 최소 44px × 44px
- 확대/축소 방지하지 않기
- 가로/세로 모드 모두 지원

### 11.9 접근성 테스트
- 브라우저 접근성 도구 활용
- 키보드만으로 전체 기능 테스트
- 스크린 리더 테스트 (macOS VoiceOver, NVDA 등)

---

## 12. 성능 최적화

### 12.1 컴포넌트 분리
- 큰 컴포넌트는 작은 단위로 분리
- 메모이제이션 적절히 활용
- 서버 컴포넌트와 클라이언트 컴포넌트 구분

### 12.2 이미지 최적화
- Next.js Image 컴포넌트 사용
- AspectRatio 컴포넌트로 레이아웃 시프트 방지

---



## 13. 문서화

### 13.1 주석 작성
```tsx
/**
 * @desc 스토리 메타 정보를 표시하는 컴포넌트
 * 작성일과 작성자 정보를 포맷팅하여 보여줍니다.
 */
const StoryMetaInfo: React.FC<StoryMetaInfoProps> = ({
  createdAt,
  authorNickname
}) => {
  // 날짜 포맷팅 (YYYY.MM.DD 형식)
  const formattedDate = useMemo(() => {
    return new Date(createdAt).toLocaleDateString('ko-KR');
  }, [createdAt]);

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      {/* 작성일 표시 */}
      <time dateTime={createdAt}>{formattedDate}</time>
      <span>•</span>
      {/* 작성자 닉네임 */}
      <span>{authorNickname}</span>
    </div>
  );
};

/**
 * @desc 스토리 카테고리를 한국어로 변환하는 유틸리티 함수
 * @deprecated v2.0에서 제거 예정. storyCategoryToKoreanMap 사용 권장
 */
export const getCategoryName = (category: string): string => {
  // 레거시 함수 - 하위 호환성을 위해 유지
  return storyCategoryToKoreanMap[category] || category;
};

/**
 * @desc API 요청 중 발생할 수 있는 에러를 처리하는 훅
 * @example
 * const { handleError } = useErrorHandler();
 * 
 * try {
 *   await createStory(data);
 * } catch (error) {
 *   handleError(error, '스토리 생성에 실패했습니다.');
 * }
 */
export const useErrorHandler = () => {
  // 훅 구현
};
```

### 13.2 README 작성
- 각 패키지별 README.md 제공
- 설치 및 사용법을 한국어로 설명
- 예시 코드 포함

---

## 14. 보안

### 14.1 환경 변수 관리
- `.env` 파일을 통한 설정 관리
- 민감한 정보는 절대 코드에 하드코딩 금지
- 타입 안전한 환경 변수 사용

### 14.2 입력 검증
- Zod 스키마를 통한 데이터 검증
- XSS, SQL Injection 방지
- CORS 설정 적절히 구성

---

## 15. 코드 리뷰 체크리스트

### 15.1 필수 검토 항목
- [ ] 절대 경로 사용 확인
- [ ] TypeScript 타입 안전성
- [ ] 접근성 준수 여부 (ARIA, 시맨틱 HTML, 키보드 네비게이션)
- [ ] 성능 최적화 고려
- [ ] 에러 처리 적절성
- [ ] 보안 취약점 검토
- [ ] 한국어 문서화

### 15.2 스타일 검토
- [ ] 컴포넌트 분리 적절성
- [ ] 네이밍 컨벤션 준수 (PascalCase 컴포넌트, camelCase 변수)
- [ ] 코드 가독성
- [ ] 중복 코드 제거
- [ ] shadcn/ui 컴포넌트 적절한 활용
- [ ] Tailwind CSS 클래스 정리

---

이 스타일 가이드를 준수하여 일관성 있고 품질 높은 코드를 작성해주세요. 모든 리뷰와 피드백은 한국어로 제공해주세요.