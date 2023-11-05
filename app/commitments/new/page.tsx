import dayjs from 'dayjs';
import { db, CommitmentsTable } from '@/lib/drizzle';
import Button from '@/components/Button';

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
    <main className="flex justify-center w-full">
      <form
        action={create}
        className="flex flex-col gap-3 max-w-3xl w-full [&>*]:bg-transparent [&>*]:border [&>*]:border-white [&>*]:focus:outline-none [&>*]:focus:ring-0 [&>*]:text-white [&>*]:px-2"
      >
        <input name="date" type="date" defaultValue={today} />
        <textarea className="min-h-[256px]" name="commitments" />
        <Button>Submit</Button>
      </form>
    </main>
  );
}
