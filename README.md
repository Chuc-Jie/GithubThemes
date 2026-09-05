# 🎨 GitHub Themes

> GitHub 专业主题切换器 —— 基于 CSS 变量覆盖，全面适配 GitHub 所有组件

一个轻量自包含的**用户脚本**（Userscript），为 `github.com` 提供 23 套手工打磨的专业主题（浅色 / 深色），并内置 **列表行悬停增强**、**Release 分组排序** 等实用增强功能。

- **作者**：友野YouyEr
- **版本**：1.2.0.0
- **协议**：MIT
- **适配站点**：`*://*.github.com/*`

## ✨ 功能特性

| 功能 | 说明 |
| --- | --- |
| 🎨 23 套专业主题 | 11 套浅色 + 12 套深色，另含「GitHub Default」一键还原原生外观 |
| 🧩 全量组件适配 | 通过语义 Token 自动生成 GitHub Primer 完整 CSS 变量，覆盖页面所有组件 |
| 🔍 主题搜索 | 面板内实时搜索，输入防抖，浅 / 深分区展示，空结果友好提示 |
| ⌨️ 快捷键操作 | `Ctrl+Shift+T` 开关面板，`Ctrl+Shift+←/→` 循环切换上一/下一主题 |
| 💾 状态持久化 | 选择通过 `GM_setValue` 保存，所有页面、标签页间保持一致 |
| 🔄 bfcache 兼容 | 主题注入为 `<style>` 元素，浏览器后退 / 前进（bfcache 恢复）主题不失效 |
| 📐 列表行悬停增强 | `.Box-row` 悬停显示跟随主题强调色的左侧竖条（粗细 2–16px 可调），默认开启 |
| 🗂️ Release 分组排序 | Release 下载文件按系统（Windows → macOS → Linux → Android → iOS）聚拢排列，同系统图标统一着色，默认关闭 |

## 🎨 主题列表

### ☀️ 浅色（11 套）

| 主题 | 风格 |
| --- | --- |
| ❄️ Nord Light | 清冷蓝灰，护眼舒适 |
| 🧋 Catppuccin Latte | 温暖奶油，柔和护眼 |
| 📜 Gruvbox Light | 复古暖黄，经典怀旧 |
| ☀️ Solarized Light | 经典青黄色调，精准配色 |
| 🍯 Amber Dawn | 蜂蜜暖金晨光 |
| 💡 One Light | Atom 经典明亮 |
| 🟠 Ayu Light | 清新柔和日光 |
| ❄️ Winter Frost | 冰晶冷白 |
| 📄 Paper | 纸张阅读质感 |
| 🔷 Bluloco Light | 高对比靛蓝 |
| 🪶 Warm Paper | 纸墨暖纸（浅） |

### 🌙 深色（12 套）

| 主题 | 风格 |
| --- | --- |
| 🌙 Catppuccin Mocha | 深夜暖咖 |
| 🌃 Tokyo Night | 东京夜色霓虹 |
| 🌲 Everforest Dark | 森林墨绿 |
| 🌹 Rosé Pine | 玫瑰松木粉紫 |
| 🥃 Amber Night | 琥珀深夜 |
| 🧛 Dracula | 经典吸血鬼暗紫 |
| 🌑 One Dark | Atom 经典暗色 |
| 🎹 Monokai | 经典高饱和荧光 |
| 🟫 Gruvbox Dark | 复古暖棕 |
| 🌊 Ayu Mirage | 灰紫薄雾 |
| 🕯️ Warm Paper Dark | 纸墨暖纸（深） |
| 💻 2026 Dark | 提炼自 VSCode `dark_modern` |

### 🔄 一键还原

**GitHub Default** 会移除全部注入样式，完整恢复 GitHub 原生外观，与扩展共存互不干扰。

## 📦 安装

1. 安装脚本管理器（任选其一）：
   - [Tampermonkey](https://www.tampermonkey.net/)
   - [Violentmonkey](https://violentmonkey.github.io/)
   - [ScriptCat 脚本猫](https://docs.scriptcat.org/)
2. 打开脚本源码 [`GithubTheme.js`](GithubTheme.js)，全选复制。
3. 在管理器「新建脚本」中粘贴并保存，或直接访问仓库的 raw 地址安装。
4. 打开任意 `github.com` 页面，按 `Ctrl+Shift+T` 或通过脚本管理器菜单（**🎨 打开主题面板**）即可开始使用。

## 🚀 使用指南

### 打开主题面板

- 快捷键：`Ctrl+Shift+T`
- 管理器菜单：**🎨 打开主题面板**
- 面板内支持：主题搜索、浅/深分区选择、当前主题展示、`ESC` 关闭

### 快捷键一览

| 快捷键 | 功能 |
| --- | --- |
| `Ctrl+Shift+T` | 打开 / 关闭主题面板 |
| `Ctrl+Shift+←` | 切换到上一套主题 |
| `Ctrl+Shift+→` | 切换到下一套主题 |
| `ESC` | 关闭面板 |
| 管理器菜单「🔄 恢复默认主题」 | 直接还原 GitHub 原生外观 |

### 增强功能开关（面板内）

- **📐 列表行增强**：开关控制悬停竖条；滑杆调节竖条粗细（2–16px）。
- **🗂️ Release 分组排序**：开关控制 Release 下载项按系统分组排序（默认关闭）。

所有开关与偏好均持久化保存。

## ⚙️ 工作原理

1. 每套主题只定义约 18 个**语义 Token**（背景层、前景/文本、语义色、组件色）。
2. 脚本根据 Token 自动推导出 GitHub Primer 体系的全部 CSS 变量（含 `hover`、`active`、`emphasis` 等衍生态）。
3. 生成 `<style>` 元素注入页面，配合 `!important` 确保覆盖 GitHub 的动态样式。
4. 使用 `<style>` 元素而非行内样式，使其能存活于 bfcache，后退 / 前进后主题依然生效。

> 详细架构说明（三层架构、样式注入引擎、面板单例设计等）见 [docs/实现思路和技术路线.md](docs/实现思路和技术路线.md)。

## 📁 目录结构

```
GithubTheme/
├── GithubTheme.js                 # 脚本本体（自包含单文件，所有主题与逻辑都在其中）
├── docs/
│   └── 实现思路和技术路线.md       # 架构设计文档
└── README.md
```

## 📝 更新历史

| 版本 | 内容 |
| --- | --- |
| 最新（dev） | 列表行悬停增强（左侧竖条跟随主题，开关/粗细可调）；Release 分组排序（按系统聚拢，图标统一着色） |
| 1.2.0.0 | 新增 💻 2026 Dark 主题（提炼自 VSCode `dark_modern`） |
| 1.1.0.0 | 新增 🪶/🕯️ Warm Paper 纸墨浅深双主题 |
| 1.0.0.4 | 修复：面板内容区无法滚动，主题列表底部被截断 |
| 1.0.0.3 | 修复：主题注入改为 `<style>` 元素 + `!important`，解决 bfcache 失效 |
| 1.0.0.2 | 修复：浏览器后退 / 前进（bfcache 恢复）后主题失效 |
| 1.0.0.1 | 首版：20 套专业主题 |

## 🧩 如何新增一套主题

无需改动任何逻辑代码，只需在 `GithubTheme.js` 的 `themes` 配置对象中复制一个主题块并替换 Token 颜色值即可：

```js
'my-theme': {
    name: '🎉 My Theme',
    type: 'light',   // 或 'dark'
    tokens: {
        bgDefault: '#FFFFFF',  fgDefault: '#1F2328',
        accent:    '#0969DA',  // ... 其余 Token
    }
},
```

Token 说明（背景层 / 前景 / 语义色 / 组件色）见脚本内注释，`generateCSSVariables()` 会自动完成 CSS 变量的生成与派生。

## 📄 许可证

MIT（见脚本头部 `@license` 元数据）© 友野YouyEr
