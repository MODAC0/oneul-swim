import type { MetadataRoute } from 'next';

/** PWA manifest — 홈화면 추가 시 '오늘수영' 앱처럼 동작 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: '오늘수영 — 하남 자유수영',
    short_name: '오늘수영',
    description: '지금 하남에서 자유수영 갈 수 있는 곳을 한눈에.',
    start_url: '/',
    display: 'standalone',
    background_color: '#F4F5F6',
    theme_color: '#0E7C86',
    icons: [
      // TODO: 아이콘 에셋 추가 (192/512). 디자인 확정 후 public/ 에 배치.
    ],
  };
}
