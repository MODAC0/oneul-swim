import type { Pool } from '@/lib/types';

const won = (n: number) => `${n.toLocaleString()}원`;

/** 강습 프로그램 개요 (v1: 안내 수준. v1.5에서 등록일·신청 확장) */
export function LessonList({ pool }: { pool: Pool }) {
  if (pool.lessons.length === 0) return null;
  return (
    <section className="rounded-input bg-surface p-4 ring-1 ring-line">
      <h2 className="text-h3 font-bold text-text">강습 프로그램</h2>
      <ul className="mt-3 flex flex-col divide-y divide-line">
        {pool.lessons.map((l, i) => (
          <li key={i} className="py-2.5 first:pt-0 last:pb-0">
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-medium text-text">{l.name}</span>
              <span className="shrink-0 text-sm font-medium tabular-nums text-primary">
                월 {won(l.fee)}~
              </span>
            </div>
            <p className="mt-0.5 text-sm text-text-sub">
              {l.daysLabel}
              {l.time && ` · ${l.time}`}
            </p>
            {l.note && <p className="mt-0.5 text-xs text-text-sub">{l.note}</p>}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-text-sub">
        강습 신청·등록일은 시설 온라인 수강신청에서 확인하세요.
      </p>
    </section>
  );
}
