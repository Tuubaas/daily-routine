import Link from 'next/link';
import './globals.css';
import { Inter } from 'next/font/google';
import NavigationMenu from '@/components/NavigationMenu';
import SidebarNavigation from '@/components/NavigationMenu';

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
  const links = [
    { name: 'Home', href: '/' },
    { name: 'Todos', href: '/todos' },
    { name: 'New Commitments', href: '/commitments/new' },
    { name: 'Update Commitment', href: '/commitments/update' },
  ];

  return (
    <html lang="en">
      <body
        className={`${inter.variable} flex flex-col min-h-screen bg-dominant text-black`}
      >
        <div className="flex justify-between items-center text-white p-4">
          <div id="ICON" className="w-12 h-12 bg-white rounded-full"></div>
          <SidebarNavigation links={links} />
        </div>
        <main className="px-4">{children}</main>
      </body>
    </html>
  );
}
