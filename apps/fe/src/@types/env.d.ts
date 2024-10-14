declare namespace NodeJS {
  interface ProcessEnv {
    /** 서버 엔드포인트 */
    readonly NEXT_PUBLIC_SERVER_URL: string;
    /** 클라이언트 엔드포인트 */
    readonly NEXT_PUBLIC_CLIENT_URL: string;
  }
}
