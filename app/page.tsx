import Today from '@/components/Today';
import TodoList from '@/components/TodoList';

export const preferredRegion = 'home';
export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <main>
      <div className="flex flex-row [&>div]:p-8 h-full [&>div]:flex-1">
        <Today />
        <TodoList />
      </div>
    </main>
  );
}
