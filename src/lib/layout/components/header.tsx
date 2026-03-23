import { Link } from '@tanstack/react-router';

import { LocaleToggle } from '@/lib/components/locale-toggle';
import { ThemeToggle } from '@/lib/components/theme-toggle';
import { publicUrl } from '@/lib/utils/public-url';

const logoAlt =
  'ローズゴールドの円形ロゴ。山の稜線のようなシンボルと軌道を思わせる装飾が描かれている。';

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 w-full border-border border-b bg-background/80 backdrop-blur-md">
      <section className="wrapper flex items-center justify-between gap-2 py-2">
        <Link
          className="flex min-w-0 items-center gap-2.5 rounded-md outline-offset-2 focus-visible:outline focus-visible:outline-ring"
          to="/"
        >
          <img
            alt={logoAlt}
            className="size-9 shrink-0 rounded-md bg-card object-contain p-0.5 ring-1 ring-border/60"
            height={36}
            src={publicUrl('logo.png')}
            width={36}
          />
          <span className="truncate font-semibold text-foreground text-sm tracking-tight sm:text-base">
            OW アンチピック
          </span>
        </Link>
        <div className="flex shrink-0 items-center gap-2">
          <LocaleToggle />
          <ThemeToggle />
        </div>
      </section>
    </header>
  );
};
