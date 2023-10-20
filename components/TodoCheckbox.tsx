'use client';
import type { Todo } from '@/lib/drizzle';

export default function TodoCheckbox({ todo }: { todo: Todo }) {
  async function updateTodoState(e: React.FormEvent<HTMLInputElement>) {
    const r = await fetch('/api/todo', {
      method: 'POST',
      body: JSON.stringify({
        id: e.currentTarget.value,
        text: todo.text,
        iscompleted: e.currentTarget.checked || false,
      }),
    });
  }

  return (
    <li className={`${todo.iscompleted ? 'line-through' : ''} pt-2 flex gap-4`}>
      <input
        type="checkbox"
        defaultChecked={todo.iscompleted}
        onChange={updateTodoState}
        name={todo.id.toString()}
        value={todo.id.toString()}
      />
      <label htmlFor={todo.id.toString()}>{todo.text}</label>
    </li>
  );
}
