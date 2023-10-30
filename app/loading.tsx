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

export default function Loading({}: {}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} [&>main]:min-h-screen flex justify-center`}
      >
        <div className="max-w-5xl">LOADING...</div>
      </body>
    </html>
  );
}
