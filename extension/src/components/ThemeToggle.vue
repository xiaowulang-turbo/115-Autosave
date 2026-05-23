<script setup lang="ts">
import { computed } from 'vue';
import type { ThemeMode } from '@/utils/settings';

const props = defineProps<{
  modelValue: ThemeMode;
  labels?: Partial<Record<ThemeMode, string>>;
}>();
const emit = defineEmits<{ 'update:modelValue': [value: ThemeMode] }>();

const options: ThemeMode[] = ['auto', 'light', 'dark'];

const current = computed({
  get: () => props.modelValue,
  set: (next) => emit('update:modelValue', next),
});

const labelFor = (mode: ThemeMode): string => props.labels?.[mode] ?? mode;
</script>

<template>
  <div class="theme-switch">
    <button
      v-for="opt in options"
      :key="opt"
      type="button"
      class="theme-btn"
      :class="{ active: current === opt }"
      @click="current = opt"
    >
      {{ labelFor(opt) }}
    </button>
  </div>
</template>

<style scoped>
.theme-switch {
  display: inline-flex;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
}

.theme-btn {
  background: transparent;
  border: 0;
  color: var(--fg-muted);
  padding: 4px 10px;
  font-size: 12px;
  cursor: pointer;
  border-right: 1px solid var(--border);
}

.theme-btn:last-child {
  border-right: 0;
}

.theme-btn.active {
  background: var(--accent);
  color: var(--accent-fg);
}

.theme-btn:hover:not(.active) {
  color: var(--fg);
}
</style>
