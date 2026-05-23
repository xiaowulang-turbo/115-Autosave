import type { Dictionary } from './zh';

export const en: Dictionary = {
  brand: '115 Auto Save',
  nav: {
    features: 'Features',
    install: 'Install',
    faq: 'FAQ',
    github: 'GitHub',
  },
  hero: {
    badge: 'Chrome Extension · Userscript',
    title: 'Three clicks become one\non every 115 share page.',
    desc: 'Submit the access code, trigger the save, confirm the folder — all automatically. Open the link and walk away.',
    ctaPrimary: 'Add to Chrome',
    ctaSecondary: 'View source',
    pendingNote: '* Pending Chrome Web Store review — install the userscript in the meantime.',
  },
  features: {
    title: 'Why use it',
    items: [
      {
        title: 'Auto submit access code',
        desc: 'Locates the OK button right after the page loads — no more copy & paste.',
      },
      {
        title: 'One-click auto save',
        desc: 'Smart delays click the Save button and confirm the folder for you.',
      },
      {
        title: 'Focused · Safe · Open-source',
        desc: 'Only runs on 115cdn.com, sends zero data, fully open source for review.',
      },
    ],
  },
  steps: {
    title: 'How it works',
    items: [
      { num: '01', title: 'Submit access code', desc: 'Waits 0.5s, clicks the OK button.' },
      { num: '02', title: 'Trigger save', desc: 'Waits 1s, clicks the Save button.' },
      { num: '03', title: 'Confirm folder', desc: 'Waits 0.5s, clicks "Save here".' },
    ],
  },
  install: {
    title: 'Two ways to install',
    extTitle: 'Chrome Extension (recommended)',
    extDesc: 'i18n · theme · visual settings · auto updates.',
    extCta: 'Open Chrome Web Store',
    extPending: 'Pending review',
    scriptTitle: 'Userscript',
    scriptDesc: 'Already have Tampermonkey / Violentmonkey? Install the single-file script.',
    scriptCta: 'Open Greasy Fork',
  },
  faq: {
    title: 'FAQ',
    items: [
      {
        q: 'What is the difference between the extension and the userscript?',
        a: 'Same core behaviour. The extension adds a welcome page, settings panel, full i18n and theme support — and works without a userscript manager.',
      },
      {
        q: 'Do I need to log in to 115?',
        a: 'Yes. Sign in to your 115 account first, otherwise the save action will redirect to the login page.',
      },
      {
        q: 'Does it send any data?',
        a: 'No. The extension only clicks buttons inside your browser. It makes no network requests and the source is fully open.',
      },
      {
        q: 'Want to tweak the delays?',
        a: 'Open the extension settings to adjust the three step delays, or file an issue on GitHub.',
      },
    ],
  },
  footer: {
    license: 'MIT License',
    disclaimer: 'For educational and personal use only. Comply with the 115 terms of service.',
    privacy: 'Privacy Policy',
    privacyHref: '/en/privacy/',
    switchLang: '中文',
    switchHref: '/',
  },
};
