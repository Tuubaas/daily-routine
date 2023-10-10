import { db, TodosTable } from '@/lib/drizzle';
import type { Todo } from '@/lib/drizzle';
import { dropTodos, seedTodos } from '@/lib/seed';
import dayjs from 'dayjs';

export default async function Todos() {
  let todos: Todo[];
  try {
    await dropTodos();
    todos = await db.select().from(TodosTable);
  } catch (e: any) {
    if (e.message === `relation "todos" does not exist`) {
      console.log(
        'Table does not exist, creating and seeding it with dummy data now...',
      );
      // Table is not created yet
      await seedTodos();
      todos = await db.select().from(TodosTable);
    } else {
      throw e;
    }
  }

  function compareIsCompleted(a: boolean, b: boolean) {
    return a === b ? 0 : a ? 1 : -1;
  }

  function compareCreationDate(a: Date, b: Date) {
    return dayjs(a).isBefore(dayjs(b)) ? 1 : -1;
  }

  todos.sort((a, b) => {
    return (
      compareIsCompleted(a.iscompleted, b.iscompleted) ||
      compareCreationDate(a.createdAt, b.createdAt)
    );
  });

  return (
    <div className="flex flex-col border-l">
      <h1>Todos</h1>
      {todos.map((todo) => (
        <ul key={todo.id} className="flex flex-col">
          <li
            className={`${
              todo.iscompleted ? 'line-through' : ''
            } pt-2 flex justify-between`}
          >
            <p>{todo.text}</p>
            <p>{todo.iscompleted}</p>
          </li>
        </ul>
      ))}
    </div>
  );
}
