import type { Dayjs } from 'dayjs';
import { db, CommitmentsTable } from '@/lib/drizzle';
import { eq } from 'drizzle-orm';

export async function update(date: string, formData: FormData) {
  'use server';

  const commitmentsInput = formData.get('commitments');

  if (!commitmentsInput) {
    return;
  }

  const commitments = commitmentsInput as string;
  const commitmentlist = commitments.split('\n');

  try {
    await db
      .update(CommitmentsTable)
      .set({
        date: date,
        commitmentlist,
      })
      .where(eq(CommitmentsTable.date, date));
  } catch (e) {
    throw new Error('Update failed');
  }

  return null;
}
