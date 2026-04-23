import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Kujua Time Docs',
  description: 'Architecture, operations, and implementation guides for Kujua Time.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
