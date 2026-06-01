'use client';

import { cn } from '@/lib/cn';

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
      {CHIPS.map((c) => {
        const active = c.value === value;
        return (
          <button
            key={c.value}
            type="button"
            onClick={() => onChange(c.value)}
            className={cn(
              'rounded-full px-4 py-2 text-sm transition',
              active
                ? 'bg-primary font-bold text-white'
                : 'border border-line bg-surface font-normal text-text-mute',
            )}
          >
            {c.label}
          </button>
        );
      })}
    </div>
  );
}
