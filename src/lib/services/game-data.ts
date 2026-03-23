import { z } from 'zod';

import { publicUrl } from '@/lib/utils/public-url';

export type HeroProfile = {
  name: string;
  role: string;
  subrole: string;
};

export type AntipickEntry = {
  id: string;
  strength?: string;
  reason?: string;
};

/** `fetchAntipick` の戻り値。`entries` は相手ヒーロー ID → カウンター配列。 */
export type AntipickDataset = {
  entries: Record<string, Array<AntipickEntry>>;
  /** `antipick-*.json` の `_meta.updatedAt`（`YYYY-MM-DD`） */
  updatedAt?: string;
};

const heroProfileSchema = z.object({
  name: z.string(),
  role: z.string(),
  subrole: z.string(),
});

const antipickEntrySchema = z.object({
  id: z.string(),
  strength: z.string().optional(),
  reason: z.string().optional(),
});

const antipickMetaSchema = z.object({
  version: z.string(),
  locale: z.string(),
  updatedAt: z.string(),
});

const looseRecordSchema = z.record(z.string(), z.unknown());

function parseHeroesFile(data: unknown): Record<string, HeroProfile> {
  const record = looseRecordSchema.parse(data);
  const out: Record<string, HeroProfile> = {};
  for (const [key, value] of Object.entries(record)) {
    const parsed = heroProfileSchema.safeParse(value);
    if (parsed.success) {
      out[key] = parsed.data;
    }
  }
  return out;
}

function parseAntipickFile(data: unknown): AntipickDataset {
  const record = looseRecordSchema.parse(data);
  let updatedAt: string | undefined;
  const metaRaw = record._meta;
  if (metaRaw !== undefined) {
    const meta = antipickMetaSchema.safeParse(metaRaw);
    if (meta.success) {
      updatedAt = meta.data.updatedAt;
    }
  }
  const entries: Record<string, Array<AntipickEntry>> = {};
  for (const [key, value] of Object.entries(record)) {
    if (key === '_meta') {
      continue;
    }
    const parsed = z.array(antipickEntrySchema).safeParse(value);
    if (parsed.success) {
      entries[key] = parsed.data;
    }
  }
  return { entries, updatedAt };
}

export async function fetchHeroes(
  locale: 'ja' | 'en'
): Promise<Record<string, HeroProfile>> {
  const res = await fetch(publicUrl(`data/heroes/hero-${locale}.json`));
  if (!res.ok) {
    throw new Error(`Failed to load heroes: ${res.status}`);
  }
  const json: unknown = await res.json();
  return parseHeroesFile(json);
}

export async function fetchAntipick(
  locale: 'ja' | 'en'
): Promise<AntipickDataset> {
  const res = await fetch(publicUrl(`data/antipick/antipick-${locale}.json`));
  if (!res.ok) {
    throw new Error(`Failed to load antipick: ${res.status}`);
  }
  const json: unknown = await res.json();
  return parseAntipickFile(json);
}
