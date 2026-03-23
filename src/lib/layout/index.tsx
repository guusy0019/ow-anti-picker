import type { ReactNode } from 'react';

import { ThemeProvider } from '@/lib/components/theme-provider';
import { LocaleProvider } from '@/lib/i18n/locale-provider';

import { Header } from './components/header';

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          <Header />
          <main className="wrapper flex-1">{children}</main>
        </div>
      </LocaleProvider>
    </ThemeProvider>
  );
};
