FROM node:20-alpine AS base

# ======================================== 설치 전용 실행 스테이지 ========================================
FROM base AS installer

# `node:20-alpine`라서 누락된 공유 라이브러리 설치
RUN apk update && apk add --no-cache libc6-compat openssl

# turbo 전역 설치
RUN npm install -g turbo

# 작업 디렉토리 설정
WORKDIR /app

# 소스 코드 복사
COPY . .

# be 의존성만 도커 최적화 모드로 설치
RUN turbo prune be --docker

# ======================================== 빌드 전용 실행 스테이지 ========================================
FROM base AS builder

# 누락된 공유 라이브러리 설치
RUN apk update && apk add --no-cache libc6-compat openssl

# pnpm 전역 설치
RUN npm install -g pnpm

# 루트 디렉토리로 이동 후 빌드
WORKDIR /app

# 패키지 매니저 파일들 복사 및 설치
COPY --from=installer /app/out/json/ .
RUN pnpm install

# 실제 소스 코드와 설정 파일
COPY --from=installer /app/out/full/ .

# turbo 빌드
RUN pnpm turbo build

# ======================================== 실행 전용 실행 스테이지 ========================================
FROM base AS runner

# OpenSSL 1.1 라이브러리 추가
RUN apk update && apk add --no-cache libc6-compat openssl

# pnpm 전역 설치 추가
RUN npm install -g pnpm

# 작업 디렉토리 설정 
WORKDIR /app

# 빌드된 파일 복사
COPY --from=builder /app/apps/be/dist ./apps/be/dist
COPY --from=builder /app/apps/be/node_modules ./apps/be/node_modules
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages

# 포트 노출
EXPOSE 9050

# 실행 명령어
CMD ["node", "./apps/be/dist/main.js"]
# CMD ["tail", "-f", "/dev/null"]