import { Button } from '@/lib/components/ui/button';
import type { UiMessages } from '@/lib/i18n/ui-messages';
import {
  HERO_ROLE_FILTER_VALUES,
  type HeroRoleFilter,
} from '@/lib/utils/hero-role-filter';

type HeroRoleFilterProps = {
  value: HeroRoleFilter;
  onChange: (next: HeroRoleFilter) => void;
  messages: Pick<
    UiMessages,
    | 'roleFilterLegend'
    | 'roleFilterAll'
    | 'roleFilterTank'
    | 'roleFilterDamage'
    | 'roleFilterSupport'
  >;
};

function labelForFilter(
  filter: HeroRoleFilter,
  m: HeroRoleFilterProps['messages']
): string {
  if (filter === 'all') {
    return m.roleFilterAll;
  }
  if (filter === 'tank') {
    return m.roleFilterTank;
  }
  if (filter === 'damage') {
    return m.roleFilterDamage;
  }
  return m.roleFilterSupport;
}

export function HeroRoleFilterBar({
  value,
  onChange,
  messages: m,
}: HeroRoleFilterProps) {
  return (
    <fieldset className="m-0 flex flex-col gap-2 border-0 p-0">
      <legend className="float-none w-full font-medium text-muted-foreground text-sm">
        {m.roleFilterLegend}
      </legend>
      <div className="flex flex-wrap gap-2">
        {HERO_ROLE_FILTER_VALUES.map((filter) => (
          <Button
            className="h-8 rounded-md px-3 text-xs"
            key={filter}
            onClick={() => onChange(filter)}
            size="sm"
            type="button"
            variant={value === filter ? 'default' : 'outline'}
          >
            {labelForFilter(filter, m)}
          </Button>
        ))}
      </div>
    </fieldset>
  );
}
