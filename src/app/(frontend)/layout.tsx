import React from 'react';
import '@/globals.css';
import { PT_Sans } from 'next/font/google';

const ptSans = PT_Sans({
  variable: '--font-pt-sans',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'], // normal и bold
});

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="ru">
      <body>
        <main>
          <div className="{`${ptSans.variable} font-sans`}">{children}</div>
        </main>
      </body>
    </html>
  );
}
