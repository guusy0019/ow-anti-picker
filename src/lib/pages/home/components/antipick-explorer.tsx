import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';

import { AntipickSortBar } from '@/lib/components/antipick-sort-bar';
import { HeroRoleFilterBar } from '@/lib/components/hero-role-filter';
import { Badge } from '@/lib/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/lib/components/ui/card';
import type { AppLocale } from '@/lib/i18n/app-locale';
import { useLocale } from '@/lib/i18n/locale-provider';
import { getUiMessages } from '@/lib/i18n/ui-messages';
import type { AntipickEntry, HeroProfile } from '@/lib/services/game-data';
import { fetchAntipick, fetchHeroes } from '@/lib/services/game-data';
import {
  type AntipickSortDirection,
  type AntipickSortMode,
  sortAntipickEntries,
} from '@/lib/utils/antipick-sort';
import { formatIsoDateForLocale } from '@/lib/utils/format-iso-date';
import { groupHeroesByRoleAndSubrole } from '@/lib/utils/hero-grouping';
import { heroPortraitSrc } from '@/lib/utils/hero-image-basename';
import {
  filterHeroRoleSections,
  type HeroRoleFilter,
} from '@/lib/utils/hero-role-filter';

const REPO_URL = 'https://github.com/guusy0019/ow-anti-picker';

function strengthLabel(
  strength: string | undefined,
  t: ReturnType<typeof getUiMessages>
): string {
  if (strength === 'strong') {
    return t.strengthStrong;
  }
  if (strength === 'situational') {
    return t.strengthSituational;
  }
  if (strength) {
    return strength;
  }
  return t.strengthOther;
}

function strengthBadgeVariant(
  strength: string | undefined
): 'default' | 'secondary' | 'outline' {
  if (strength === 'strong') {
    return 'default';
  }
  if (strength === 'situational') {
    return 'secondary';
  }
  return 'outline';
}

type HeroTileProps = {
  heroId: string;
  profile: HeroProfile;
  selected: boolean;
  onSelect: () => void;
  /** グループ見出しでロールを出すときは false にしてタイル内は名前のみ */
  showRoleMeta?: boolean;
  /** 一覧グリッド用の小さめタイル */
  compact?: boolean;
};

function HeroTile({
  heroId,
  profile,
  selected,
  onSelect,
  showRoleMeta = true,
  compact = false,
}: HeroTileProps) {
  const src = heroPortraitSrc(heroId);
  const round = compact ? 'rounded-lg' : 'rounded-xl';
  const ring = compact ? 'ring-1' : 'ring-2';
  return (
    <button
      aria-pressed={selected}
      className={`group flex flex-col overflow-hidden border bg-card text-left text-card-foreground shadow-sm ring-offset-background transition-all hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${round} ${
        selected ? `border-primary ${ring} ring-primary/30` : 'border-border'
      }`}
      onClick={onSelect}
      type="button"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        <img
          alt={profile.name}
          className="size-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
          decoding="async"
          loading="lazy"
          src={src}
        />
      </div>
      <div
        className={`flex flex-col gap-0.5 ${compact ? 'px-1 py-1' : 'px-2 py-2'}`}
      >
        <span
          className={`truncate font-medium leading-tight ${compact ? 'text-xs leading-snug' : 'text-sm'}`}
        >
          {profile.name}
        </span>
        {showRoleMeta ? (
          <span className="truncate text-muted-foreground text-xs">
            {profile.role} · {profile.subrole}
          </span>
        ) : null}
      </div>
    </button>
  );
}

type AntipickPanelProps = {
  selectedId: string | null;
  heroes: Record<string, HeroProfile>;
  entries: Array<AntipickEntry> | undefined;
  locale: AppLocale;
  t: ReturnType<typeof getUiMessages>;
};

function AntipickPanel({
  selectedId,
  heroes,
  entries,
  locale,
  t,
}: AntipickPanelProps) {
  const [sortMode, setSortMode] = useState<AntipickSortMode>('data');
  const [sortDirection, setSortDirection] =
    useState<AntipickSortDirection>('asc');

  const sortedEntries = useMemo(() => {
    if (!entries || entries.length === 0) {
      return entries;
    }
    return sortAntipickEntries(
      entries,
      heroes,
      sortMode,
      locale,
      sortDirection
    );
  }, [entries, heroes, locale, sortDirection, sortMode]);
  if (!selectedId) {
    return (
      <Card className="border-dashed shadow-none">
        <CardHeader className="gap-1 py-3">
          <CardTitle className="text-base">{t.antipickHeading}</CardTitle>
          <CardDescription className="text-xs">
            {t.antipickSelectPrompt}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const selectedName = heroes[selectedId]?.name ?? selectedId;

  if (!entries || entries.length === 0) {
    return (
      <Card className="shadow-none">
        <CardHeader className="gap-1 py-3">
          <CardTitle className="text-base">{t.antipickHeading}</CardTitle>
          <CardDescription className="text-xs">
            {selectedName} — {t.antipickEmpty}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const list = sortedEntries ?? entries;

  return (
    <Card className="gap-0 border-0 py-0 shadow-none ring-0">
      <CardHeader className="space-y-3 border-border border-b py-3 pb-3">
        <div className="space-y-1">
          <CardTitle className="text-base">{t.antipickHeading}</CardTitle>
          <CardDescription className="text-xs">{selectedName}</CardDescription>
        </div>
        <AntipickSortBar
          direction={sortDirection}
          messages={{
            antipickSortAsc: t.antipickSortAsc,
            antipickSortData: t.antipickSortData,
            antipickSortDesc: t.antipickSortDesc,
            antipickSortDirectionLegend: t.antipickSortDirectionLegend,
            antipickSortLegend: t.antipickSortLegend,
            antipickSortRole: t.antipickSortRole,
            antipickSortStrength: t.antipickSortStrength,
          }}
          mode={sortMode}
          onDirectionChange={setSortDirection}
          onModeChange={setSortMode}
        />
      </CardHeader>
      <CardContent className="divide-y divide-border px-0 pt-2 pb-0">
        {list.map((entry) => {
          const counter = heroes[entry.id];
          const name = counter?.name ?? entry.id;
          const roleLine =
            counter !== undefined
              ? `${counter.role} · ${counter.subrole}`
              : undefined;
          return (
            <div className="space-y-2 px-3 py-3 first:pt-0" key={entry.id}>
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative size-12 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                  <img
                    alt={name}
                    className="size-full object-cover object-top"
                    decoding="async"
                    loading="lazy"
                    src={heroPortraitSrc(entry.id)}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-base leading-snug">{name}</p>
                  {roleLine ? (
                    <p className="text-muted-foreground text-xs">{roleLine}</p>
                  ) : null}
                </div>
                <Badge variant={strengthBadgeVariant(entry.strength)}>
                  {strengthLabel(entry.strength, t)}
                </Badge>
              </div>
              {entry.reason ? (
                <p className="text-muted-foreground text-sm leading-relaxed">
                  <span className="font-medium text-foreground">
                    {t.reasonLabel}:{' '}
                  </span>
                  {entry.reason}
                </p>
              ) : null}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

export function AntipickExplorer() {
  const { locale } = useLocale();
  const t = getUiMessages(locale);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [roleFilter, setRoleFilter] = useState<HeroRoleFilter>('all');

  const heroesQuery = useQuery({
    queryKey: ['heroes', locale],
    queryFn: () => fetchHeroes(locale),
    staleTime: 60 * 60 * 1000,
  });

  const antipickQuery = useQuery({
    queryKey: ['antipick', locale],
    queryFn: () => fetchAntipick(locale),
    staleTime: 60 * 60 * 1000,
  });

  const heroGroups = useMemo(() => {
    if (!heroesQuery.data) {
      return [];
    }
    return groupHeroesByRoleAndSubrole(heroesQuery.data, locale);
  }, [heroesQuery.data, locale]);

  const visibleRoleGroups = useMemo(
    () => filterHeroRoleSections(heroGroups, roleFilter, locale),
    [heroGroups, roleFilter, locale]
  );

  const visibleHeroIds = useMemo(() => {
    const ids = new Set<string>();
    for (const g of visibleRoleGroups) {
      for (const s of g.sections) {
        for (const id of s.heroIds) {
          ids.add(id);
        }
      }
    }
    return ids;
  }, [visibleRoleGroups]);

  useEffect(() => {
    if (selectedId && !visibleHeroIds.has(selectedId)) {
      setSelectedId(null);
    }
  }, [selectedId, visibleHeroIds]);

  const antipickForSelected =
    selectedId && antipickQuery.data
      ? antipickQuery.data.entries[selectedId]
      : undefined;

  const isLoading = heroesQuery.isPending || antipickQuery.isPending;
  const isError = heroesQuery.isError || antipickQuery.isError;

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center rounded-xl border border-border border-dashed bg-muted/20">
        <p className="text-muted-foreground">{t.loading}</p>
      </div>
    );
  }

  if (isError || !heroesQuery.data || !antipickQuery.data) {
    return (
      <Card className="border-destructive/40 bg-destructive/5">
        <CardHeader>
          <CardTitle className="text-destructive">{t.loadError}</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  const heroes = heroesQuery.data;
  const antipickDataset = antipickQuery.data;
  const antipickUpdatedDisplay =
    antipickDataset.updatedAt !== undefined &&
    antipickDataset.updatedAt.length > 0
      ? formatIsoDateForLocale(antipickDataset.updatedAt, locale)
      : null;

  return (
    <div className="relative">
      <div className="flex flex-col gap-10 pb-[min(42vh,18rem)]">
        <header className="space-y-2">
          <h1 className="text-balance font-semibold text-3xl tracking-tight md:text-4xl">
            {t.appTitle}
          </h1>
          <p className="max-w-2xl text-muted-foreground text-sm leading-relaxed md:text-base">
            {t.appSubtitle}
          </p>
          <div className="space-y-1">
            {antipickUpdatedDisplay ? (
              <p className="text-muted-foreground text-xs">
                {t.antipickDataUpdatedLabel}: {antipickUpdatedDisplay}
              </p>
            ) : null}
            <p className="text-muted-foreground text-xs">
              {t.footerSourceBeforeGithub}
              <a
                className="text-foreground underline-offset-4 hover:underline"
                href={REPO_URL}
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </a>
              {t.footerSourceAfterGithub}
            </p>
          </div>
        </header>

        <HeroRoleFilterBar
          messages={{
            roleFilterAll: t.roleFilterAll,
            roleFilterDamage: t.roleFilterDamage,
            roleFilterLegend: t.roleFilterLegend,
            roleFilterSupport: t.roleFilterSupport,
            roleFilterTank: t.roleFilterTank,
          }}
          onChange={setRoleFilter}
          value={roleFilter}
        />

        <section className="space-y-8">
          <h2 className="font-semibold text-lg tracking-tight">
            {t.heroPickerHeading}
          </h2>
          <div className="flex flex-col gap-10">
            {visibleRoleGroups.map((roleGroup) => (
              <div className="space-y-6" key={roleGroup.role}>
                <h3 className="border-border border-b pb-2 font-semibold text-xl tracking-tight">
                  {roleGroup.role}
                </h3>
                <div className="flex flex-col gap-8">
                  {roleGroup.sections.map((section) => (
                    <div
                      className="space-y-3"
                      key={`${roleGroup.role}-${section.subrole}`}
                    >
                      <h4 className="font-medium text-muted-foreground text-sm">
                        {section.subrole}
                      </h4>
                      <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8">
                        {section.heroIds.map((id) => {
                          const profile = heroes[id];
                          if (!profile) {
                            return null;
                          }
                          return (
                            <HeroTile
                              compact
                              heroId={id}
                              key={id}
                              onSelect={() => setSelectedId(id)}
                              profile={profile}
                              selected={selectedId === id}
                              showRoleMeta={false}
                            />
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section
        aria-label={t.antipickHeading}
        className="fixed inset-x-0 bottom-0 z-30 border-border border-t bg-background/95 shadow-[0_-4px_24px_oklch(0_0_0/0.08)] backdrop-blur-md dark:shadow-[0_-4px_24px_oklch(0_0_0/0.35)]"
      >
        <div className="wrapper max-h-[min(42vh,20rem)] overflow-y-auto py-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))]">
          <AntipickPanel
            entries={antipickForSelected}
            heroes={heroes}
            key={selectedId ?? 'none'}
            locale={locale}
            selectedId={selectedId}
            t={t}
          />
        </div>
      </section>
    </div>
  );
}
