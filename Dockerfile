# Node.js v20 이미지 사용
FROM node:20

# 컨테이너 내부의 작업 디렉토리 설정
WORKDIR /app

# pnpm 전역 설치
RUN npm install -g pnpm

# 소스 코드 복사 ( .dockerignore에 의해서 필터링됨 )
COPY . .

# 의존성 설치
RUN pnpm install

# Prisma 설정
COPY ./envs/be.env ./apps/be/.env
COPY apps/be/prisma ./apps/be/prisma/

# prisma 기본 세팅
WORKDIR /app/apps/be
RUN pnpm prisma generate
RUN pnpm prisma migrate dev

WORKDIR /app

# 포트 노출
EXPOSE 5555 9000 9050

# 실행 명령어
CMD ["sh", "-c", "cd apps/be && pnpm prisma studio & cd /app && pnpm run dev"]