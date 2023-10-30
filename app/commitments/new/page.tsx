import dayjs from 'dayjs';
import { db, CommitmentsTable } from '@/lib/drizzle';

export default function Page() {
  async function create(formData: FormData) {
    'use server';

    const dateInput = formData.get('date');
    const commitmentsInput = formData.get('commitments');

    if (!dateInput || !commitmentsInput) {
      return;
    }

    const date = dateInput as string;
    const commitments = commitmentsInput as string;

    const commitmentlist = commitments.split('\n');

    await db.insert(CommitmentsTable).values({
      date,
      commitmentlist,
    });
  }

  const today = dayjs().add(1, 'day').format('YYYY-MM-DD');

  return (
    <main className="flex justify-center">
      <form action={create} className="flex flex-col max-w-3xl w-full">
        <input name="date" type="date" defaultValue={today} />
        <textarea className="border min-h-[256px]" name="commitments" />
        <button>Submit</button>
      </form>
    </main>
  );
}
