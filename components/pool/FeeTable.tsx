import type { Pool } from '@/lib/types';
import { priceTiers } from '@/lib/pools';

const TARGETS: Array<{ key: keyof typeof priceTiers.full; label: string }> = [
  { key: '성인', label: '성인' },
  { key: '청소년', label: '청소년' },
  { key: '경로', label: '경로' },
  { key: '어린이', label: '어린이' },
  { key: '장애유공자', label: '장애·유공자' },
];

const won = (n: number) => `${n.toLocaleString()}원`;

/**
 * 자유수영 요금표.
 * - full: 주말·평일 장시간 세션(기본)
 * - half: 평일 낮 50분 세션(반값)
 * + 월정기권(시설별 유무).
 */
export function FeeTable({ pool }: { pool: Pool }) {
  const pass = pool.freeSwim.monthlyPass;
  return (
    <section className="rounded-input bg-surface p-4 ring-1 ring-line">
      <h2 className="text-h3 font-bold text-text">자유수영 요금</h2>

      <table className="mt-3 w-full text-body">
        <thead>
          <tr className="text-sm text-text-sub">
            <th className="pb-2 text-left font-medium">대상</th>
            <th className="pb-2 text-right font-medium">기본</th>
            <th className="pb-2 text-right font-medium">평일 50분</th>
          </tr>
        </thead>
        <tbody>
          {TARGETS.map(({ key, label }) => (
            <tr key={key} className="border-t border-line">
              <td className="py-1.5 text-text-sub">{label}</td>
              <td className="py-1.5 text-right font-medium tabular-nums text-text">
                {won(priceTiers.full[key])}
              </td>
              <td className="py-1.5 text-right tabular-nums text-text-sub">
                {won(priceTiers.half[key])}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 text-xs text-text-sub">
        기본: 주말·평일 장시간 세션 · 평일 50분: 평일 낮 단시간 세션(반값)
      </p>

      {pass && (
        <div className="mt-4 rounded-md bg-primary-5 p-3">
          <p className="text-sm font-medium text-text">
            월정기권 (성인 {won(pass.성인)} · 청소년 {won(pass.청소년)} · 어린이{' '}
            {won(pass.어린이)})
          </p>
          {pass.note && (
            <p className="mt-1 text-xs text-text-sub">{pass.note}</p>
          )}
        </div>
      )}
    </section>
  );
}
