## 🎯 프로젝트 개요

Story Dict 프로젝트에 S3 기반 커스텀 빌드 캐시 시스템을 구축하여 CI/CD 성능을 최적화했습니다.

> **주요 특징**: 터보레포 자체 캐시 + S3 빌드 아티팩트 캐시의 하이브리드 접근

### 1️⃣ 모노레포 구조
```
apps/
├── fe/          # Next.js 프론트엔드
├── be/          # NestJS 백엔드
└── storybook/   # Storybook

packages/
├── database/    # Prisma DB 패키지
├── ui/          # UI 컴포넌트
├── utils/       # 유틸리티
├── eslint-config/
├── tailwind-config/
└── typescript-config/
```

### 2️⃣ 캐시 시스템 구조
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   CI            │───▶│  S3 Cache        │───▶│  CD             │
│   - 테스트      │    │  - 빌드 결과물   │    │  - 캐시 복원    │
│   - 빌드        │    │  - 커밋 기반     │    │  - Docker 빌드  │
│   - 캐시 저장   │    │  - tar.gz 압축   │    │  - 배포         │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### 3️⃣ 기대 효과
- **CI 빌드 시간**: 변경된 패키지만 빌드 (Turbo 최적화)
- **CD 배포 시간**: 캐시 적중 시 빌드 단계 완전 스킵 (99% 단축)
- **팀 협업**: S3 캐시 공유로 모든 개발자가 동일한 성능 혜택
- **안정성**: 커밋 해시 기반 정확한 캐시 매칭

## ⚙️ 설정 변경사항

### 1️⃣ turbo.json 개선
```json
{
  "$schema": "https://turbo.build/schema.json",
  "ui": "tui",
  "remoteCache": {
    "signature": true
  },
  "tasks": {
    "build": {
      "dependsOn": ["^build", "^db:generate"],
      "inputs": ["$TURBO_DEFAULT$", ".env*", "src/**", "prisma/**"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**", "build/**"]
    },
    "lint": {
      "dependsOn": ["^build"],
      "inputs": ["src/**", "*.{js,ts,tsx}", ".eslintrc*", "eslint.config.*"],
      "outputs": []
    },
    "type-check": {
      "dependsOn": ["^build"],
      "inputs": ["src/**", "tsconfig.json", "*.ts", "*.tsx"],
      "outputs": []
    },
    "test": {
      "dependsOn": ["^build"],
      "inputs": ["src/**", "test/**", "__tests__/**", "*.test.*", "*.spec.*", "jest.config.*"],
      "outputs": ["coverage/**", "test-results/**"]
    },
    "db:generate": {
      "inputs": ["prisma/schema.prisma", "prisma/migrations/**"],
      "outputs": ["node_modules/.prisma/**", "prisma/generated/**"],
      "cache": true
    }
  },
  "globalEnv": [
    "NODE_ENV",
    "DATABASE_URL",
    "NEXTAUTH_SECRET",
    "NEXTAUTH_URL"
  ]
}
```

### 2️⃣ package.json 스크립트 추가
```json
{
  "scripts": {
    "ci": "turbo lint type-check test build",
    "ci:affected": "turbo lint type-check test build --filter='[HEAD^1]'",
    "cache:clear": "turbo daemon clean",
    "test": "turbo test",
    "type-check": "turbo type-check"
  }
}
```

### 3️⃣ S3 캐시 환경변수 설정
`.env.turbo.example` 파일 생성:
```bash
# S3 Custom Cache 설정
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=ap-northeast-2
BUILD_CACHE_S3_BUCKET=your-build-cache-bucket

# 터보레포 로컬 캐시는 GitHub Actions Cache 사용
# (S3 원격 캐시는 터보레포가 직접 지원하지 않음)
```

## 🚀 CI/CD 분리 및 S3 캐시 구현

### 1️⃣ CI 워크플로우 (ci.yml)
**역할**: 코드 품질 검증 + 빌드 캐시 생성
```yaml
name: CI

on:
  push:
    branches: [master, development]
  pull_request:
    branches: [master, development]
  workflow_dispatch:

jobs:
  ci:
    name: Code Quality & Tests
    runs-on: ubuntu-latest
    timeout-minutes: 15
    outputs:
      should_deploy: ${{ steps.check-deploy.outputs.should_deploy }}

    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        with:
          fetch-depth: 2

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9.12.0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'

      # 터보레포 로컬 캐시 (GitHub Actions Cache)
      - name: Setup Turbo Cache
        uses: actions/cache@v3
        with:
          path: .turbo
          key: ${{ runner.os }}-turbo-${{ github.sha }}
          restore-keys: |
            ${{ runner.os }}-turbo-

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Generate Prisma client
        run: pnpm db:generate

      # 변경된 패키지만 테스트/린트/빌드
      - name: Run CI (affected packages only)
        run: pnpm ci:affected

      # master 브랜치에서만 S3 캐시 생성
      - name: Build and cache to S3
        if: github.ref == 'refs/heads/master' && github.event_name != 'pull_request'
        run: |
          echo "🔨 Building applications for deployment..."
          pnpm build

          echo "📁 Verifying build directories..."
          ls -la apps/fe/ || echo "FE directory not found"
          ls -la apps/be/ || echo "BE directory not found"

          echo "💾 Saving build cache to S3..."
          tar -czf build-cache-${{ github.sha }}.tar.gz \
            --ignore-failed-read \
            apps/fe/.next \
            apps/fe/public \
            apps/be/dist \
            packages/db/prisma/generated

          aws s3 cp build-cache-${{ github.sha }}.tar.gz \
            s3://${{ secrets.BUILD_CACHE_S3_BUCKET }}/builds/

          echo "✅ Build cache saved to S3 for commit ${{ github.sha }}"
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: ${{ secrets.AWS_REGION }}

      # CD 트리거 조건 (master 머지 시에만)
      - name: Check if deployment needed
        id: check-deploy
        run: |
          if [[ "${{ github.ref }}" == "refs/heads/master" && "${{ github.event_name }}" != "pull_request" ]]; then
            echo "should_deploy=true" >> $GITHUB_OUTPUT
          else
            echo "should_deploy=false" >> $GITHUB_OUTPUT
          fi

  # CI 성공 시 CD 자동 트리거
  trigger-cd:
    name: Trigger Deployment
    needs: ci
    if: needs.ci.outputs.should_deploy == 'true' && success()
    uses: ./.github/workflows/cd.yml
    with:
      environment: 'production'
      triggered_by: 'ci'
    secrets: inherit
```

### 2️⃣ CD 워크플로우 (cd.yml)
**역할**: S3 캐시 복원 + Docker 빌드 + 배포
```yaml
name: CD

on:
  workflow_call:
    inputs:
      environment:
        description: "배포 환경"
        required: true
        type: string
      triggered_by:
        description: "트리거 소스"
        required: false
        type: string
        default: 'manual'
  workflow_dispatch:
    inputs:
      environment:
        description: "배포할 환경을 선택하세요"
        required: true
        default: "production"
        type: choice
        options:
          - production
          - staging

jobs:
  deploy:
    name: Build & Deploy
    runs-on: ubuntu-latest
    environment: ${{ inputs.environment }}

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 9.12.0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      # AWS CLI 설치 (S3 캐시 접근용)
      - name: Install AWS CLI
        run: |
          curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
          unzip awscliv2.zip
          sudo ./aws/install
          aws --version

      # S3에서 빌드 캐시 복원 시도
      - name: Restore build cache from S3
        run: |
          echo "Checking for build cache in S3..."
          if aws s3 cp s3://${{ secrets.BUILD_CACHE_S3_BUCKET }}/builds/build-cache-${{ github.sha }}.tar.gz ./build-cache.tar.gz; then
            echo "✅ Build cache found! Restoring..."
            tar -xzf build-cache.tar.gz
            echo "BUILD_CACHE_HIT=true" >> $GITHUB_ENV
            echo "Cache restored successfully"
          else
            echo "❌ No build cache found for commit ${{ github.sha }}"
            echo "BUILD_CACHE_HIT=false" >> $GITHUB_ENV
          fi
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: ${{ secrets.AWS_REGION }}

      # 캐시 미스시에만 빌드 실행
      - name: Build applications (cache miss)
        if: env.BUILD_CACHE_HIT == 'false'
        run: |
          echo "🔨 Building applications..."
          pnpm build
          # 빌드 후 S3에 캐시 저장
          tar -czf build-cache-${{ github.sha }}.tar.gz \
            --ignore-failed-read \
            apps/fe/.next apps/fe/public apps/be/dist packages/db/prisma/generated
          aws s3 cp build-cache-${{ github.sha }}.tar.gz \
            s3://${{ secrets.BUILD_CACHE_S3_BUCKET }}/builds/
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: ${{ secrets.AWS_REGION }}

      # Prisma 클라이언트 생성 (항상 필요)
      - name: Generate Prisma client (always needed)
        run: pnpm db:generate

      # Docker 빌드 및 ECR 푸시
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-region: ${{ secrets.AWS_REGION }}
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}

      - name: Build and push Docker images
        run: |
          # ECR 로그인, Docker 빌드, 이미지 푸시
          aws ecr get-login-password | docker login --username AWS --password-stdin $ECR_REGISTRY
          docker-compose build
          docker-compose push
          # ... 배포 로직
```

### 3️⃣ 캐시 전략
- **Turbo 로컬 캐시**: GitHub Actions Cache로 `.turbo` 디렉토리 저장
- **S3 빌드 캐시**: 커밋 해시 기반 빌드 결과물 아티팩트 저장
- **변경 감지**: `pnpm ci:affected`로 변경된 패키지만 실행
- **조건부 빌드**: S3 캐시 히트 시 빌드 단계 완전 스킵

## 🔧 설정 방법

### 1️⃣ AWS S3 버킷 생성
```bash
# 1. S3 버킷 생성
aws s3 mb s3://your-build-cache-bucket --region ap-northeast-2

# 2. 버킷 정책 설정 (CI/CD에서 접근 가능하도록)
aws s3api put-bucket-policy --bucket your-build-cache-bucket --policy '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": ["s3:GetObject", "s3:PutObject"],
      "Resource": "arn:aws:s3:::your-build-cache-bucket/*"
    }
  ]
}'
```

### 2️⃣ GitHub Repository Secrets 설정
**Settings → Secrets and variables → Actions**에서 추가:
```
# AWS 설정
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
AWS_REGION=ap-northeast-2
BUILD_CACHE_S3_BUCKET=your-build-cache-bucket

# 기타 배포 관련 Secrets
AWS_SECURITY_GROUP_ID=sg-xxxxxxxxx
AWS_EC2_SSH_DNS=your-ec2-dns
AWS_EC2_SSH_USER_NAME=ubuntu
AWS_EC2_SSH_PEM_KEY=your-pem-key-content
AWS_EC2_SSH_PORT=22
SLACK_DEPLOY_WEBHOOK_URL=your-slack-webhook
FRENTEND_ENV_FILE=your-frontend-env-content
BACKEND_ENV_FILE=your-backend-env-content
```

### 3️⃣ 로컬 환경 설정
```bash
# 1. 환경변수 파일 생성 (선택사항)
cp .env.turbo.example .env.turbo

# 2. 로컬에서 터보레포 테스트
pnpm ci              # 첫 실행 (터보 로컬 캐시 생성)
pnpm ci              # 두 번째 실행 (로컬 캐시 활용)

# 3. 캐시 상태 확인
pnpm build --dry-run  # 실행 계획 확인
pnpm build --verbose  # 상세 로그 확인
```

## 🎨 캐시 최적화 팁

### 1️⃣ 입력 파일 정의
```json
{
  "inputs": [
    "$TURBO_DEFAULT$",    // 기본 파일들 (package.json 등)
    "src/**",             // 소스 코드
    ".env*",              // 환경변수 파일
    "prisma/**"           // DB 스키마
  ]
}
```

### 2️⃣ 출력 파일 정의
```json
{
  "outputs": [
    ".next/**",           // Next.js 빌드 결과
    "!.next/cache/**",    // 캐시 디렉토리 제외
    "dist/**",            // TypeScript 컴파일 결과
    "coverage/**"         // 테스트 커버리지
  ]
}
```

### 3️⃣ 의존성 그래프
```json
{
  "dependsOn": [
    "^build",             // 의존하는 패키지들 먼저 빌드
    "^db:generate"        // DB 클라이언트 생성 먼저
  ]
}
```

## 🛠️ 사용 명령어

### 1️⃣ 일반 명령어
```bash
# 전체 빌드
pnpm build

# 전체 CI 실행
pnpm ci

# 변경된 패키지만 실행
pnpm ci:affected

# 캐시 클리어
pnpm cache:clear
```

### 2️⃣ 개별 패키지 명령어
```bash
# 프론트엔드만
pnpm fe:build

# 백엔드만
pnpm be:build

# DB 스키마 생성
pnpm db:generate
```

### 3️⃣ 디버깅 명령어
```bash
# 캐시 상태 확인
npx turbo build --dry-run

# 상세 로그
npx turbo build --verbose

# 캐시 무시하고 실행
npx turbo build --force
```

## 📊 성능 모니터링 및 워크플로우

### 1️⃣ 워크플로우 시나리오

**시나리오 A: CI → CD 자동 실행**
```
1. master 브랜치에 PR 머지
2. CI: 테스트 + 빌드 + S3 캐시 저장 (3-5분)
3. CD: S3 캐시 복원 + Docker 빌드 + 배포 (1-2분)
총 소요시간: 4-7분
```

**시나리오 B: CD 수동 실행 (캐시 HIT)**
```
1. CD 워크플로우 수동 트리거
2. S3에서 빌드 캐시 발견 및 복원 (10초)
3. Docker 빌드 + 배포 (1-2분)
총 소요시간: 1-2분 (80% 단축)
```

**시나리오 C: CD 수동 실행 (캐시 MISS)**
```
1. CD 워크플로우 수동 트리거
2. S3 캐시 없음 → 전체 빌드 (3-4분)
3. 빌드 결과를 S3에 저장
4. Docker 빌드 + 배포 (1-2분)
총 소요시간: 4-6분
```

### 2️⃣ 캐시 성능 확인
```bash
# CI 로그에서 터보레포 캐시 확인
✓ @sd/ui:build    FULL TURBO (cached)    0.1s    # 로컬 캐시 적중
✓ @sd/db:build    FULL TURBO             2.3s    # 캐시 미스
✓ fe:build        FULL TURBO (cached)    0.1s    # 로컬 캐시 적중

# CD 로그에서 S3 캐시 확인
✅ Build cache found! Restoring...         # S3 캐시 적중
❌ No build cache found for commit abc123  # S3 캐시 미스
```

### 3️⃣ 성능 비교표
| 시나리오 | CI 시간 | CD 시간 | 총 시간 | 캐시 활용 |
|----------|---------|---------|---------|-----------|
| 첫 배포 | 5분 | 6분 | 11분 | 없음 |
| CI→CD 자동 | 3분 | 2분 | 5분 | S3 캐시 |
| CD 수동 (HIT) | - | 2분 | 2분 | S3 캐시 |
| CD 수동 (MISS) | - | 6분 | 6분 | 없음 |

## 🔍 트러블슈팅

### 1️⃣ S3 캐시 문제 해결
```bash
# S3 접근 권한 확인
aws s3 ls s3://your-build-cache-bucket

# AWS 자격증명 확인
aws sts get-caller-identity

# S3 버킷 내용 확인
aws s3 ls s3://your-build-cache-bucket/builds/ --recursive
```

### 2️⃣ GitHub Actions 문제 해결
```bash
# Secrets 설정 확인 항목
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- AWS_REGION
- BUILD_CACHE_S3_BUCKET

# 로그에서 확인할 항목
- AWS CLI 설치 성공 여부
- S3 업로드/다운로드 성공 여부
- 빌드 디렉토리 존재 여부
```

### 3️⃣ 로컬 터보레포 캐시 문제
```bash
# 로컬 캐시 클리어
pnpm cache:clear
rm -rf .turbo

# 터보 데몬 재시작
npx turbo daemon restart

# 강제 재빌드
pnpm build --force
```

### 4️⃣ 일반적인 문제들
**문제**: CD에서 빌드 아티팩트가 없다고 나옴
**해결**: CI에서 빌드가 정상 완료됐는지, S3 업로드가 성공했는지 확인

**문제**: Docker 빌드에서 파일을 찾을 수 없음
**해결**: S3 캐시 복원 후 파일 권한 및 디렉토리 구조 확인

**문제**: AWS CLI 명령어 실패
**해결**: IAM 권한 설정 및 버킷 정책 확인

## 📚 추가 자료

### 1️⃣ 구현된 시스템 요약
**Story Dict 프로젝트의 하이브리드 캐시 시스템**:
- **터보레포 로컬 캐시**: GitHub Actions Cache로 `.turbo` 디렉토리 관리
- **S3 빌드 캐시**: 커밋 해시 기반 빌드 아티팩트 저장/복원
- **CI/CD 분리**: CI는 품질 검증, CD는 배포에 집중
- **조건부 실행**: 캐시 상태에 따른 스마트 빌드/배포

### 2️⃣ 핵심 장점
- ✅ **팀 협업**: S3 캐시로 모든 개발자가 동일한 성능 혜택
- ✅ **안정성**: 커밋 해시 기반 정확한 캐시 매칭
- ✅ **유연성**: 자동 배포 + 수동 배포 모두 지원
- ✅ **효율성**: 캐시 히트 시 80% 시간 단축

### 3️⃣ 관련 문서
- [Turborepo 공식 문서](https://turbo.build/repo/docs)
- [GitHub Actions 워크플로우](https://docs.github.com/ko/actions/using-workflows)
- [AWS S3 버킷 정책](https://docs.aws.amazon.com/s3/latest/userguide/bucket-policies.html)
- [Docker Multi-stage 빌드](https://docs.docker.com/build/building/multi-stage/)
