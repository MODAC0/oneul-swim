import { HomeHeader } from '@/components/home/HomeHeader';
import { HomeClient } from '@/components/home/HomeClient';
import { TabBar } from '@/components/layout/TabBar';

export default function HomePage() {
  return (
    <>
      <main className="mx-auto w-full max-w-md px-6 pb-24 pt-8">
        <HomeHeader />
        <div className="mt-4">
          <HomeClient />
        </div>
      </main>
      <TabBar active="home" />
    </>
  );
}
