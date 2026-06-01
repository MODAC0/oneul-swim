import type { FreeSwimSession, Pool } from '@/lib/types';
import type { NowStatus } from '@/lib/pools';
import { cn } from '@/lib/cn';

/** daysLabel 기준으로 세션을 그룹핑(첫 등장 순서 유지) */
function groupByDays(
  sessions: FreeSwimSession[],
): Array<[string, FreeSwimSession[]]> {
  const map = new Map<string, FreeSwimSession[]>();
  for (const s of sessions) {
    const arr = map.get(s.daysLabel) ?? [];
    arr.push(s);
    map.set(s.daysLabel, arr);
  }
  return [...map.entries()];
}

/**
 * 자유수영 시간표 — 요일 그룹별 세션 나열.
 * 지금 진행 중인 세션은 워터블루로 하이라이트 + "지금" 뱃지.
 */
export function FreeSwimSchedule({
  pool,
  status,
}: {
  pool: Pool;
  status: NowStatus;
}) {
  const groups = groupByDays(pool.freeSwim.sessions);
  const ongoing = status.kind === 'open' ? status.session : null;

  return (
    <section className="rounded-input bg-surface p-4 ring-1 ring-line">
      <h2 className="text-h3 font-bold text-text">자유수영 시간</h2>
      <div className="mt-3 flex flex-col gap-4">
        {groups.map(([label, sessions]) => (
          <div key={label}>
            <p className="mb-1.5 text-sm font-medium text-text-sub">{label}</p>
            <ul className="flex flex-col gap-1">
              {sessions.map((s, i) => {
                const isNow = s === ongoing;
                return (
                  <li
                    key={i}
                    className={cn(
                      'flex items-center justify-between rounded-md px-2 py-1.5 text-body',
                      isNow && 'bg-primary-10',
                    )}
                  >
                    <span
                      className={cn(
                        'font-medium tabular-nums',
                        isNow ? 'text-primary-strong' : 'text-text',
                      )}
                    >
                      {s.start}~{s.end}
                    </span>
                    <span className="flex items-center gap-2 text-sm text-text-sub">
                      {s.pool && <span>{s.pool}</span>}
                      {isNow && (
                        <span className="rounded-full bg-now-open px-2 py-0.5 text-xs font-bold text-white">
                          지금
                        </span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
