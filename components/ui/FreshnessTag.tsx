import { dayjs } from '@/lib/time';

/** "✓ YYYY.MM.DD 확인" — 데이터 신선도를 숨기지 않고 노출(신뢰 장치) */
export function FreshnessTag({ updatedAt }: { updatedAt: string }) {
  return (
    <span className="text-xs text-text-sub">
      ✓ {dayjs(updatedAt).format('YYYY.MM.DD')} 확인
    </span>
  );
}
