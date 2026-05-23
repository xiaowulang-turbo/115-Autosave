import { en } from './en';
import { zh, type Dictionary } from './zh';

export type Locale = 'zh' | 'en';

export const dictionaries: Record<Locale, Dictionary> = { zh, en };

export const useDict = (locale: Locale): Dictionary => dictionaries[locale];
