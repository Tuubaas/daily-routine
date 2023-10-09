import {
  date,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';

export const UsersTable = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull(),
    image: text('image').notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex('unique_idx').on(users.email),
    };
  },
);

export const CommitmentsTable = pgTable(
  'commitments',
  {
    id: serial('id').primaryKey(),
    date: date('date').notNull(),
    commitmentlist: text('commitmentlist').array().notNull(),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
  },
  (commitments) => {
    return {
      uniqueIdx: uniqueIndex('unique_idx').on(commitments.date),
    };
  },
);

export type Commitment = InferSelectModel<typeof CommitmentsTable>;
export type NewCommitment = InferInsertModel<typeof CommitmentsTable>;

export type User = InferSelectModel<typeof UsersTable>;
export type NewUser = InferInsertModel<typeof UsersTable>;

// Connect to Vercel Postgres
export const db = drizzle(sql);
