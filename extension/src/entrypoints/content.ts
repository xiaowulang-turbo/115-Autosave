import { defineContentScript } from '#imports';
import {
  log,
  queryByText,
  safeClick,
  SELECTORS,
  sleep,
  TEXTS,
  triggerHover,
  waitForElement,
} from '@/utils/dom';
import { getSettings, type Settings } from '@/utils/settings';

const WAIT_TIMEOUT = 10_000;
const HOVER_REVEAL_DELAY = 500;

async function submitAccessCode(timeout: number): Promise<void> {
  // 不抛错：分享页可能不需要访问码（按钮不存在），超时即跳过此步骤继续后续流程。
  const btn = await waitForElement(
    () => queryByText(SELECTORS.button, TEXTS.submit),
    timeout,
  ).catch(() => null);
  safeClick(btn, '提交访问码');
}

async function triggerSave(timeout: number): Promise<void> {
  const mainBtn = await waitForElement(
    () => queryByText(SELECTORS.button, TEXTS.save),
    timeout,
  );

  let target = queryByText(SELECTORS.buttonLike, TEXTS.oneClick, { visibleOnly: false });
  if (!target || target.offsetParent === null) {
    triggerHover((mainBtn.nextElementSibling as HTMLElement | null) ?? mainBtn);
    await sleep(HOVER_REVEAL_DELAY);
    target = queryByText(SELECTORS.buttonLike, TEXTS.oneClick, { visibleOnly: false }) ?? mainBtn;
  }

  safeClick(target, target === mainBtn ? '普通转存' : '一键转存');
}

function trySelectRecentFolder(): void {
  const folder = queryByText(SELECTORS.buttonLike, TEXTS.recent);
  if (folder) {
    safeClick(folder, '选择最近接收文件夹');
    return;
  }

  const labels = Array.from(document.querySelectorAll<HTMLLabelElement>('label'));
  const recentLabel = labels.find((l) =>
    TEXTS.recentPath.some((t) => l.textContent?.includes(t)),
  );
  const candidate = recentLabel?.previousElementSibling;
  if (
    candidate instanceof HTMLInputElement &&
    candidate.type === 'checkbox' &&
    !candidate.checked
  ) {
    log('勾选最近保存路径');
    candidate.click();
  }
}

async function confirmTransfer(timeout: number): Promise<void> {
  const finalBtn = await waitForElement(
    () => queryByText(SELECTORS.button, TEXTS.confirm),
    timeout,
  );
  safeClick(finalBtn, '最终转存确认');
}

async function tryCloseSuccessDialog(): Promise<void> {
  const successHint = await waitForElement(
    () => queryByText(SELECTORS.successText, TEXTS.successHint, { exact: false }),
    5_000,
  ).catch(() => null);
  if (!successHint) return;
  await sleep(300);
  safeClick(queryByText(SELECTORS.buttonLink, TEXTS.close), '关闭成功提示');
}

async function runScript(settings: Settings): Promise<void> {
  log('启动转存流程...');
  try {
    await submitAccessCode(WAIT_TIMEOUT);

    await sleep(settings.actionDelay);
    await triggerSave(WAIT_TIMEOUT);

    await sleep(settings.actionDelay);
    if (settings.autoSelectRecent) trySelectRecentFolder();
    await confirmTransfer(WAIT_TIMEOUT);

    if (settings.autoCloseSuccess) {
      await sleep(settings.actionDelay);
      await tryCloseSuccessDialog();
    }

    log('转存流程结束', 'success');
  } catch (e) {
    log(`流程中断: ${(e as Error).message}`, 'warn');
  }
}

export default defineContentScript({
  matches: ['https://115cdn.com/s/*'],
  runAt: 'document_idle',
  async main() {
    const settings = await getSettings();
    if (!settings.enabled) {
      log('自动转存已被用户关闭，跳过执行');
      return;
    }
    await runScript(settings);
  },
});
