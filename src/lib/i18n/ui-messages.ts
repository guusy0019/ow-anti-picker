import type { AppLocale } from './app-locale';

export type UiMessages = {
  appTitle: string;
  appSubtitle: string;
  /** アンチピック JSON の更新日ラベル（日付は別表示） */
  antipickDataUpdatedLabel: string;
  heroPickerHeading: string;
  antipickHeading: string;
  antipickEmpty: string;
  antipickSelectPrompt: string;
  antipickSortLegend: string;
  antipickSortData: string;
  antipickSortStrength: string;
  antipickSortRole: string;
  antipickSortDirectionLegend: string;
  antipickSortAsc: string;
  antipickSortDesc: string;
  reasonLabel: string;
  loading: string;
  loadError: string;
  localeJa: string;
  localeEn: string;
  languageFieldLegend: string;
  strengthStrong: string;
  strengthSituational: string;
  strengthOther: string;
  roleFilterLegend: string;
  roleFilterAll: string;
  roleFilterTank: string;
  roleFilterDamage: string;
  roleFilterSupport: string;
  /** リンク直前まで（例: 本アプリのソースコードは ） */
  footerSourceBeforeGithub: string;
  /** リンク直後（例: で公開しています。） */
  footerSourceAfterGithub: string;
};

const ja: UiMessages = {
  appTitle: 'OW アンチピック',
  appSubtitle: '相手ヒーローを選ぶと、相性の良いピック候補を表示します。',
  antipickDataUpdatedLabel: 'アンチピックデータ更新日',
  heroPickerHeading: '相手ヒーロー',
  antipickHeading: 'アンチピック候補',
  antipickEmpty: 'このヒーロー向けのアンチピックはまだ登録されていません。',
  antipickSelectPrompt:
    '上の一覧からヒーローを選ぶと、画面下部のパネルにアンチピック候補が表示されます。',
  antipickSortLegend: '並べ替え',
  antipickSortData: 'データの順',
  antipickSortStrength: '相性順',
  antipickSortRole: 'ロール順',
  antipickSortDirectionLegend: '順序',
  antipickSortAsc: '昇順',
  antipickSortDesc: '降順',
  reasonLabel: '理由',
  loading: '読み込み中…',
  loadError:
    'データの読み込みに失敗しました。しばらくしてから再度お試しください。',
  localeJa: '日本語',
  localeEn: 'English',
  languageFieldLegend: '表示言語',
  strengthStrong: '強い',
  strengthSituational: '状況次第',
  strengthOther: 'その他',
  roleFilterLegend: 'ロールで絞り込み',
  roleFilterAll: 'すべて',
  roleFilterTank: 'タンク',
  roleFilterDamage: 'ダメージ',
  roleFilterSupport: 'サポート',
  footerSourceBeforeGithub: '本アプリのソースコードは ',
  footerSourceAfterGithub: ' で公開しています。',
};

const en: UiMessages = {
  appTitle: 'OW Anti-pick',
  appSubtitle:
    'Pick an enemy hero to see suggested counter picks and matchup notes.',
  antipickDataUpdatedLabel: 'Antipick data last updated',
  heroPickerHeading: 'Enemy hero',
  antipickHeading: 'Counter picks',
  antipickEmpty: 'No counter picks are listed for this hero yet.',
  antipickSelectPrompt:
    'Pick a hero from the list above. Counter picks appear in the bottom panel.',
  antipickSortLegend: 'Sort',
  antipickSortData: 'Default order',
  antipickSortStrength: 'By matchup',
  antipickSortRole: 'By role',
  antipickSortDirectionLegend: 'Order',
  antipickSortAsc: 'Ascending',
  antipickSortDesc: 'Descending',
  reasonLabel: 'Notes',
  loading: 'Loading…',
  loadError: 'Failed to load data. Please try again later.',
  localeJa: '日本語',
  localeEn: 'English',
  languageFieldLegend: 'Display language',
  strengthStrong: 'Strong',
  strengthSituational: 'Situational',
  strengthOther: 'Other',
  roleFilterLegend: 'Filter by role',
  roleFilterAll: 'All',
  roleFilterTank: 'Tank',
  roleFilterDamage: 'Damage',
  roleFilterSupport: 'Support',
  footerSourceBeforeGithub: 'Source code is available on ',
  footerSourceAfterGithub: '.',
};

export function getUiMessages(locale: AppLocale): UiMessages {
  return locale === 'ja' ? ja : en;
}
