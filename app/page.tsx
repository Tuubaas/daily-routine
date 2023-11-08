import Today from '@/components/Today';

export const preferredRegion = 'home';
export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <>
      <h1 className="py-4">Home</h1>
      <Today />
    </>
  );
}
