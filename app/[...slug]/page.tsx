import { redirect } from 'next/navigation';

/**
 * 루트 catch-all — 정의된 어떤 라우트에도 매칭되지 않는 경로를
 * 서버에서 홈으로 리다이렉트(307)한다.
 * (app/pool/[id] 등 구체 라우트가 우선하므로 정상 경로는 영향 없음)
 */
export default function CatchAll() {
  redirect('/');
}
