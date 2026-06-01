'use client';

import { useState } from 'react';
import { buttonClass, Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { IconFlag, IconCamera } from '@/components/ui/icons';

const REASONS = ['자유수영 시간', '요금', '휴관/임시변경', '기타'];

/**
 * "정보 틀렸어요 제보" 트리거 + BottomSheet (Figma Report 19:129 바인딩).
 * v1은 백엔드 無 → 제출 시 확인 상태만 표시. TODO: Tally/구글폼 연동 또는 Supabase.
 */
export function ReportSheet({ poolName }: { poolName: string }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [sent, setSent] = useState(false);

  const close = () => {
    setOpen(false);
    setSent(false);
    setReason(null);
    setText('');
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={buttonClass('outline')}
      >
        <IconFlag className="size-[18px]" />
        정보 틀렸어요 제보
      </button>

      {open && (
        <div className="fixed inset-0 z-50 mx-auto flex w-full max-w-md flex-col justify-end">
          <button
            type="button"
            aria-label="닫기"
            onClick={close}
            className="absolute inset-0 bg-black/40"
          />
          <div className="relative rounded-t-sheet bg-surface px-5 pb-6 pt-3">
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-line" />

            {sent ? (
              <div className="py-10 text-center">
                <p className="text-lg font-bold text-text">제보 감사합니다!</p>
                <p className="mt-2 text-sm text-text-sub">
                  확인 후 정보에 반영할게요.
                </p>
                <Button className="mt-6" onClick={close}>
                  닫기
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-bold text-text">
                  정보 틀렸어요 제보
                </h2>
                <p className="mt-2 text-sm text-text-sub">{poolName}</p>

                <p className="mt-4 text-sm font-medium text-text">
                  무엇이 다른가요?
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {REASONS.map((r) => (
                    <Chip
                      key={r}
                      selected={reason === r}
                      onClick={() => setReason(r)}
                    >
                      {r}
                    </Chip>
                  ))}
                </div>

                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="예) 토요일 16:00 자유수영이 없어졌어요"
                  className="mt-4 h-20 w-full resize-none rounded-input border border-line bg-bg p-3.5 text-sm text-text outline-none placeholder:text-text-sub focus:border-primary"
                />

                <label className="mt-3 flex cursor-pointer items-center justify-center gap-1.5 rounded-input border border-line bg-bg py-4 text-sm text-text-sub">
                  <IconCamera className="size-[18px]" />
                  사진 첨부 (선택)
                  <input type="file" accept="image/*" className="hidden" />
                </label>

                <Button
                  className="mt-4"
                  disabled={!reason}
                  onClick={() => setSent(true)}
                >
                  제보 보내기
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
