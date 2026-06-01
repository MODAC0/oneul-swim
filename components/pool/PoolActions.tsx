import type { Pool } from '@/lib/types';

/** 전화 / 길찾기 액션. 길찾기는 검증된 좌표로 카카오맵 길찾기 딥링크. */
export function PoolActions({ pool }: { pool: Pool }) {
  const kakaoTo =
    pool.lat != null && pool.lng != null
      ? `https://map.kakao.com/link/to/${encodeURIComponent(pool.name)},${pool.lat},${pool.lng}`
      : null;

  return (
    <div className="flex gap-2">
      <a
        href={`tel:${pool.phone}`}
        className="flex-1 rounded-button bg-surface py-3 text-center font-medium text-primary ring-1 ring-primary"
      >
        전화
      </a>
      {kakaoTo && (
        <a
          href={kakaoTo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-button bg-primary py-3 text-center font-medium text-white"
        >
          길찾기
        </a>
      )}
    </div>
  );
}
