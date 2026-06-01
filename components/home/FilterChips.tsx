'use client';

import { Chip } from '@/components/ui/Chip';

export type PoolFilter = 'now' | 'today' | 'all';

const CHIPS: Array<{ value: PoolFilter; label: string }> = [
  { value: 'now', label: '지금 가능' },
  { value: 'today', label: '오늘' },
  { value: 'all', label: '전체' },
];

/** 홈 상단 필터 칩 — 지금 가능 / 오늘 / 전체 */
export function FilterChips({
  value,
  onChange,
}: {
  value: PoolFilter;
  onChange: (v: PoolFilter) => void;
}) {
  return (
    <div className="flex gap-2">
      {CHIPS.map((c) => (
        <Chip
          key={c.value}
          selected={c.value === value}
          onClick={() => onChange(c.value)}
        >
          {c.label}
        </Chip>
      ))}
    </div>
  );
}
