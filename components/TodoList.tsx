import { db, TodosTable } from '@/lib/drizzle';
import type { Todo } from '@/lib/drizzle';
import dayjs from 'dayjs';
import TodoCheckbox from './TodoCheckbox';

export default async function TodoList() {
  let todos: Todo[];
  try {
    todos = await db.select().from(TodosTable);
  } catch (e: any) {
    if (e.message === `relation "todos" does not exist`) {
      console.log(
        'Table does not exist, creating and seeding it with dummy data now...',
      );
      // Table is not created yet
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
    <div className="flex flex-col border-l h-full">
      <h1>Todos</h1>
      <ul className="flex flex-col">
        {todos.map((todo) => (
          <>
            <TodoCheckbox key={todo.id} todo={todo} />
            {/* <li
            className={`${
              todo.iscompleted ? 'line-through' : ''
            } pt-2 flex justify-between`}
          >
            <p>{todo.text}</p>
            <p>{todo.iscompleted}</p>
          </li> */}
          </>
        ))}
      </ul>
    </div>
  );
}
