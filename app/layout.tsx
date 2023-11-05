import Link from 'next/link';
import './globals.css';
import { Inter } from 'next/font/google';

export const metadata = {
  title: 'Daily routine - Home',
  description: 'My app for controlling my daily routine and my todos',
};

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} flex flex-col min-h-screen`}>
        <div className="flex justify-between items-center text-white p-4">
          <h1 className="text-3xl font-bold">Daily routine</h1>
          <nav className="flex gap-4 [&>*]:p-2">
            <Link href="/" className="hover:underline hover:underline-offset-4">
              Today
            </Link>
            <Link
              href="/commitments/new"
              className="hover:underline hover:underline-offset-4"
            >
              New Commitment
            </Link>
            <Link
              href="/commitments/update"
              className="hover:underline hover:underline-offset-4"
            >
              Update Commitment
            </Link>
            <Link
              href="/todos"
              className="hover:underline hover:underline-offset-4"
            >
              Todos
            </Link>
          </nav>
        </div>
        {children}
      </body>
    </html>
  );
}
