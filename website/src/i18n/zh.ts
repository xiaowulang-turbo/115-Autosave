export interface Dictionary {
  brand: string;
  nav: { features: string; install: string; faq: string; github: string };
  hero: {
    badge: string;
    title: string;
    desc: string;
    ctaPrimary: string;
    ctaSecondary: string;
    pendingNote: string;
  };
  features: { title: string; items: Array<{ title: string; desc: string }> };
  steps: { title: string; items: Array<{ num: string; title: string; desc: string }> };
  install: {
    title: string;
    extTitle: string;
    extDesc: string;
    extCta: string;
    extPending: string;
    scriptTitle: string;
    scriptDesc: string;
    scriptCta: string;
  };
  faq: { title: string; items: Array<{ q: string; a: string }> };
  footer: {
    license: string;
    disclaimer: string;
    privacy: string;
    privacyHref: string;
    switchLang: string;
    switchHref: string;
  };
}

export const zh: Dictionary = {
  brand: '115 Auto Save',
  nav: {
    features: '功能',
    install: '安装',
    faq: '常见问题',
    github: 'GitHub',
  },
  hero: {
    badge: 'Chrome 扩展 · 油猴脚本',
    title: '让 115 网盘分享页\n三步合一。',
    desc: '自动提交访问码 · 一键转存 · 自动确认目录。打开链接，剩下的交给扩展。',
    ctaPrimary: '添加到 Chrome',
    ctaSecondary: '查看源码',
    pendingNote: '* Chrome 商店审核中，可先安装油猴脚本版本。',
  },
  features: {
    title: '为什么用它',
    items: [
      {
        title: '自动提交访问码',
        desc: '页面加载完成后，自动找到"确定"按钮并点击，省去复制粘贴的步骤。',
      },
      {
        title: '一键自动转存',
        desc: '智能延迟后自动点击"转存"按钮，再确认"转存到此"目录，全程无需手动。',
      },
      {
        title: '克制 · 安全 · 开源',
        desc: '仅在 115cdn.com 域名下生效，不上传任何数据，代码 100% 开源可审查。',
      },
    ],
  },
  steps: {
    title: '工作流程',
    items: [
      { num: '01', title: '提交访问码', desc: '页面加载后等待 0.5s，点击"确定"。' },
      { num: '02', title: '触发转存', desc: '等待 1s，点击"转存"按钮。' },
      { num: '03', title: '确认目录', desc: '等待 0.5s，点击"转存到此"。' },
    ],
  },
  install: {
    title: '两种安装方式',
    extTitle: 'Chrome 扩展（推荐）',
    extDesc: '中英国际化 · 主题适配 · 可视化设置面板 · 自动更新。',
    extCta: '前往 Chrome 商店',
    extPending: '商店审核中',
    scriptTitle: '油猴脚本',
    scriptDesc: '已有 Tampermonkey / Violentmonkey，可直接安装单文件脚本。',
    scriptCta: '前往 Greasy Fork',
  },
  faq: {
    title: '常见问题',
    items: [
      {
        q: '扩展和油猴脚本有什么区别？',
        a: '功能完全一致。扩展额外提供欢迎页、设置面板、中英国际化与主题适配，不依赖油猴管理器。',
      },
      {
        q: '需要登录 115 账号吗？',
        a: '需要。请先登录 115 账号，否则点击转存后会跳到登录页。',
      },
      {
        q: '会上传任何数据吗？',
        a: '不会。扩展只在你的浏览器本地点击按钮，不发起任何网络请求，源码完全开源可审查。',
      },
      {
        q: '脚本失效或想调整延迟？',
        a: '打开扩展设置面板调整三步延迟参数，或在 GitHub 提 Issue 反馈。',
      },
    ],
  },
  footer: {
    license: 'MIT License',
    disclaimer: '仅供学习交流，请遵守 115 网盘相关使用条款。',
    privacy: '隐私政策',
    privacyHref: '/privacy/',
    switchLang: 'English',
    switchHref: '/en/',
  },
};
