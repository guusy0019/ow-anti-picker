import { Button } from '@/lib/components/ui/button';
import { useLocale } from '@/lib/i18n/locale-provider';
import { getUiMessages } from '@/lib/i18n/ui-messages';

export function LocaleToggle() {
  const { locale, setLocale } = useLocale();
  const t = getUiMessages(locale);

  return (
    <fieldset className="m-0 flex rounded-lg border border-border bg-muted/40 p-0.5 dark:bg-muted/20">
      <legend className="sr-only">{t.languageFieldLegend}</legend>
      <Button
        className="h-7 rounded-md px-2.5 text-xs"
        onClick={() => setLocale('ja')}
        size="sm"
        type="button"
        variant={locale === 'ja' ? 'default' : 'ghost'}
      >
        {t.localeJa}
      </Button>
      <Button
        className="h-7 rounded-md px-2.5 text-xs"
        onClick={() => setLocale('en')}
        size="sm"
        type="button"
        variant={locale === 'en' ? 'default' : 'ghost'}
      >
        {t.localeEn}
      </Button>
    </fieldset>
  );
}
