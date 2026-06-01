'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  pools,
  getPoolNowStatus,
  sortPoolsByStatus,
  type NowStatus,
} from '@/lib/pools';
import { nowInSeoul, type Dayjs } from '@/lib/time';
import { FilterChips, type PoolFilter } from './FilterChips';
import { PoolCard } from './PoolCard';

/**
 * 홈 인터랙티브 영역 — 필터 칩 + 요약 + 시설 리스트.
 * "지금 상태"는 클라이언트에서 사용자 시계(Asia/Seoul) 기준으로 계산하고
 * 1분마다 갱신해 실시간성을 유지한다.
 */
export function HomeClient() {
  const [filter, setFilter] = useState<PoolFilter>('now');
  const [now, setNow] = useState<Dayjs>(() => nowInSeoul());

  useEffect(() => {
    const id = setInterval(() => setNow(nowInSeoul()), 60_000);
    return () => clearInterval(id);
  }, []);

  const { visible, openCount } = useMemo(() => {
    const withStatus = pools.map((pool) => ({
      pool,
      status: getPoolNowStatus(pool, now),
    }));
    const open = withStatus.filter((x) => x.status.kind === 'open').length;

    const matches = (kind: NowStatus['kind']): boolean => {
      if (filter === 'all') return true;
      if (filter === 'now') return kind === 'open';
      return kind !== 'none-today'; // '오늘' = 오늘 운영일(open/soon/종료)
    };

    const filtered = withStatus
      .filter((x) => matches(x.status.kind))
      .map((x) => x.pool);
    return { visible: sortPoolsByStatus(filtered, now), openCount: open };
  }, [filter, now]);

  return (
    <div className="flex flex-col gap-4">
      <FilterChips value={filter} onChange={setFilter} />

      <div className="flex items-center gap-1.5">
        <span className="size-2.5 rounded-full bg-now-open" aria-hidden />
        <span className="text-body font-bold text-now-open-ink">
          {openCount > 0
            ? `지금 자유수영 OK · ${openCount}곳`
            : '지금 운영 중인 곳이 없어요'}
        </span>
      </div>

      {visible.length > 0 ? (
        <div className="flex flex-col gap-3">
          {visible.map((pool) => (
            <PoolCard key={pool.id} pool={pool} now={now} />
          ))}
        </div>
      ) : (
        <p className="rounded-input bg-surface px-4 py-8 text-center text-sm leading-relaxed text-text-sub ring-1 ring-line">
          조건에 맞는 수영장이 없어요.
          <br />
          ‘오늘’ 또는 ‘전체’로 확인해보세요.
        </p>
      )}
    </div>
  );
}
