# Chrome Web Store 上架素材

> 提交到 [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole) 时使用的所有素材。

## 商品描述文案（listing-copy/）

Chrome 商店"产品详情"面板的"说明"字段，最长 16000 字符。

| 文件 | 字符数 | 用途 |
| --- | --- | --- |
| `zh-CN.txt` | 656 | 中文（中国）locale 面板的"说明"字段 |
| `en.txt` | 1563 | English locale 面板的"说明"字段 |

> 注：标题（appName）和摘要（appDesc）已通过扩展内 `_locales/{zh_CN,en}/messages.json` 自动多语言，**无需手动填写**。

## 截图（screenshots/）

Chrome 商店要求至少 1 张、最多 5 张，尺寸 **1280×800** 或 640×400 PNG/JPEG。

| 文件 | 尺寸 | 内容 |
| --- | --- | --- |
| `01-welcome-zh-light.png` | 1280×800 | 欢迎页 · 中文 · 浅色主题 |
| `02-welcome-en-light.png` | 1280×800 | Welcome page · English · light |
| `03-options-zh-light.png` | 1280×800 | 设置页 · 中文 · 浅色主题 |
| `04-options-en-light.png` | 1280×800 | Settings page · English · light |
| `05-welcome-zh-dark.png` | 1280×800 | 欢迎页 · 中文 · 深色主题（展示主题适配） |

## 宣传图（promo/）

| 文件 | 尺寸 | 用途 |
| --- | --- | --- |
| `small-tile-440x280.png` | 440×280 | Small promo tile（必填） |
| `marquee-1400x560.png` | 1400×560 | Marquee promo tile（精选位可选） |

> 注：Chrome Web Store 已经在新版后台不再要求 920×680 的 Large promo tile。

## 重新生成

### 截图（来自真实扩展页面，需要 Chrome 已启动）

```bash
# 1. 构建扩展
cd extension && pnpm wxt build

# 2. 启动静态服务器
cd .output/chrome-mv3 && python3 -m http.server 8765

# 3. 通过 Chrome DevTools MCP 截图
#    （Cursor 中直接让 AI 执行即可，无需手动操作）
```

### 宣传图（AI 生成）

宣传图通过 `GenerateImage` 工具配合 `sips` 派生，源图存放在 `extension/design/`（可选保留）。
