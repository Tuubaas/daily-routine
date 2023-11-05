import React from 'react';
import { db, CommitmentsTable } from '@/lib/drizzle';
import type { Commitment } from '@/lib/drizzle';
import { eq } from 'drizzle-orm';
import dayjs from 'dayjs';

export default async function Today() {
  let commitments: Commitment[] = [];

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
    } else {
      throw e;
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="bg-yellow-200 shadow-md">
        <div className="px-4 flex flex-row justify-between border-b border-gray-400">
          <h1 className="flex items-end pl-4 pt-6">
            <span>{dayjs().format('YYYY-MM-DD')}</span>
          </h1>
        </div>
        <div className="mb-12">
          <ul className="flex flex-col [&>li]:h-8 [&>li]:border-b [&>li]:border-gray-400 [&>li]:pl-8 [&>li]:pr-4">
            {commitments[0] &&
              [commitments[0]].map((todaysCommitments) =>
                todaysCommitments.commitmentlist.map((commitment, i) => (
                  <li key={i} className="flex items-end">
                    <span>{commitment}</span>
                  </li>
                )),
              )}
            <li />
            <li />
            <li />
          </ul>
        </div>
      </div>
      <div className="flex justify-center">
        <a
          href="commitment"
          className="mt-12 border border-black rounded-3xl px-12 py-4 text-xl hover:bg-black/5 cursor-pointer"
        >
          New
        </a>
      </div>
    </div>
  );
}
