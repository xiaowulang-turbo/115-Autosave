import { defineContentScript } from '#imports';
import { getSettings } from '@/utils/settings';

const LOG_PREFIX = '[115转存助手]';

const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

function clickButtonByText(label: string, desc: string): boolean {
  const buttons = document.querySelectorAll('button');
  for (const btn of buttons) {
    if (btn.textContent?.trim() === label) {
      console.log(`${LOG_PREFIX} 正在点击: ${desc}`);
      (btn as HTMLButtonElement).click();
      return true;
    }
  }
  console.warn(`${LOG_PREFIX} 未找到元素: ${desc}`);
  return false;
}

export default defineContentScript({
  matches: ['https://115cdn.com/s/*'],
  runAt: 'document_idle',
  async main() {
    const settings = await getSettings();
    if (!settings.enabled) {
      console.log(`${LOG_PREFIX} 自动转存已被用户关闭，跳过执行`);
      return;
    }

    console.log(`${LOG_PREFIX} 脚本启动...`);

    await sleep(settings.delayBeforeSubmit);
    clickButtonByText('确定', '确定按钮（提交访问码）');

    await sleep(settings.delayBeforeSave);
    clickButtonByText('转存', '转存按钮');

    await sleep(settings.delayBeforeConfirm);
    clickButtonByText('转存到此', '转存到此确认按钮');

    console.log(`${LOG_PREFIX} 流程结束`);
  },
});
