import Link from 'next/link';
import { cn } from '@/lib/cn';

/** 리스트 / 지도 뷰 전환 세그먼트 (Figma Map 헤더 viewToggle) */
export function ViewToggle({ active }: { active: 'list' | 'map' }) {
  const seg = (label: string, on: boolean) =>
    cn(
      'rounded-full px-4 py-1.5 text-sm transition',
      on ? 'bg-surface font-bold text-text shadow-sm' : 'text-text-sub',
    );
  return (
    <div className="inline-flex items-center rounded-full bg-line/60 p-0.5">
      <Link href="/" className={seg('리스트', active === 'list')}>
        리스트
      </Link>
      <Link href="/map" className={seg('지도', active === 'map')}>
        지도
      </Link>
    </div>
  );
}
