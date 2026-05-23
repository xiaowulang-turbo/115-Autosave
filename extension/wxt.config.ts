import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/module-vue', '@wxt-dev/i18n/module'],
  srcDir: 'src',
  outDir: '.output',
  manifest: {
    name: '__MSG_appName__',
    description: '__MSG_appDesc__',
    default_locale: 'zh_CN',
    permissions: ['storage'],
    host_permissions: ['https://115cdn.com/*'],
    icons: {
      16: 'icon/16.png',
      32: 'icon/32.png',
      48: 'icon/48.png',
      128: 'icon/128.png',
    },
  },
});
