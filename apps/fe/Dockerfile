FROM node:20-alpine AS base

# ======================================== 설치 전용 실행 스테이지 ========================================
FROM base AS installer

# `node:20-alpine`라서 누락된 공유 라이브러리 설치
RUN apk update && apk add --no-cache libc6-compat
RUN ln -s /usr/lib/libssl.so.3 /lib/libssl.so.3

# turbo 전역 설치
RUN npm install -g turbo

# 작업 디렉토리 설정
WORKDIR /app

# 소스 코드 복사
COPY . .

# fe 의존성만 도커 최적화 모드로 설치
RUN turbo prune fe --docker

# ======================================== 빌드 전용 실행 스테이지 ========================================
FROM base AS builder

# 누락된 공유 라이브러리 설치
RUN apk update && apk add --no-cache libc6-compat
RUN ln -s /usr/lib/libssl.so.3 /lib/libssl.so.3

# pnpm 전역 설치
RUN npm install -g pnpm

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 매니저 파일들 복사 및 설치
COPY --from=installer /app/out/json/ .
RUN pnpm install

# 실제 소스 코드와 설정 파일
COPY --from=installer /app/out/full/ .

# 빌드 처리 (빌드 파일 존재 여부 확인)
RUN if [ -d "apps/fe/.next" ] && [ -d "apps/fe/public" ]; then \
      echo "✅ 빌드 파일이 존재합니다. 캐시를 사용합니다."; \
    else \
      echo "🔨 빌드 파일이 없습니다. 새로 빌드합니다."; \
      pnpm turbo build; \
    fi

# ======================================== 실행 전용 실행 스테이지 ========================================
FROM base AS runner

RUN ln -s /usr/lib/libssl.so.3 /lib/libssl.so.3

# 작업 디렉토리 설정
WORKDIR /app

# 환경 변수 설정 추가
ENV PORT=9000
ENV HOSTNAME="0.0.0.0"
ENV NODE_OPTIONS="--max-old-space-size=4096"

# 실행 파일 복사
COPY --from=builder /app/apps/fe/.next/standalone ./
COPY --from=builder /app/apps/fe/.next/static ./apps/fe/.next/static
COPY --from=builder /app/apps/fe/public ./apps/fe/public

# 포트 노출
EXPOSE 9000

# 실행 명령어
CMD ["node", "apps/fe/server.js"]
# CMD ["tail", "-f", "/dev/null"]