import { computed, ref, type ComputedRef, type Ref } from 'vue';
import enMessages from '@/locales/en.json';
import zhMessages from '@/locales/zh_CN.json';
import type { UiLocale } from '@/utils/settings';

type MessageMap = Record<string, { message: string; description?: string }>;
export type MessageKey = keyof typeof zhMessages;

const messageTable: Record<'zh_CN' | 'en', MessageMap> = {
  zh_CN: zhMessages as MessageMap,
  en: enMessages as MessageMap,
};

function resolveBrowserLocale(): 'zh_CN' | 'en' {
  const ui = chrome.i18n?.getUILanguage?.() ?? navigator.language;
  return ui.toLowerCase().startsWith('zh') ? 'zh_CN' : 'en';
}

function resolveLocale(preferred: UiLocale): 'zh_CN' | 'en' {
  if (preferred === 'auto') return resolveBrowserLocale();
  return preferred;
}

export interface UseI18nReturn {
  locale: Ref<UiLocale>;
  effectiveLocale: ComputedRef<'zh_CN' | 'en'>;
  t: (key: MessageKey, fallback?: string) => string;
  setLocale: (next: UiLocale) => void;
}

export function useI18n(initial: UiLocale = 'auto'): UseI18nReturn {
  const locale = ref<UiLocale>(initial);
  const effectiveLocale = computed(() => resolveLocale(locale.value));

  const t = (key: MessageKey, fallback?: string): string => {
    const table = messageTable[effectiveLocale.value];
    return table[key]?.message ?? fallback ?? String(key);
  };

  const setLocale = (next: UiLocale): void => {
    locale.value = next;
  };

  return { locale, effectiveLocale, t, setLocale };
}
