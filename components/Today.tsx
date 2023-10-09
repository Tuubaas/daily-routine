import React from 'react';
import { db, CommitmentsTable } from '@/lib/drizzle';
import type { Commitment } from '@/lib/drizzle';
import { eq } from 'drizzle-orm';
import dayjs from 'dayjs';
import { seedCommitments } from '@/lib/seed';

export default async function Today() {
  let commitments: Commitment[];

  try {
    commitments = await db
      .select()
      .from(CommitmentsTable)
      .where(eq(CommitmentsTable.date, dayjs().format('YYYY-MM-DD')));
  } catch (e: any) {
    if (e.message === `relation "commitments" does not exist`) {
      console.log(
        'Table does not exist, creating and seeding it with dummy data now...',
      );
      // Table is not created yet
      await seedCommitments();
      commitments = await db.select().from(CommitmentsTable);
    } else {
      throw e;
    }
  }

  return (
    <div className="flex flex-col">
      <h1>{dayjs().format('YYYY-MM-DD')}</h1>
      {commitments.map((todaysCommitments) => (
        <ul key={todaysCommitments.id} className="flex flex-col">
          {todaysCommitments.commitmentlist.map((commitment, i) => (
            <li key={i}>{commitment}</li>
          ))}
        </ul>
      ))}
    </div>
  );
}
