import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Keep Moving',
  description: 'Web MVP',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <nav style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
            <Link href="/">Dashboard</Link>
            <Link href="/clients">Clients</Link>
            <Link href="/bookings">Bookings</Link>
            <Link href="/media">Media</Link>
            <Link href="/subscribe">Subscribe</Link>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </nav>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
