import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getPoolById, getPoolNowStatus } from '@/lib/pools';
import { nowInSeoul } from '@/lib/time';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { FreshnessTag } from '@/components/ui/FreshnessTag';
import { FreeSwimSchedule } from '@/components/pool/FreeSwimSchedule';
import { FeeTable } from '@/components/pool/FeeTable';
import { LessonList } from '@/components/pool/LessonList';
import { PoolActions } from '@/components/pool/PoolActions';

export const dynamic = 'force-dynamic';

// TODO: Figma F2(시설상세) 디자인 동기화되면 마크업/스타일 정밀 바인딩.
export default async function PoolDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pool = getPoolById(id);
  if (!pool) redirect('/'); // 존재하지 않는 시설 → 홈

  const now = nowInSeoul();
  const status = getPoolNowStatus(pool, now);

  return (
    <main className="mx-auto w-full max-w-md px-4 pb-10 pt-6">
      <Link href="/" className="text-sm text-text-sub">
        ← 목록
      </Link>

      <header className="mt-3 mb-4">
        <div className="mb-1.5 flex items-center gap-2">
          <span className="rounded-full bg-primary-10 px-2 py-0.5 text-xs font-medium text-primary">
            {pool.region}
          </span>
          <FreshnessTag updatedAt={pool.updatedAt} />
        </div>
        <h1 className="text-h2 font-bold text-text">{pool.name}</h1>
        <div className="mt-2">
          <StatusBadge status={status} />
        </div>
        {pool.address && (
          <p className="mt-2 text-sm text-text-sub">{pool.address}</p>
        )}
      </header>

      <div className="flex flex-col gap-3">
        <FreeSwimSchedule pool={pool} status={status} />
        <FeeTable pool={pool} />
        <LessonList pool={pool} />

        {pool.notice && (
          <section className="rounded-input bg-surface p-4 ring-1 ring-line">
            <h2 className="text-sm font-bold text-text-sub">이용 안내</h2>
            <p className="mt-2 text-sm leading-relaxed text-text-sub">
              {pool.notice}
            </p>
          </section>
        )}
      </div>

      <div className="mt-4">
        <PoolActions pool={pool} />
      </div>
    </main>
  );
}
