import { sql } from '@vercel/postgres';
import { db } from '@/lib/drizzle';
import {
  UsersTable,
  User,
  NewUser,
  CommitmentsTable,
  Commitment,
  NewCommitment,
} from './drizzle';

const newUsers: NewUser[] = [
  {
    name: 'Guillermo Rauch',
    email: 'rauchg@vercel.com',
    image:
      'https://pbs.twimg.com/profile_images/1576257734810312704/ucxb4lHy_400x400.jpg',
  },
  {
    name: 'Lee Robinson',
    email: 'lee@vercel.com',
    image:
      'https://pbs.twimg.com/profile_images/1587647097670467584/adWRdqQ6_400x400.jpg',
  },
  {
    name: 'Steven Tey',
    email: 'stey@vercel.com',
    image:
      'https://pbs.twimg.com/profile_images/1506792347840888834/dS-r50Je_400x400.jpg',
  },
];

export async function seed() {
  // Create table with raw SQL
  const createTable = await sql.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        image VARCHAR(255),
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
  `);
  console.log(`Created "users" table`);

  const insertedUsers: User[] = await db
    .insert(UsersTable)
    .values(newUsers)
    .returning();
  console.log(`Seeded ${insertedUsers.length} users`);

  return {
    createTable,
    insertedUsers,
  };
}

const newCommitments: NewCommitment[] = [
  {
    date: '2023-10-09',
    commitmentlist: [
      'Jag ska gå upp ur sängen, utan att ga fastnat i telefonen',
      'Medan Hanna duschar ska jag bädda sängen',
      'Medan Hanna duschar ska jag och ta fram kläder för dagen',
      'Medan Hanna duschar ska jag även förbereda frukost',
      'Så fort Hanna duschat klart ska jag gå in i duschen',
      'När jag stänger datorn för lunch ska jag värma mat ohc äta direkt',
      'Efter att jag ätit lunch ska jag städa undan i köket direkt',
      'När jag har ätitt middag ska jag programmera i 3 timmar',
    ],
  },
];

export async function seedCommitments() {
  const createTable = await sql.query(`
      CREATE TABLE IF NOT EXISTS commitments (
        id SERIAL PRIMARY KEY,
        date DATE NOT NULL,
        commitmentlist text[] NOT NULL,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
  `);
  console.log(`Created "commitments" table`);

  const insertedCommitments: Commitment[] = await db
    .insert(CommitmentsTable)
    .values(newCommitments)
    .returning();
  console.log(`Seeded ${insertedCommitments.length} commitments`);

  return {
    createTable,
    insertedCommitments,
  };
}

export function dropCommitments() {
  return sql.query(`DROP TABLE IF EXISTS commitments`);
}
