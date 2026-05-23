<script setup lang="ts">
import { onMounted, ref } from 'vue';
import LangSwitch from '@/components/LangSwitch.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';
import { useI18n } from '@/composables/useI18n';
import { useTheme } from '@/composables/useTheme';
import {
  DEFAULT_SETTINGS,
  getSettings,
  onSettingsChange,
  saveSettings,
  type Settings,
  type ThemeMode,
  type UiLocale,
} from '@/utils/settings';

const settings = ref<Settings>({ ...DEFAULT_SETTINGS });
const savedFlag = ref(false);
let saveTimer: ReturnType<typeof setTimeout> | null = null;

const { locale, t } = useI18n(DEFAULT_SETTINGS.uiLocale);
const { theme } = useTheme(DEFAULT_SETTINGS.theme);

onMounted(async () => {
  const initial = await getSettings();
  settings.value = initial;
  locale.value = initial.uiLocale;
  theme.value = initial.theme;
  onSettingsChange((next) => {
    settings.value = next;
    locale.value = next.uiLocale;
    theme.value = next.theme;
  });
});

function flashSaved(): void {
  savedFlag.value = true;
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => (savedFlag.value = false), 1200);
}

async function persist(partial: Partial<Settings>): Promise<void> {
  settings.value = await saveSettings(partial);
  flashSaved();
}

const updateEnabled = (event: Event): void => {
  void persist({ enabled: (event.target as HTMLInputElement).checked });
};

const updateAutoSelectRecent = (event: Event): void => {
  void persist({ autoSelectRecent: (event.target as HTMLInputElement).checked });
};

const updateAutoCloseSuccess = (event: Event): void => {
  void persist({ autoCloseSuccess: (event.target as HTMLInputElement).checked });
};

const updateLocale = (next: UiLocale): void => {
  locale.value = next;
  void persist({ uiLocale: next });
};

const updateTheme = (next: ThemeMode): void => {
  theme.value = next;
  void persist({ theme: next });
};

function onActionDelayInput(raw: string): void {
  const n = Number(raw);
  if (Number.isFinite(n) && n >= 0) {
    void persist({ actionDelay: Math.round(n) });
  }
}

const resetAll = (): void => {
  void persist({ ...DEFAULT_SETTINGS });
  locale.value = DEFAULT_SETTINGS.uiLocale;
  theme.value = DEFAULT_SETTINGS.theme;
};
</script>

<template>
  <main class="page">
    <header class="topbar">
      <div>
        <h1>{{ t('settingsTitle') }}</h1>
        <p class="subtitle">
          {{ t('settingsDesc') }}
        </p>
      </div>
      <span
        v-if="savedFlag"
        class="saved-flag"
      >{{ t('settingsSaved') }}</span>
    </header>

    <section class="group">
      <h2>{{ t('groupBehavior') }}</h2>

      <label class="row">
        <div class="row-text">
          <span class="row-title">{{ t('settingsEnabled') }}</span>
          <span class="row-desc">{{ t('settingsEnabledDesc') }}</span>
        </div>
        <input
          :checked="settings.enabled"
          type="checkbox"
          @change="updateEnabled"
        >
      </label>

      <label class="row">
        <div class="row-text">
          <span class="row-title">{{ t('settingsActionDelay') }}</span>
          <span class="row-desc">{{ t('settingsActionDelayDesc') }}</span>
        </div>
        <input
          class="num"
          type="number"
          min="0"
          step="100"
          :value="settings.actionDelay"
          @input="onActionDelayInput(($event.target as HTMLInputElement).value)"
        >
      </label>

      <label class="row">
        <div class="row-text">
          <span class="row-title">{{ t('settingsAutoSelectRecent') }}</span>
          <span class="row-desc">{{ t('settingsAutoSelectRecentDesc') }}</span>
        </div>
        <input
          :checked="settings.autoSelectRecent"
          type="checkbox"
          @change="updateAutoSelectRecent"
        >
      </label>

      <label class="row">
        <div class="row-text">
          <span class="row-title">{{ t('settingsAutoCloseSuccess') }}</span>
          <span class="row-desc">{{ t('settingsAutoCloseSuccessDesc') }}</span>
        </div>
        <input
          :checked="settings.autoCloseSuccess"
          type="checkbox"
          @change="updateAutoCloseSuccess"
        >
      </label>
    </section>

    <section class="group">
      <h2>{{ t('groupAppearance') }}</h2>
      <div class="row">
        <span class="row-title">{{ t('settingsTheme') }}</span>
        <ThemeToggle
          :model-value="theme"
          :labels="{ auto: t('themeAuto'), light: t('themeLight'), dark: t('themeDark') }"
          @update:model-value="updateTheme"
        />
      </div>
    </section>

    <section class="group">
      <h2>{{ t('groupLanguage') }}</h2>
      <div class="row">
        <span class="row-title">{{ t('settingsLocale') }}</span>
        <LangSwitch
          :model-value="locale"
          @update:model-value="updateLocale"
        />
      </div>
    </section>

    <footer class="footer">
      <button
        class="btn btn-ghost"
        @click="resetAll"
      >
        {{ t('settingsReset') }}
      </button>
    </footer>
  </main>
</template>

<style scoped>
.page {
  max-width: 640px;
  margin: 0 auto;
  padding: 32px 24px 64px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
}

.topbar h1 {
  font-size: 24px;
  margin: 0 0 4px;
}

.subtitle {
  margin: 0;
  color: var(--fg-muted);
}

.saved-flag {
  font-size: 12px;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  padding: 4px 10px;
  border-radius: 999px;
}

.group {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 4px 16px;
  margin-bottom: 16px;
}

.group h2 {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--fg-muted);
  margin: 16px 0 8px;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 12px 0;
  border-top: 1px solid var(--border);
}

.row:first-of-type {
  border-top: 0;
}

.row-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.row-title {
  font-weight: 500;
}

.row-desc {
  font-size: 12px;
  color: var(--fg-muted);
}

.num {
  width: 100px;
  padding: 6px 10px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--fg);
  font: inherit;
  text-align: right;
}

input[type='checkbox'] {
  width: 16px;
  height: 16px;
  accent-color: var(--accent);
}

.footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}

.btn {
  font: inherit;
  border-radius: var(--radius);
  padding: 8px 16px;
  cursor: pointer;
  border: 1px solid var(--border);
  background: var(--bg-elevated);
  color: var(--fg);
}

.btn-ghost:hover {
  border-color: var(--fg-muted);
}
</style>
