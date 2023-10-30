import { db, CommitmentsTable } from '@/lib/drizzle';
import type { Commitment } from '@/lib/drizzle';
import { eq } from 'drizzle-orm';
import dayjs, { Dayjs } from 'dayjs';
import { update } from './actions';

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  let date: Dayjs;

  if (!searchParams) {
    throw new Error('Error with searchParams');
  } else if (Array.isArray(searchParams.date)) {
    throw new Error("Can't supply multiple dates");
  } else if (!searchParams.date) {
    date = dayjs();
  } else {
    date = dayjs(searchParams.date);
  }
  let commitments = await db
    .select()
    .from(CommitmentsTable)
    .where(eq(CommitmentsTable.date, date.format('YYYY-MM-DD')));

  const updateWithDate = update.bind(null, date.format('YYYY-MM-DD'));

  return (
    <div>
      <h1>{dayjs().format('YYYY-MM-DD')}</h1>
      <form action={updateWithDate}>
        <textarea
          name="commitments"
          defaultValue={commitments[0].commitmentlist.join('\n')}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
