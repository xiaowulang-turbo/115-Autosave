import { defineBackground } from '#imports';

export default defineBackground(() => {
  chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason !== 'install') return;
    chrome.tabs.create({ url: chrome.runtime.getURL('/welcome.html') });
  });
});
