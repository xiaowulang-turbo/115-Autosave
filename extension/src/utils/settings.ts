export type ThemeMode = 'auto' | 'light' | 'dark';
export type UiLocale = 'auto' | 'zh_CN' | 'en';

export interface Settings {
  enabled: boolean;
  actionDelay: number;
  autoSelectRecent: boolean;
  autoCloseSuccess: boolean;
  theme: ThemeMode;
  uiLocale: UiLocale;
}

export const DEFAULT_SETTINGS: Settings = {
  enabled: true,
  actionDelay: 500,
  autoSelectRecent: true,
  autoCloseSuccess: true,
  theme: 'auto',
  uiLocale: 'auto',
};

const STORAGE_KEY = 'settings';

export async function getSettings(): Promise<Settings> {
  const raw = await chrome.storage.sync.get(STORAGE_KEY);
  const stored = (raw[STORAGE_KEY] ?? {}) as Partial<Settings>;
  return { ...DEFAULT_SETTINGS, ...stored };
}

export async function saveSettings(partial: Partial<Settings>): Promise<Settings> {
  const next = { ...(await getSettings()), ...partial };
  await chrome.storage.sync.set({ [STORAGE_KEY]: next });
  return next;
}

export function onSettingsChange(handler: (settings: Settings) => void): () => void {
  const listener = (
    changes: { [k: string]: chrome.storage.StorageChange },
    area: chrome.storage.AreaName,
  ) => {
    if (area !== 'sync' || !changes[STORAGE_KEY]) return;
    handler({ ...DEFAULT_SETTINGS, ...(changes[STORAGE_KEY].newValue as Partial<Settings>) });
  };
  chrome.storage.onChanged.addListener(listener);
  return () => chrome.storage.onChanged.removeListener(listener);
}
