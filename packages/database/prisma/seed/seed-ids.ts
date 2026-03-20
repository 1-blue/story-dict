/**
 * Seed 데이터용 UUID 생성 유틸
 * RFC 4122 준수: version 4, variant 8
 */
export const toSeedUuid = (frontId: string, backId: string) =>
  `${frontId}-0000-4000-8000-${backId}`;

/** 기본 관리자 유저 ID (stories, comments에서 참조) */
export const SEED_ADMIN_USER_ID = "00000000-0000-4000-8000-000000000000";

/** 기본 이야기봇 유저 ID (stories, comments에서 참조) */
export const SEED_STORY_BOT_USER_ID = "00000000-0000-4000-8000-100000000000";

/** 첫 번째 스토리 ID (comments에서 참조) */
export const SEED_FIRST_STORY_ID = "00000000-0000-4000-8000-000000000000";
