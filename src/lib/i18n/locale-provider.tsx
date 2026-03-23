import { createContext, useContext, useMemo, useState } from 'react';

import type { AppLocale } from './app-locale';
import { parseAppLocale } from './app-locale';

type LocaleProviderProps = {
  children: React.ReactNode;
  defaultLocale?: AppLocale;
  storageKey?: string;
};

type LocaleProviderState = {
  locale: AppLocale;
  setLocale: (locale: AppLocale) => void;
};

const LocaleProviderContext = createContext<LocaleProviderState | null>(null);

export function LocaleProvider({
  children,
  defaultLocale = 'ja',
  storageKey = 'ow-anti-picker-locale',
  ...props
}: Readonly<LocaleProviderProps>) {
  const [locale, setLocaleState] = useState<AppLocale>(() => {
    const stored = parseAppLocale(globalThis.localStorage.getItem(storageKey));
    return stored ?? defaultLocale;
  });

  const value = useMemo(
    () => ({
      locale,
      setLocale: (next: AppLocale) => {
        globalThis.localStorage.setItem(storageKey, next);
        setLocaleState(next);
      },
    }),
    [locale, storageKey]
  );

  return (
    <LocaleProviderContext.Provider {...props} value={value}>
      {children}
    </LocaleProviderContext.Provider>
  );
}

export function useLocale(): LocaleProviderState {
  const context = useContext(LocaleProviderContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
