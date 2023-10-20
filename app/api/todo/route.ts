import { db, TodosTable } from '@/lib/drizzle';
import { eq } from 'drizzle-orm';

export async function POST(req: Request) {
  console.log('POST');

  const body = await req.json();
  console.log(body);

  const { id, text, iscompleted } = body;

  if (!id || !text || !iscompleted === null || !iscompleted === undefined) {
    return Response.json({ message: 'Missing required fields' });
  }

  try {
    await db
      .update(TodosTable)
      .set({
        text,
        iscompleted: iscompleted,
      })
      .where(eq(TodosTable.id, id));

    return Response.json({ message: 'Todo updated successfully' });
  } catch (e: any) {
    return Response.json({ message: e.message });
  }
}
