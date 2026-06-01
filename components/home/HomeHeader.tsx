import { IconPin, IconBell, IconSettings } from '@/components/ui/icons';

/** 홈 헤더 — 위치(하남시) + 알림/설정. (아이콘 액션은 추후 연결) */
export function HomeHeader() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <IconPin className="size-4 text-text" />
        <span className="text-lg font-bold text-text">하남시</span>
      </div>
      <div className="flex items-center gap-4 text-text">
        <button type="button" aria-label="알림" className="text-text">
          <IconBell className="size-[22px]" />
        </button>
        <button type="button" aria-label="설정" className="text-text">
          <IconSettings className="size-[22px]" />
        </button>
      </div>
    </header>
  );
}
