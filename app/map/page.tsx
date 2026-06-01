import { Header } from '@/components/layout/Header';
import { ViewToggle } from '@/components/home/ViewToggle';
import { MapView } from '@/components/map/MapView';
import { TabBar } from '@/components/layout/TabBar';

export default function MapPage() {
  return (
    <>
      <main className="mx-auto w-full max-w-md px-6 pb-24 pt-12">
        <Header variant="location" right={<ViewToggle active="map" />} />
        <div className="mt-4">
          <MapView />
        </div>
      </main>
      <TabBar active="home" />
    </>
  );
}
