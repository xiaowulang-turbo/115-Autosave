const LOG_COLORS = {
  info: '#3b82f6',
  success: '#22c55e',
  warn: '#f59e0b',
  error: '#ef4444',
} as const;

type LogLevel = keyof typeof LOG_COLORS;

const LOG_PREFIX = '[115转存助手]';

export const log = (msg: string, level: LogLevel = 'info'): void => {
  console.log(`%c${LOG_PREFIX} ${msg}`, `color: ${LOG_COLORS[level]}`);
};

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const TEXTS = {
  submit: ['确定', '提交', 'Submit', 'OK'],
  save: ['转存'],
  oneClick: ['一键转存'],
  confirm: ['立即转存', '转存到此'],
  close: ['关闭', 'Close'],
  recent: ['最近接收'],
  recentPath: ['最近保存路径'],
  successHint: ['转存成功', '成功'],
} as const;

export const SELECTORS = {
  button: 'button',
  buttonLink: 'button, a',
  buttonLike: 'button, a, li, span',
  successText: 'h3, div',
} as const;

const DEFAULT_QUERY_OPTIONS = {
  exact: true,
  visibleOnly: true,
} satisfies QueryByTextOptions;

interface QueryByTextOptions {
  exact?: boolean;
  visibleOnly?: boolean;
}

const isVisible = (el: HTMLElement): boolean =>
  el.offsetParent !== null || el.offsetWidth > 0;

/**
 * 在指定 selector 中按文本查找首个匹配元素。
 * - `texts` 可传单个字符串或数组（数组时任一命中即可）
 * - `exact` 控制全等还是 includes 匹配
 * - `visibleOnly` 控制是否过滤掉 `display:none` / 不在 layout 中的元素
 */
export const queryByText = (
  selector: string,
  texts: string | readonly string[],
  options: QueryByTextOptions = {},
): HTMLElement | null => {
  const { exact, visibleOnly } = { ...DEFAULT_QUERY_OPTIONS, ...options };
  const candidates = Array.isArray(texts) ? texts : [texts];
  const elements = document.querySelectorAll<HTMLElement>(selector);
  for (const el of elements) {
    const content = el.textContent?.trim() ?? '';
    const matched = candidates.some((t) => (exact ? content === t : content.includes(t)));
    if (!matched) continue;
    if (visibleOnly && !isVisible(el)) continue;
    return el;
  }
  return null;
};

/**
 * 等待 `predicate` 返回非空值（基于 MutationObserver + 立即检查），
 * 超时则 reject。命中或超时都会 disconnect observer。
 */
export const waitForElement = <T>(
  predicate: () => T | null | undefined,
  timeout: number,
): Promise<T> =>
  new Promise((resolve, reject) => {
    const initial = predicate();
    if (initial) {
      resolve(initial);
      return;
    }

    const observer = new MutationObserver(() => {
      const result = predicate();
      if (result) {
        observer.disconnect();
        clearTimeout(timer);
        resolve(result);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    const timer = setTimeout(() => {
      observer.disconnect();
      reject(new Error('waitForElement timeout'));
    }, timeout);
  });

/**
 * 点击元素并打 log；如果元素被 CSS 隐藏，强制改可见后再点（处理 Tailwind/transition 隐藏的"一键转存"）。
 * 调用方负责 sleep 间隔。
 */
export const safeClick = (el: HTMLElement | null, desc: string): boolean => {
  if (!el) {
    log(`未找到元素: ${desc}`, 'warn');
    return false;
  }
  log(`点击: ${desc}`);
  if (el.offsetParent === null) {
    el.style.visibility = 'visible';
    el.style.display = 'block';
  }
  el.click();
  return true;
};

/**
 * 模拟鼠标 hover，用来触发 115 页面里的"一键转存"等悬浮显示按钮。
 */
export const triggerHover = (el: HTMLElement | null): void => {
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const init: MouseEventInit = {
    view: window,
    bubbles: true,
    cancelable: true,
    clientX: rect.left + rect.width / 2,
    clientY: rect.top + rect.height / 2,
  };
  for (const type of ['mouseenter', 'mouseover', 'mousemove'] as const) {
    el.dispatchEvent(new MouseEvent(type, init));
  }
};
