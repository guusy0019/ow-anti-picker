import { LocaleToggle } from '@/lib/components/locale-toggle';
import { ThemeToggle } from '@/lib/components/theme-toggle';

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 w-full border-border border-b bg-background/80 backdrop-blur-md">
      <section className="wrapper flex items-center justify-end gap-2 py-2">
        <LocaleToggle />
        <ThemeToggle />
      </section>
    </header>
  );
};
