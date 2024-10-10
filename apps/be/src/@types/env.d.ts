declare namespace NodeJS {
  interface ProcessEnv {
    /** `DB` 스키마 */
    readonly DB_SCHEMA: "public" | "development" | "test";
    /** `DB` 호스트 */
    readonly DB_HOST: string;
    /** `DB` 포트 */
    readonly DB_PORT: string;
    /** `DB`에서 사용할 유저 이름 */
    readonly DB_USERNAME: string;
    /** `DB`에서 사용할 비밀번호 */
    readonly DB_PASSWORD: string;
    /** `DB` 이름 */
    readonly DB_DATABASE: string;
    /** `DB` 명령어 로깅 여부 */
    readonly DB_LOGGING: string;
    /** 데이터베이스 URL `postgresql://유저명:비밀번호@호스트:포트/데이터베이스명?schema=스키마명` */
    readonly DATABASE_URL: `postgresql://${string}:${string}@${string}:${string}/${string}?schema=${string}`;

    /** 실행 환경 */
    readonly NODE_ENV: "production" | "development" | "test";
    /** 실행 포트 */
    readonly PORT: string;

    /** 클라이언트 URL */
    readonly CLIENT_URL: string;
  }
}
