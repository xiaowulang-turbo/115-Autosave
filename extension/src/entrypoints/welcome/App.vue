<script setup lang="ts">
import { onMounted } from 'vue';
import LangSwitch from '@/components/LangSwitch.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';
import { useI18n } from '@/composables/useI18n';
import { useTheme } from '@/composables/useTheme';
import {
  DEFAULT_SETTINGS,
  getSettings,
  onSettingsChange,
  saveSettings,
  type ThemeMode,
  type UiLocale,
} from '@/utils/settings';

const { locale, t } = useI18n(DEFAULT_SETTINGS.uiLocale);
const { theme } = useTheme(DEFAULT_SETTINGS.theme);

const WEBSITE_URL = 'https://115-auto-save.vercel.app';

onMounted(async () => {
  const settings = await getSettings();
  locale.value = settings.uiLocale;
  theme.value = settings.theme;
  onSettingsChange((next) => {
    locale.value = next.uiLocale;
    theme.value = next.theme;
  });
});

const updateLocale = (next: UiLocale): void => {
  locale.value = next;
  void saveSettings({ uiLocale: next });
};

const updateTheme = (next: ThemeMode): void => {
  theme.value = next;
  void saveSettings({ theme: next });
};

const openSettings = (): void => {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('/options.html'));
  }
};

const openWebsite = (): void => {
  window.open(WEBSITE_URL, '_blank', 'noopener');
};
</script>

<template>
  <main class="page">
    <header class="topbar">
      <span class="brand">115 Auto Save</span>
      <div class="topbar-actions">
        <ThemeToggle
          :model-value="theme"
          :labels="{ auto: t('themeAuto'), light: t('themeLight'), dark: t('themeDark') }"
          @update:model-value="updateTheme"
        />
        <LangSwitch
          :model-value="locale"
          @update:model-value="updateLocale"
        />
      </div>
    </header>

    <section class="hero">
      <h1>{{ t('welcomeTitle') }}</h1>
      <p class="subtitle">
        {{ t('welcomeSubtitle') }}
      </p>
      <p class="intro">
        {{ t('welcomeIntro') }}
      </p>

      <div class="cta">
        <button
          class="btn btn-primary"
          @click="openSettings"
        >
          {{ t('openSettings') }}
        </button>
        <button
          class="btn btn-ghost"
          @click="openWebsite"
        >
          {{ t('openWebsite') }}
        </button>
      </div>
    </section>

    <section class="steps">
      <h2>{{ t('stepListTitle') }}</h2>
      <ol>
        <li>
          <strong>{{ t('step1Title') }}</strong>
          <p>{{ t('step1Desc') }}</p>
        </li>
        <li>
          <strong>{{ t('step2Title') }}</strong>
          <p>{{ t('step2Desc') }}</p>
        </li>
        <li>
          <strong>{{ t('step3Title') }}</strong>
          <p>{{ t('step3Desc') }}</p>
        </li>
      </ol>
    </section>
  </main>
</template>

<style scoped>
.page {
  max-width: 720px;
  margin: 0 auto;
  padding: 32px 24px 64px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 48px;
}

.brand {
  font-weight: 600;
  letter-spacing: 0.02em;
}

.topbar-actions {
  display: inline-flex;
  gap: 8px;
}

.hero h1 {
  font-size: 32px;
  margin: 0 0 8px;
  letter-spacing: -0.01em;
}

.subtitle {
  font-size: 18px;
  color: var(--fg-muted);
  margin: 0 0 24px;
}

.intro {
  margin: 0 0 32px;
}

.cta {
  display: flex;
  gap: 12px;
  margin-bottom: 48px;
  flex-wrap: wrap;
}

.btn {
  font: inherit;
  border-radius: var(--radius);
  padding: 10px 20px;
  cursor: pointer;
  border: 1px solid var(--border);
  background: var(--bg-elevated);
  color: var(--fg);
}

.btn-primary {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--accent-fg);
}

.btn-primary:hover {
  background: var(--accent-hover);
  border-color: var(--accent-hover);
}

.btn-ghost:hover {
  border-color: var(--fg-muted);
}

.steps h2 {
  font-size: 14px;
  text-transform: uppercase;
  color: var(--fg-muted);
  letter-spacing: 0.06em;
  margin: 0 0 16px;
}

.steps ol {
  display: grid;
  gap: 12px;
  padding-left: 20px;
  margin: 0;
}

.steps li strong {
  display: block;
  margin-bottom: 4px;
}

.steps li p {
  margin: 0;
  color: var(--fg-muted);
}
</style>
