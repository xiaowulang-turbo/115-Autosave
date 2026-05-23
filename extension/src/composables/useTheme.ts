import { ref, watchEffect, type Ref } from 'vue';
import type { ThemeMode } from '@/utils/settings';

function applyTheme(mode: ThemeMode): void {
  const root = document.documentElement;
  if (mode === 'auto') {
    root.removeAttribute('data-theme');
  } else {
    root.setAttribute('data-theme', mode);
  }
}

export interface UseThemeReturn {
  theme: Ref<ThemeMode>;
  setTheme: (next: ThemeMode) => void;
}

export function useTheme(initial: ThemeMode = 'auto'): UseThemeReturn {
  const theme = ref<ThemeMode>(initial);

  watchEffect(() => applyTheme(theme.value));

  const setTheme = (next: ThemeMode): void => {
    theme.value = next;
  };

  return { theme, setTheme };
}
