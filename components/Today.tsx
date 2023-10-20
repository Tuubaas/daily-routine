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
    <div className="flex flex-col h-full">
      <div className="bg-yellow-200 shadow-md">
        <h1 className="mt-8 border-b border-gray-400 pl-8 pr-4">
          <span>{dayjs().format('YYYY-MM-DD')}</span>
        </h1>
        <div className="mb-12">
          {commitments.map((todaysCommitments) => (
            <ul
              key={todaysCommitments.id}
              className="flex flex-col [&>li]:h-8 [&>li]:border-b [&>li]:border-gray-400 [&>li]:pl-8 [&>li]:pr-4"
            >
              {todaysCommitments.commitmentlist.map((commitment, i) => (
                <li key={i} className="flex items-end">
                  <span>{commitment}</span>
                </li>
              ))}
              <li />
              <li />
              <li />
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}
