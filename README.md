# 115 转存助手 (115 Auto Save)

让 115 网盘分享页的"输入访问码 → 转存 → 确认目录"三步操作一键完成。

## 项目结构

| 目录 | 说明 | 状态 |
| --- | --- | --- |
| [`userscript/`](./userscript) | 原版油猴脚本（Tampermonkey / Violentmonkey） | 稳定版 |
| [`extension/`](./extension) | Chrome MV3 浏览器扩展（WXT + Vue 3） | 开发中 |
| [`website/`](./website) | 官网（Astro + Tailwind，部署在 Vercel） | 开发中 |

> **版本号约定**：油猴脚本（`userscript/115转存助手.user.js` 头部 `@version`）与 Chrome 扩展（`extension/package.json` 的 `version`）应**保持同步发布、共用同一版本号**。每次发布时一并升级两端版本，便于交叉对照与问题定位。

## 三种使用方式

- **油猴脚本**：访问 [Greasy Fork 页面](https://greasyfork.org/zh-CN/scripts/558227-115%E8%BD%AC%E5%AD%98%E5%8A%A9%E6%89%8B-115-auto-save) 一键安装，详见 [`userscript/README.md`](./userscript/README.md)
- **Chrome 扩展**：访问 [Chrome 应用商店](https://chromewebstore.google.com/detail/115-%E8%BD%AC%E5%AD%98%E5%8A%A9%E6%89%8B/akokmklnfgopbmlkpmjjligliekijfla) 一键添加（含中英国际化、主题、欢迎页、设置页）
- **官网**：[https://115-auto-save.vercel.app](https://115-auto-save.vercel.app)（Vercel 部署）

## 本地开发

```bash
# 扩展
cd extension && pnpm install && pnpm dev

# 官网
cd website && pnpm install && pnpm dev
```

油猴脚本无需构建，直接将 [`userscript/115转存助手.user.js`](./userscript/115%E8%BD%AC%E5%AD%98%E5%8A%A9%E6%89%8B.user.js) 拖入油猴扩展即可。

## 许可证

[MIT](./LICENSE) · 仅供学习和交流使用，请遵守 115 网盘的相关使用条款。
