import Today from '@/components/Today';

export const preferredRegion = 'home';
export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <main className="mt-16">
      <Today />
    </main>
  );
}
