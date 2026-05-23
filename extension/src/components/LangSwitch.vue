<script setup lang="ts">
import { computed } from 'vue';
import type { UiLocale } from '@/utils/settings';

const props = defineProps<{ modelValue: UiLocale }>();
const emit = defineEmits<{ 'update:modelValue': [value: UiLocale] }>();

const options: Array<{ value: UiLocale; label: string }> = [
  { value: 'auto', label: 'Auto' },
  { value: 'zh_CN', label: '中文' },
  { value: 'en', label: 'EN' },
];

const current = computed({
  get: () => props.modelValue,
  set: (next) => emit('update:modelValue', next),
});
</script>

<template>
  <div class="lang-switch">
    <button
      v-for="opt in options"
      :key="opt.value"
      type="button"
      class="lang-btn"
      :class="{ active: current === opt.value }"
      @click="current = opt.value"
    >
      {{ opt.label }}
    </button>
  </div>
</template>

<style scoped>
.lang-switch {
  display: inline-flex;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}

.lang-btn {
  background: transparent;
  border: 0;
  color: var(--fg-muted);
  padding: 4px 10px;
  font-size: 12px;
  cursor: pointer;
  border-right: 1px solid var(--border);
}

.lang-btn:last-child {
  border-right: 0;
}

.lang-btn.active {
  background: var(--accent);
  color: var(--accent-fg);
}

.lang-btn:hover:not(.active) {
  color: var(--fg);
}
</style>
