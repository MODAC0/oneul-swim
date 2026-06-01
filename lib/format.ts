/** 표시용 포맷 유틸 — 화면 전역 공용 */
import type { FreeSwimTier } from './types';

export const formatWon = (n: number): string => `${n.toLocaleString()}원`;

/** 자유수영 요금 등급 라벨 (full=전일권 / half=반일권). short=true면 '권' 생략 */
export const tierLabel = (t: FreeSwimTier, short = false): string =>
  t === 'full' ? (short ? '전일' : '전일권') : short ? '반일' : '반일권';
