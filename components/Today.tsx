import React from 'react';
import { db, CommitmentsTable } from '@/lib/drizzle';
import type { Commitment } from '@/lib/drizzle';
import { eq } from 'drizzle-orm';
import dayjs from 'dayjs';
import Button from './Button';

export default async function Today() {
  let commitments: Commitment[] = [
    {
      id: 1,
      date: '2023-11-07',
      commitmentlist: ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'],
      createdAt: new Date('2021-11-07T20:00:00.000Z'),
    },
  ];

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
      <div className="bg-white shadow-md">
        <div className="px-4 flex flex-row justify-between border-b border-gray-400">
          <h2 className="flex items-end pl-4 pt-6">
            <span>{dayjs().format('YYYY-MM-DD')}</span>
          </h2>
        </div>
        <div className="mb-12">
          <ul className="flex flex-col">
            {commitments[0] &&
              [commitments[0]].map((todaysCommitments) =>
                todaysCommitments.commitmentlist.map((commitment, i) => (
                  <li
                    key={i}
                    className="items-end px-4 py-2 list-disc list-inside"
                  >
                    <span>{commitment}</span>
                  </li>
                )),
              )}
          </ul>
        </div>
      </div>
      <div className="flex justify-center mt-12">
        <Button as="link" href="commitment">
          New
        </Button>
      </div>
    </div>
  );
}
