import { Button } from '@/lib/components/ui/button';
import type { UiMessages } from '@/lib/i18n/ui-messages';
import {
  ANTIPICK_SORT_DIRECTIONS,
  ANTIPICK_SORT_MODES,
  type AntipickSortDirection,
  type AntipickSortMode,
} from '@/lib/utils/antipick-sort';

type AntipickSortBarProps = {
  mode: AntipickSortMode;
  onModeChange: (next: AntipickSortMode) => void;
  direction: AntipickSortDirection;
  onDirectionChange: (next: AntipickSortDirection) => void;
  messages: Pick<
    UiMessages,
    | 'antipickSortLegend'
    | 'antipickSortData'
    | 'antipickSortStrength'
    | 'antipickSortRole'
    | 'antipickSortDirectionLegend'
    | 'antipickSortAsc'
    | 'antipickSortDesc'
  >;
};

function labelForMode(
  sortMode: AntipickSortMode,
  m: AntipickSortBarProps['messages']
): string {
  if (sortMode === 'data') {
    return m.antipickSortData;
  }
  if (sortMode === 'strength') {
    return m.antipickSortStrength;
  }
  return m.antipickSortRole;
}

function labelForDirection(
  d: AntipickSortDirection,
  m: AntipickSortBarProps['messages']
): string {
  return d === 'asc' ? m.antipickSortAsc : m.antipickSortDesc;
}

export function AntipickSortBar({
  mode,
  onModeChange,
  direction,
  onDirectionChange,
  messages: m,
}: AntipickSortBarProps) {
  return (
    <div className="flex flex-col gap-2.5">
      <fieldset className="m-0 flex flex-col gap-1.5 border-0 p-0">
        <legend className="float-none w-full font-medium text-muted-foreground text-xs">
          {m.antipickSortLegend}
        </legend>
        <div className="flex flex-wrap gap-1.5">
          {ANTIPICK_SORT_MODES.map((sortMode) => (
            <Button
              className="h-7 rounded-md px-2.5 text-xs"
              key={sortMode}
              onClick={() => onModeChange(sortMode)}
              size="sm"
              type="button"
              variant={mode === sortMode ? 'default' : 'outline'}
            >
              {labelForMode(sortMode, m)}
            </Button>
          ))}
        </div>
      </fieldset>
      <fieldset className="m-0 flex flex-col gap-1.5 border-0 p-0">
        <legend className="float-none w-full font-medium text-muted-foreground text-xs">
          {m.antipickSortDirectionLegend}
        </legend>
        <div className="flex flex-wrap gap-1.5">
          {ANTIPICK_SORT_DIRECTIONS.map((d) => (
            <Button
              className="h-7 rounded-md px-2.5 text-xs"
              key={d}
              onClick={() => onDirectionChange(d)}
              size="sm"
              type="button"
              variant={direction === d ? 'default' : 'outline'}
            >
              {labelForDirection(d, m)}
            </Button>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
