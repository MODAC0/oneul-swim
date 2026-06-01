'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * 안전망 — catch-all/페이지 리다이렉트로 대부분 처리되지만,
 * notFound()가 직접 호출되는 경우를 대비해 클라이언트에서 홈으로 보낸다.
 * (not-found.tsx의 서버 redirect()는 Next에서 동작하지 않아 클라이언트 처리)
 */
export default function NotFound() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/');
  }, [router]);
  return null;
}
