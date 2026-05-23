import pluginVue from 'eslint-plugin-vue';
import vueTsEslintConfig from '@vue/eslint-config-typescript';

export default [
  {
    ignores: ['.output/**', '.wxt/**', 'node_modules/**', 'dist/**'],
  },
  ...pluginVue.configs['flat/recommended'],
  ...vueTsEslintConfig(),
  {
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
];
