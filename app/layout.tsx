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
      <body className={`${inter.variable} flex justify-center`}>
        <div className="max-w-5xl min-h-screen">{children}</div>
      </body>
    </html>
  );
}
