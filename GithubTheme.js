// ==UserScript==
// @name         GitHub Themes
// @namespace    github-themes
// @version      1.0.0.2
// @description  GitHub 专业主题切换器 — 基于 CSS 变量覆盖，全面适配 GitHub 所有组件
// @tag          Github
// @tag          Themes
// @author       友野YouyEr
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-start
// @license      MIT
// @match        *://*.github.com/*
// ==/UserScript==

(function () {
    'use strict';

    /* ========================================================================
     *  主题定义 — 每套主题定义语义化的基础 token，脚本自动生成所有 CSS 变量
     *  新增加主题只需复制一个配置块，调整其中的颜色值即可
     * ======================================================================== */

    /**
     * Token 说明（每个主题必须提供这些字段）：
     *
     *  背景层:
     *    bgDefault     — 页面主背景 (--bgColor-default)
     *    bgSubtle      — 次级背景，如卡片、面板 (--bgColor-muted)
     *    bgInset       — 内凹背景，如输入框、代码区
     *    bgEmphasis    — 强调背景，如 tooltip、header
     *
     *  前景/文本:
     *    fgDefault     — 正文颜色
     *    fgMuted       — 次级文字
     *    fgSubtle      — 三级文字（占位符、禁用态）
     *    fgOnEmphasis  — 在强调背景上的文字色
     *
     *  语义色:
     *    accent        — 主强调色（链接、主按钮、focus）
     *    success       — 成功/绿色（合并、通过）
     *    danger        — 危险/红色（删除、错误）
     *    warning       — 警告/橙色
     *    done          — 完成/紫色
     *
     *  组件:
     *    headerBg       — 顶部导航栏背景
     *    headerFg       — 顶部导航栏文字
     *    codeBg         — 代码区背景
     *    border         — 默认边框色
     */

    const themes = {

        // ── 1. Nord Light ── 清冷蓝灰，护眼舒适 ──────────────────────────
        'nord-light': {
            name: '❄️ Nord Light',
            type: 'light',
            tokens: {
                bgDefault:    '#ECEFF4',  bgSubtle:     '#E5E9F0',
                bgInset:      '#D8DEE9',  bgEmphasis:   '#3B4252',
                fgDefault:    '#2E3440',  fgMuted:      '#4C566A',
                fgSubtle:     '#616E87',  fgOnEmphasis: '#ECEFF4',
                accent:       '#3B6290',  success:      '#4E7034',
                danger:       '#9A4450',  warning:      '#A04820',
                done:         '#B48EAD',  headerBg:     '#3B4252',
                headerFg:     '#D8DEE9',  codeBg:       '#D8DEE9',
                border:       '#C8D0DA',  link:         '#5E81AC',
            }
        },

        // ── 2. Catppuccin Latte ── 温暖奶油，柔和护眼 ────────────────────
        'catppuccin-latte': {
            name: '🧋 Catppuccin Latte',
            type: 'light',
            tokens: {
                bgDefault:    '#EFF1F5',  bgSubtle:     '#E6E9EF',
                bgInset:      '#CCD0DA',  bgEmphasis:   '#4C4F69',
                fgDefault:    '#4C4F69',  fgMuted:      '#585B6E',
                fgSubtle:     '#8C8FA1',  fgOnEmphasis: '#EFF1F5',
                accent:       '#1759D6',  success:      '#2D7A1E',
                danger:       '#D20F39',  warning:      '#944F08',
                done:         '#8839EF',  headerBg:     '#4C4F69',
                headerFg:     '#CCD0DA',  codeBg:       '#CCD0DA',
                border:       '#BCC0CC',  link:         '#1759D6',
            }
        },

        // ── 3. Gruvbox Light ── 复古暖黄，经典怀旧 ────────────────────────
        'gruvbox-light': {
            name: '📜 Gruvbox Light',
            type: 'light',
            tokens: {
                bgDefault:    '#FBF1C7',  bgSubtle:     '#F2E5BC',
                bgInset:      '#EBDBB2',  bgEmphasis:   '#3C3836',
                fgDefault:    '#3C3836',  fgMuted:      '#665C54',
                fgSubtle:     '#7C6F64',  fgOnEmphasis: '#FBF1C7',
                accent:       '#076678',  success:      '#5E5A0B',
                danger:       '#9D0006',  warning:      '#AF3A03',
                done:         '#8F3F71',  headerBg:     '#3C3836',
                headerFg:     '#EBDBB2',  codeBg:       '#EBDBB2',
                border:       '#D5C4A1',  link:         '#076678',
            }
        },

        // ── 4. Solarized Light ── 经典青黄色调，精准配色 ──────────────────
        'solarized-light': {
            name: '☀️ Solarized Light',
            type: 'light',
            tokens: {
                bgDefault:    '#FDF6E3',  bgSubtle:     '#EEE8D5',
                bgInset:      '#E6DFCC',  bgEmphasis:   '#073642',
                fgDefault:    '#073642',  fgMuted:      '#586E75',
                fgSubtle:     '#839496',  fgOnEmphasis: '#FDF6E3',
                accent:       '#1A6AA8',  success:      '#5A6600',
                danger:       '#B52826',  warning:      '#A83D12',
                done:         '#6C71C4',  headerBg:     '#073642',
                headerFg:     '#E6DFCC',  codeBg:       '#E6DFCC',
                border:       '#D3CBB7',  link:         '#268BD2',
            }
        },

        // ── 5. Catppuccin Mocha ── 温暖暗色，柔美粉紫 ─────────────────────
        'catppuccin-mocha': {
            name: '🌙 Catppuccin Mocha',
            type: 'dark',
            tokens: {
                bgDefault:    '#1E1E2E',  bgSubtle:     '#181825',
                bgInset:      '#11111B',  bgEmphasis:   '#CDD6F4',
                fgDefault:    '#CDD6F4',  fgMuted:      '#A6ADC8',
                fgSubtle:     '#6C7086',  fgOnEmphasis: '#1E1E2E',
                accent:       '#89B4FA',  success:      '#A6E3A1',
                danger:       '#F38BA8',  warning:      '#FAB387',
                done:         '#CBA6F7',  headerBg:     '#11111B',
                headerFg:     '#CDD6F4',  codeBg:       '#11111B',
                border:       '#45475A',  link:         '#89B4FA',
            }
        },

        // ── 6. Tokyo Night ── 深蓝夜幕，霓虹都市 ──────────────────────────
        'tokyo-night': {
            name: '🌃 Tokyo Night',
            type: 'dark',
            tokens: {
                bgDefault:    '#1A1B26',  bgSubtle:     '#16161E',
                bgInset:      '#13131A',  bgEmphasis:   '#C0CAF5',
                fgDefault:    '#C0CAF5',  fgMuted:      '#A9B1D6',
                fgSubtle:     '#565F89',  fgOnEmphasis: '#1A1B26',
                accent:       '#7AA2F7',  success:      '#9ECE6A',
                danger:       '#F7768E',  warning:      '#E0AF68',
                done:         '#BB9AF7',  headerBg:     '#13131A',
                headerFg:     '#C0CAF5',  codeBg:       '#13131A',
                border:       '#3B4261',  link:         '#7AA2F7',
            }
        },

        // ── 7. Everforest Dark ── 森林暗绿，自然沉静 ──────────────────────
        'everforest-dark': {
            name: '🌲 Everforest Dark',
            type: 'dark',
            tokens: {
                bgDefault:    '#2B3339',  bgSubtle:     '#323C41',
                bgInset:      '#1E2326',  bgEmphasis:   '#D3C6AA',
                fgDefault:    '#D3C6AA',  fgMuted:      '#9DA9A0',
                fgSubtle:     '#7A8478',  fgOnEmphasis: '#2B3339',
                accent:       '#7FBBB3',  success:      '#A7C080',
                danger:       '#E67E80',  warning:      '#DBBC7F',
                done:         '#D699B6',  headerBg:     '#1E2326',
                headerFg:     '#D3C6AA',  codeBg:       '#1E2326',
                border:       '#4A555B',  link:         '#7FBBB3',
            }
        },

        // ── 8. Rose Pine ── 玫瑰暖调，柔美暗色 ────────────────────────────
        'rose-pine': {
            name: '🌹 Rosé Pine',
            type: 'dark',
            tokens: {
                bgDefault:    '#191724',  bgSubtle:     '#1F1D2E',
                bgInset:      '#13111C',  bgEmphasis:   '#E0DEF4',
                fgDefault:    '#E0DEF4',  fgMuted:      '#908CAA',
                fgSubtle:     '#6E6A86',  fgOnEmphasis: '#191724',
                accent:       '#C4A7E7',  success:      '#9CCFD8',
                danger:       '#EB6F92',  warning:      '#F6C177',
                done:         '#C4A7E7',  headerBg:     '#13111C',
                headerFg:     '#E0DEF4',  codeBg:       '#13111C',
                border:       '#403D52',  link:         '#C4A7E7',
            }
        },

        // ── 9. Amber Light ── 琥珀晨光，温暖蜂蜜色调 ────────────────────────
        'amber-light': {
            name: '🍯 Amber Dawn',
            type: 'light',
            tokens: {
                bgDefault:    '#FEF9F0',  bgSubtle:     '#FDF3E4',
                bgInset:      '#F5E6D0',  bgEmphasis:   '#3D2E1C',
                fgDefault:    '#3D2E1C',  fgMuted:      '#6B5740',
                fgSubtle:     '#8B7355',  fgOnEmphasis: '#FEF9F0',
                accent:       '#9E5C0E',  success:      '#4A7230',
                danger:       '#C44233',  warning:      '#9E5A0C',
                done:         '#8B5CF6',  headerBg:     '#3D2E1C',
                headerFg:     '#F5E6D0',  codeBg:       '#F5E6D0',
                border:       '#D4C4A8',  link:         '#9E5C0E',
            }
        },

        // ── 10. Amber Dark ── 琥珀暗夜，深邃铜色炉火 ────────────────────────
        'amber-dark': {
            name: '🥃 Amber Night',
            type: 'dark',
            tokens: {
                bgDefault:    '#1E1810',  bgSubtle:     '#241E15',
                bgInset:      '#15110C',  bgEmphasis:   '#E8DCC8',
                fgDefault:    '#E8DCC8',  fgMuted:      '#B8A88A',
                fgSubtle:     '#8B7D65',  fgOnEmphasis: '#1E1810',
                accent:       '#E8A840',  success:      '#7CB342',
                danger:       '#E05545',  warning:      '#F0A030',
                done:         '#A78BFA',  headerBg:     '#15110C',
                headerFg:     '#E8DCC8',  codeBg:       '#15110C',
                border:       '#4A3F2E',  link:         '#E8A840',
            }
        },

        // ── 11. One Light ── Atom 经典亮色，简洁专业 ─────────────────────
        'one-light': {
            name: '💡 One Light',
            type: 'light',
            tokens: {
                bgDefault:    '#FAFAFA',  bgSubtle:     '#F0F0F0',
                bgInset:      '#E8E8E8',  bgEmphasis:   '#383A42',
                fgDefault:    '#383A42',  fgMuted:      '#696C77',
                fgSubtle:     '#90949C',  fgOnEmphasis: '#FAFAFA',
                accent:       '#3068D6',  success:      '#3D8038',
                danger:       '#C94555',  warning:      '#925E00',
                done:         '#A626A4',  headerBg:     '#383A42',
                headerFg:     '#E8E8E8',  codeBg:       '#E8E8E8',
                border:       '#D0D0D0',  link:         '#4078F2',
            }
        },

        // ── 12. Ayu Light ── 暖调米白，橙棕点缀 ──────────────────────────
        'ayu-light': {
            name: '🟠 Ayu Light',
            type: 'light',
            tokens: {
                bgDefault:    '#FAFAFA',  bgSubtle:     '#F0F0F0',
                bgInset:      '#E7E8EB',  bgEmphasis:   '#575F66',
                fgDefault:    '#575F66',  fgMuted:      '#6A7278',
                fgSubtle:     '#A0A6AE',  fgOnEmphasis: '#FAFAFA',
                accent:       '#B04C00',  success:      '#3D8038',
                danger:       '#C94555',  warning:      '#8E6010',
                done:         '#7350B0',  headerBg:     '#575F66',
                headerFg:     '#E7E8EB',  codeBg:       '#E7E8EB',
                border:       '#D4D6DA',  link:         '#B04C00',
            }
        },

        // ── 13. Winter ── 冷冽蓝白，冰雪清透 ────────────────────────────
        'winter-light': {
            name: '❄️ Winter Frost',
            type: 'light',
            tokens: {
                bgDefault:    '#F3F7FB',  bgSubtle:     '#E8F0F8',
                bgInset:      '#DCE6F0',  bgEmphasis:   '#1A2B3C',
                fgDefault:    '#2C3E50',  fgMuted:      '#516B84',
                fgSubtle:     '#718C9E',  fgOnEmphasis: '#F3F7FB',
                accent:       '#15689E',  success:      '#237A5C',
                danger:       '#C4423A',  warning:      '#9E5408',
                done:         '#7358B5',  headerBg:     '#1A2B3C',
                headerFg:     '#DCE6F0',  codeBg:       '#DCE6F0',
                border:       '#C8D6E0',  link:         '#1A7AB5',
            }
        },

        // ── 14. Paper ── 米黄纸张，墨水质感 ─────────────────────────────
        'paper-light': {
            name: '📄 Paper',
            type: 'light',
            tokens: {
                bgDefault:    '#F8F4EE',  bgSubtle:     '#F0EBE0',
                bgInset:      '#E8E2D5',  bgEmphasis:   '#3B3628',
                fgDefault:    '#3B3628',  fgMuted:      '#6B6352',
                fgSubtle:     '#8B8270',  fgOnEmphasis: '#F8F4EE',
                accent:       '#4A6DAE',  success:      '#4A7C3F',
                danger:       '#C43535',  warning:      '#9E5E18',
                done:         '#6B4F9E',  headerBg:     '#3B3628',
                headerFg:     '#E8E2D5',  codeBg:       '#E8E2D5',
                border:       '#D8D0C0',  link:         '#4A6DAE',
            }
        },

        // ── 15. Bluloco Light ── 现代蓝灰色调，科技感 ────────────────────
        'bluloco-light': {
            name: '🔷 Bluloco Light',
            type: 'light',
            tokens: {
                bgDefault:    '#F0F4FA',  bgSubtle:     '#E4ECF6',
                bgInset:      '#D8E2F0',  bgEmphasis:   '#1E2740',
                fgDefault:    '#2A3348',  fgMuted:      '#516080',
                fgSubtle:     '#6E7D95',  fgOnEmphasis: '#F0F4FA',
                accent:       '#2968C8',  success:      '#307030',
                danger:       '#B8353D',  warning:      '#985608',
                done:         '#6B46B8',  headerBg:     '#1E2740',
                headerFg:     '#D8E2F0',  codeBg:       '#D8E2F0',
                border:       '#C8D4E4',  link:         '#2968C8',
            }
        },

        // ── 16. Dracula ── 经典暗紫，霓虹点缀 ────────────────────────────
        'dracula': {
            name: '🧛 Dracula',
            type: 'dark',
            tokens: {
                bgDefault:    '#282A36',  bgSubtle:     '#21222C',
                bgInset:      '#191A21',  bgEmphasis:   '#F8F8F2',
                fgDefault:    '#F8F8F2',  fgMuted:      '#888EBF',
                fgSubtle:     '#44475A',  fgOnEmphasis: '#282A36',
                accent:       '#8BE9FD',  success:      '#50FA7B',
                danger:       '#FF6B75',  warning:      '#FFB86C',
                done:         '#BD93F9',  headerBg:     '#191A21',
                headerFg:     '#F8F8F2',  codeBg:       '#191A21',
                border:       '#44475A',  link:         '#8BE9FD',
            }
        },

        // ── 17. One Dark ── Atom 经典暗色，开发者首选 ────────────────────
        'one-dark': {
            name: '🌑 One Dark',
            type: 'dark',
            tokens: {
                bgDefault:    '#282C34',  bgSubtle:     '#21252B',
                bgInset:      '#1B1E24',  bgEmphasis:   '#ABB2BF',
                fgDefault:    '#ABB2BF',  fgMuted:      '#8B93A0',
                fgSubtle:     '#3E4452',  fgOnEmphasis: '#282C34',
                accent:       '#61AFEF',  success:      '#98C379',
                danger:       '#FF6A7A',  warning:      '#E5C07B',
                done:         '#D48DED',  headerBg:     '#1B1E24',
                headerFg:     '#ABB2BF',  codeBg:       '#1B1E24',
                border:       '#383E4A',  link:         '#61AFEF',
            }
        },

        // ── 18. Monokai ── Sublime 经典，温暖暗底 ────────────────────────
        'monokai': {
            name: '🎹 Monokai',
            type: 'dark',
            tokens: {
                bgDefault:    '#272822',  bgSubtle:     '#1E1F1A',
                bgInset:      '#171812',  bgEmphasis:   '#F8F8F0',
                fgDefault:    '#F8F8F0',  fgMuted:      '#8F9086',
                fgSubtle:     '#6A6B61',  fgOnEmphasis: '#272822',
                accent:       '#66D9EF',  success:      '#A6E22E',
                danger:       '#F97074',  warning:      '#E6DB74',
                done:         '#AE81FF',  headerBg:     '#171812',
                headerFg:     '#F8F8F0',  codeBg:       '#171812',
                border:       '#49483E',  link:         '#66D9EF',
            }
        },

        // ── 19. Gruvbox Dark ── 暖棕暗底，怀旧舒适 ──────────────────────
        'gruvbox-dark': {
            name: '🟫 Gruvbox Dark',
            type: 'dark',
            tokens: {
                bgDefault:    '#282828',  bgSubtle:     '#1D2021',
                bgInset:      '#181818',  bgEmphasis:   '#EBDBB2',
                fgDefault:    '#EBDBB2',  fgMuted:      '#A89984',
                fgSubtle:     '#7C6F64',  fgOnEmphasis: '#282828',
                accent:       '#83A598',  success:      '#B8BB26',
                danger:       '#FF6050',  warning:      '#FABD2F',
                done:         '#D3869B',  headerBg:     '#181818',
                headerFg:     '#EBDBB2',  codeBg:       '#181818',
                border:       '#504945',  link:         '#83A598',
            }
        },

        // ── 20. Ayu Mirage ── 蓝灰深底，暖金点缀 ────────────────────────
        'ayu-mirage': {
            name: '🌊 Ayu Mirage',
            type: 'dark',
            tokens: {
                bgDefault:    '#1F2430',  bgSubtle:     '#191E2A',
                bgInset:      '#141822',  bgEmphasis:   '#D9D7CE',
                fgDefault:    '#D9D7CE',  fgMuted:      '#8A9199',
                fgSubtle:     '#5C6773',  fgOnEmphasis: '#1F2430',
                accent:       '#FFCC66',  success:      '#AAD94C',
                danger:       '#FF8080',  warning:      '#FFB454',
                done:         '#D2A6FF',  headerBg:     '#141822',
                headerFg:     '#D9D7CE',  codeBg:       '#141822',
                border:       '#33415E',  link:         '#FFCC66',
            }
        },

        // ── Default (GitHub 原生) ─────────────────────────────────────────
        'default': {
            name: '🔄 GitHub Default',
            type: 'light',
            isDefault: true,
            tokens: null,  // null 表示不注入任何样式，恢复 GitHub 原生
        },
    };

    /* ========================================================================
     *  CSS 变量生成引擎 — 将语义 token 映射为 GitHub Primer 全部 CSS 变量
     * ======================================================================== */

    function hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r},${g},${b},${alpha})`;
    }

    // 记录当前已应用的 CSS 变量名列表（用于切换时清理）
    let _appliedVarNames = [];

    function generateCSSVariables(t) {
        // 衍生色值
        const accentHover    = lightenOrDarken(t.bgDefault, t.accent, 0.12);
        const accentActive   = lightenOrDarken(t.bgDefault, t.accent, 0.18);
        const accentSubtle   = hexToRgba(t.accent, 0.12);
        const accentMuted    = hexToRgba(t.accent, 0.30);
        const dangerSubtle   = hexToRgba(t.danger, 0.10);
        const dangerMuted    = hexToRgba(t.danger, 0.30);
        const successSubtle  = hexToRgba(t.success, 0.10);
        const successMuted   = hexToRgba(t.success, 0.30);
        const warningSubtle  = hexToRgba(t.warning, 0.10);
        const warningMuted   = hexToRgba(t.warning, 0.30);
        const doneSubtle     = hexToRgba(t.done, 0.10);
        const doneMuted      = hexToRgba(t.done, 0.30);
        const borderMuted    = hexToRgba(t.border, 0.55);
        const borderSubtle   = hexToRgba(t.border, 0.35);
        const btnHover       = adjustBrightness(t.bgSubtle, t.type === 'dark' ? 8 : -4);
        const btnActive      = adjustBrightness(t.bgSubtle, t.type === 'dark' ? -4 : -8);
        const controlHover   = adjustBrightness(t.bgInset, t.type === 'dark' ? 8 : -4);
        const shadowColor    = hexToRgba('#000000', t.type === 'dark' ? 0.30 : 0.08);
        const overlayBg      = t.bgSubtle;
        const isDark         = t.type === 'dark';

        // 返回纯变量声明（无 :root 包装），以 ; 分隔，用于直接设置到 document.documentElement.style
        return /* css */ `
  /* ═══ 核心背景 ═══ */
  --bgColor-default:        ${t.bgDefault};
  --bgColor-muted:          ${t.bgSubtle};
  --bgColor-inset:          ${t.bgInset};
  --bgColor-emphasis:       ${t.bgEmphasis};
  --bgColor-transparent:    transparent;
  --bgColor-white:          ${t.bgDefault};
  --bgColor-black:          ${t.bgEmphasis};
  --bgColor-inverse:        ${t.bgEmphasis};
  --bgColor-disabled:       ${t.bgInset};

  /* ═══ 核心文本 ═══ */
  --fgColor-default:        ${t.fgDefault};
  --fgColor-muted:          ${t.fgMuted};
  --fgColor-subtle:         ${t.fgSubtle};
  --fgColor-accent:         ${t.accent};
  --fgColor-onEmphasis:     ${t.fgOnEmphasis};
  --fgColor-onInverse:      ${t.bgDefault};
  --fgColor-disabled:       ${t.fgSubtle};
  --fgColor-link:           ${t.link};
  --fgColor-white:          ${t.bgDefault};
  --fgColor-black:          ${t.fgDefault};

  /* ═══ 语义色 — 文本 ═══ */
  --fgColor-success:        ${t.success};
  --fgColor-danger:         ${t.danger};
  --fgColor-attention:      ${t.warning};
  --fgColor-done:           ${t.done};
  --fgColor-closed:         ${t.fgMuted};
  --fgColor-open:           ${t.success};
  --fgColor-severe:         ${t.danger};
  --fgColor-neutral:        ${t.fgMuted};
  --fgColor-sponsors:       ${t.done};
  --fgColor-upsell:         ${t.done};
  --fgColor-draft:          ${t.fgMuted};

  /* ═══ 语义色 — 背景 ═══ */
  --bgColor-success-emphasis:  ${t.success};
  --bgColor-danger-emphasis:   ${t.danger};
  --bgColor-attention-emphasis:${t.warning};
  --bgColor-done-emphasis:     ${t.done};
  --bgColor-accent-emphasis:   ${t.accent};
  --bgColor-accent-muted:      ${accentSubtle};
  --bgColor-success-muted:     ${successSubtle};
  --bgColor-danger-muted:      ${dangerSubtle};
  --bgColor-attention-muted:   ${warningSubtle};
  --bgColor-done-muted:        ${doneSubtle};
  --bgColor-closed-emphasis:   ${t.fgMuted};
  --bgColor-closed-muted:      ${hexToRgba(t.fgMuted, 0.12)};
  --bgColor-open-emphasis:     ${t.success};
  --bgColor-open-muted:        ${successSubtle};
  --bgColor-severe-emphasis:   ${t.danger};
  --bgColor-severe-muted:      ${dangerSubtle};
  --bgColor-neutral-emphasis:  ${t.fgMuted};
  --bgColor-neutral-muted:     ${hexToRgba(t.fgMuted, 0.12)};
  --bgColor-sponsors-emphasis: ${t.done};
  --bgColor-sponsors-muted:    ${doneSubtle};
  --bgColor-upsell-emphasis:   ${t.done};
  --bgColor-upsell-muted:      ${doneSubtle};
  --bgColor-draft-emphasis:    ${t.fgMuted};
  --bgColor-draft-muted:       ${hexToRgba(t.fgMuted, 0.12)};

  /* ═══ 边框 ═══ */
  --borderColor-default:             ${t.border};
  --borderColor-muted:               ${borderMuted};
  --borderColor-subtle:              ${borderSubtle};
  --borderColor-emphasis:            ${t.fgMuted};
  --borderColor-accent-emphasis:     ${t.accent};
  --borderColor-accent-muted:        ${accentMuted};
  --borderColor-success-emphasis:    ${t.success};
  --borderColor-success-muted:       ${successMuted};
  --borderColor-danger-emphasis:     ${t.danger};
  --borderColor-danger-muted:        ${dangerMuted};
  --borderColor-attention-emphasis:  ${t.warning};
  --borderColor-attention-muted:     ${warningMuted};
  --borderColor-done-emphasis:       ${t.done};
  --borderColor-done-muted:          ${doneMuted};
  --borderColor-closed-emphasis:     ${t.fgMuted};
  --borderColor-closed-muted:        ${borderMuted};
  --borderColor-open-emphasis:       ${t.success};
  --borderColor-open-muted:          ${successMuted};
  --borderColor-severe-emphasis:     ${t.danger};
  --borderColor-severe-muted:        ${dangerMuted};
  --borderColor-neutral-emphasis:    ${t.fgMuted};
  --borderColor-neutral-muted:       ${borderMuted};
  --borderColor-sponsors-emphasis:   ${t.done};
  --borderColor-sponsors-muted:      ${doneMuted};
  --borderColor-upsell-emphasis:     ${t.done};
  --borderColor-upsell-muted:        ${doneMuted};
  --borderColor-draft-emphasis:      ${t.fgMuted};
  --borderColor-draft-muted:         ${hexToRgba(t.fgMuted, 0.30)};
  --borderColor-disabled:            ${hexToRgba(t.fgMuted, 0.10)};
  --borderColor-translucent:         ${hexToRgba(t.fgDefault, 0.15)};
  --borderColor-transparent:         transparent;

  /* ═══ Header 导航栏 ═══ */
  --header-bgColor:             ${t.headerBg};
  --header-fgColor-default:     ${hexToRgba(t.headerFg, 0.75)};
  --header-fgColor-logo:        ${t.headerFg};
  --header-borderColor-divider: ${t.border};
  --headerSearch-bgColor:       ${adjustBrightness(t.headerBg, isDark ? 6 : -6)};
  --headerSearch-borderColor:   ${t.border};

  /* ═══ Page Header (仓库标题栏) ═══ */
  --page-header-bgColor: ${t.bgSubtle};

  /* ═══ 卡片 ═══ */
  --card-bgColor: ${t.bgSubtle};

  /* ═══ 代码区 ═══ */
  --codeMirror-bgColor:               ${t.codeBg};
  --codeMirror-fgColor:               ${t.fgDefault};
  --codeMirror-gutters-bgColor:       ${t.codeBg};
  --codeMirror-lines-bgColor:         ${t.codeBg};
  --codeMirror-activeline-bgColor:    ${hexToRgba(t.fgDefault, 0.06)};
  --codeMirror-cursor-fgColor:        ${t.fgDefault};
  --codeMirror-lineNumber-fgColor:    ${t.fgMuted};
  --codeMirror-selection-bgColor:     ${accentMuted};
  --codeMirror-matchingBracket-fgColor: ${t.fgDefault};
  --codeMirror-gutterMarker-fgColor-default: ${t.bgDefault};
  --codeMirror-gutterMarker-fgColor-muted:   ${t.fgMuted};

  /* 代码语法高亮 */
  --codeMirror-syntax-fgColor-comment:  ${t.fgMuted};
  --codeMirror-syntax-fgColor-constant: ${t.accent};
  --codeMirror-syntax-fgColor-entity:   ${t.done};
  --codeMirror-syntax-fgColor-keyword:  ${t.danger};
  --codeMirror-syntax-fgColor-storage:  ${t.warning};
  --codeMirror-syntax-fgColor-string:   ${t.success};
  --codeMirror-syntax-fgColor-support:  ${t.accent};
  --codeMirror-syntax-fgColor-variable: ${t.warning};

  /* ═══ Prettylights (Markdown 语法高亮) ═══ */
  --color-prettylights-syntax-comment:                  ${t.fgMuted};
  --color-prettylights-syntax-constant:                 ${t.accent};
  --color-prettylights-syntax-entity:                   ${t.done};
  --color-prettylights-syntax-keyword:                  ${t.danger};
  --color-prettylights-syntax-string:                   ${t.success};
  --color-prettylights-syntax-variable:                 ${t.warning};
  --color-prettylights-syntax-constant-other-reference-link: ${t.success};
  --color-prettylights-syntax-entity-tag:               ${t.accent};
  --color-prettylights-syntax-storage-modifier-import:  ${t.fgDefault};
  --color-prettylights-syntax-markup-bold:              ${t.fgDefault};
  --color-prettylights-syntax-markup-italic:            ${t.fgDefault};
  --color-prettylights-syntax-markup-heading:           ${t.accent};
  --color-prettylights-syntax-markup-inserted-bg:       ${successSubtle};
  --color-prettylights-syntax-markup-inserted-text:     ${t.success};
  --color-prettylights-syntax-markup-deleted-bg:        ${dangerSubtle};
  --color-prettylights-syntax-markup-deleted-text:      ${t.danger};
  --color-prettylights-syntax-markup-changed-bg:        ${warningSubtle};
  --color-prettylights-syntax-markup-changed-text:      ${t.warning};
  --color-prettylights-syntax-markup-ignored-bg:        ${t.accent};
  --color-prettylights-syntax-markup-ignored-text:      ${t.border};
  --color-prettylights-syntax-meta-diff-range:          ${t.done};
  --color-prettylights-syntax-brackethighlighter-angle: ${t.fgMuted};
  --color-prettylights-syntax-brackethighlighter-unmatched: ${t.danger};
  --color-prettylights-syntax-sublimelinter-gutter-mark: ${t.fgSubtle};
  --color-prettylights-syntax-string-regexp:            ${t.accent};
  --color-prettylights-syntax-markup-list:              ${t.warning};
  --color-prettylights-syntax-carriage-return-bg:       ${t.danger};
  --color-prettylights-syntax-carriage-return-text:     ${t.bgInset};
  --color-prettylights-syntax-invalid-illegal-bg:       ${dangerSubtle};
  --color-prettylights-syntax-invalid-illegal-text:     ${t.danger};

  /* ═══ 按钮 — Default ═══ */
  --button-default-bgColor-rest:       ${t.bgSubtle};
  --button-default-bgColor-hover:      ${btnHover};
  --button-default-bgColor-active:     ${btnActive};
  --button-default-bgColor-disabled:   ${t.bgInset};
  --button-default-bgColor-selected:   ${btnActive};
  --button-default-fgColor-rest:       ${t.fgDefault};
  --button-default-fgColor-disabled:   ${t.fgSubtle};
  --button-default-borderColor-rest:   ${t.border};
  --button-default-borderColor-hover:  ${t.border};
  --button-default-borderColor-active: ${t.border};
  --button-default-borderColor-disabled: ${borderSubtle};
  --button-default-shadow-resting:     0 1px 0 0 ${hexToRgba(t.fgDefault, 0.04)};

  /* ═══ 按钮 — Primary ═══ */
  --button-primary-bgColor-rest:       ${t.accent};
  --button-primary-bgColor-hover:      ${accentHover};
  --button-primary-bgColor-active:     ${accentActive};
  --button-primary-bgColor-disabled:   ${accentSubtle};
  --button-primary-fgColor-rest:       ${t.fgOnEmphasis};
  --button-primary-fgColor-disabled:   ${hexToRgba(t.fgOnEmphasis, 0.5)};
  --button-primary-borderColor-rest:   transparent;
  --button-primary-borderColor-hover:  transparent;
  --button-primary-borderColor-active: transparent;
  --button-primary-borderColor-disabled: transparent;
  --button-primary-iconColor-rest:     ${hexToRgba(t.fgOnEmphasis, 0.8)};
  --button-primary-iconColor-disabled: ${hexToRgba(t.fgOnEmphasis, 0.5)};
  --button-primary-shadow-selected:    inset 0 1px 0 0 ${hexToRgba('#000', 0.15)};

  /* ═══ 按钮 — Danger ═══ */
  --button-danger-bgColor-rest:        ${t.bgSubtle};
  --button-danger-bgColor-hover:       ${t.danger};
  --button-danger-bgColor-active:      ${adjustBrightness(t.danger, -6)};
  --button-danger-bgColor-disabled:    ${t.bgInset};
  --button-danger-fgColor-rest:        ${t.danger};
  --button-danger-fgColor-hover:       ${t.fgOnEmphasis};
  --button-danger-fgColor-active:      ${t.fgOnEmphasis};
  --button-danger-fgColor-disabled:    ${hexToRgba(t.danger, 0.5)};
  --button-danger-borderColor-rest:    ${t.border};
  --button-danger-borderColor-hover:   transparent;
  --button-danger-borderColor-active:  transparent;
  --button-danger-iconColor-rest:      ${t.danger};
  --button-danger-iconColor-hover:     ${t.fgOnEmphasis};
  --button-danger-iconColor-disabled:  ${hexToRgba(t.danger, 0.5)};
  --button-danger-shadow-selected:     inset 0 1px 0 0 ${hexToRgba('#000', 0.15)};

  /* ═══ 按钮 — Outline ═══ */
  --button-outline-bgColor-rest:       ${t.bgSubtle};
  --button-outline-bgColor-hover:      ${t.accent};
  --button-outline-bgColor-active:     ${accentActive};
  --button-outline-bgColor-disabled:   ${t.bgInset};
  --button-outline-fgColor-rest:       ${t.accent};
  --button-outline-fgColor-hover:      ${t.fgOnEmphasis};
  --button-outline-fgColor-active:     ${t.fgOnEmphasis};
  --button-outline-fgColor-disabled:   ${hexToRgba(t.accent, 0.5)};
  --button-outline-borderColor-hover:  transparent;
  --button-outline-borderColor-active: transparent;
  --button-outline-shadow-selected:    inset 0 1px 0 0 ${hexToRgba('#000', 0.15)};

  /* ═══ 按钮 — Invisible ═══ */
  --button-invisible-bgColor-rest:       transparent;
  --button-invisible-bgColor-hover:      ${hexToRgba(t.fgDefault, 0.08)};
  --button-invisible-bgColor-active:     ${hexToRgba(t.fgDefault, 0.14)};
  --button-invisible-bgColor-disabled:   transparent;
  --button-invisible-fgColor-rest:       ${t.fgDefault};
  --button-invisible-fgColor-hover:      ${t.fgDefault};
  --button-invisible-fgColor-active:     ${t.fgDefault};
  --button-invisible-fgColor-disabled:   ${t.fgSubtle};
  --button-invisible-borderColor-rest:   transparent;
  --button-invisible-borderColor-hover:  transparent;
  --button-invisible-borderColor-disabled: transparent;
  --button-invisible-iconColor-rest:     ${t.fgMuted};
  --button-invisible-iconColor-hover:    ${t.fgMuted};
  --button-invisible-iconColor-disabled: ${t.fgSubtle};

  /* ═══ 按钮 — Inactive ═══ */
  --button-inactive-bgColor: ${t.bgInset};
  --button-inactive-fgColor: ${t.fgMuted};

  /* ═══ 按钮计数器 ═══ */
  --buttonCounter-default-bgColor-rest:    ${hexToRgba(t.fgDefault, 0.10)};
  --buttonCounter-invisible-bgColor-rest:  ${hexToRgba(t.fgDefault, 0.10)};
  --buttonCounter-outline-bgColor-rest:    ${hexToRgba(t.accent, 0.10)};
  --buttonCounter-outline-bgColor-hover:   ${hexToRgba(t.fgOnEmphasis, 0.20)};
  --buttonCounter-outline-fgColor-rest:    ${t.accent};
  --buttonCounter-outline-fgColor-hover:   ${t.fgOnEmphasis};
  --buttonCounter-outline-fgColor-disabled:${hexToRgba(t.accent, 0.5)};
  --buttonCounter-danger-bgColor-rest:     ${hexToRgba(t.danger, 0.10)};
  --buttonCounter-danger-bgColor-hover:    ${hexToRgba(t.fgOnEmphasis, 0.20)};
  --buttonCounter-danger-fgColor-rest:     ${t.danger};
  --buttonCounter-danger-fgColor-hover:    ${t.fgOnEmphasis};
  --buttonCounter-danger-fgColor-disabled: ${hexToRgba(t.danger, 0.5)};
  --buttonCounter-primary-bgColor-rest:    ${hexToRgba('#000', 0.15)};

  /* ═══ 按钮快捷键提示 ═══ */
  --buttonKeybindingHint-default-bgColor-rest:     ${t.bgInset};
  --buttonKeybindingHint-default-bgColor-disabled: ${t.bgInset};
  --buttonKeybindingHint-default-fgColor-rest:     ${t.fgMuted};
  --buttonKeybindingHint-default-fgColor-disabled: ${t.fgSubtle};
  --buttonKeybindingHint-default-borderColor-rest: ${borderMuted};
  --buttonKeybindingHint-default-borderColor-disabled: ${borderSubtle};
  --buttonKeybindingHint-danger-bgColor-rest:      ${t.bgInset};
  --buttonKeybindingHint-danger-fgColor-rest:      ${t.fgMuted};
  --buttonKeybindingHint-danger-borderColor-rest:  ${borderMuted};
  --buttonKeybindingHint-invisible-bgColor-rest:   ${t.bgInset};
  --buttonKeybindingHint-invisible-fgColor-rest:   ${t.fgMuted};
  --buttonKeybindingHint-invisible-borderColor-rest: transparent;
  --buttonKeybindingHint-primary-bgColor-rest:     ${hexToRgba('#000', 0.15)};
  --buttonKeybindingHint-primary-fgColor-rest:     ${t.fgOnEmphasis};
  --buttonKeybindingHint-primary-borderColor-rest: ${hexToRgba(t.fgDefault, 0.15)};

  /* ═══ Star 按钮图标 ═══ */
  --button-star-iconColor: #EAC54F;

  /* ═══ 表单控件 ═══ */
  --control-bgColor-rest:         ${t.bgInset};
  --control-bgColor-hover:        ${controlHover};
  --control-bgColor-active:       ${btnActive};
  --control-bgColor-disabled:     ${t.bgInset};
  --control-bgColor-selected:     ${t.bgInset};
  --control-fgColor-rest:         ${t.fgDefault};
  --control-fgColor-disabled:     ${t.fgSubtle};
  --control-fgColor-placeholder:  ${t.fgMuted};
  --control-borderColor-rest:     ${t.border};
  --control-borderColor-emphasis: ${t.fgMuted};
  --control-borderColor-disabled: ${borderSubtle};
  --control-borderColor-success:  ${t.success};
  --control-borderColor-danger:   ${t.danger};
  --control-borderColor-warning:  ${t.warning};
  --control-iconColor-rest:       ${t.fgMuted};

  /* 表单控件 — Checked (checkbox/radio) */
  --control-checked-bgColor-rest:        ${t.accent};
  --control-checked-bgColor-hover:       ${accentHover};
  --control-checked-bgColor-active:      ${accentActive};
  --control-checked-bgColor-disabled:    ${t.fgSubtle};
  --control-checked-fgColor-rest:        ${t.fgOnEmphasis};
  --control-checked-fgColor-disabled:    ${t.fgOnEmphasis};
  --control-checked-borderColor-rest:    ${t.accent};
  --control-checked-borderColor-hover:   ${accentHover};
  --control-checked-borderColor-active:  ${accentActive};
  --control-checked-borderColor-disabled: ${t.fgSubtle};
  --controlKnob-bgColor-checked:         ${t.fgOnEmphasis};
  --controlKnob-bgColor-disabled:        ${t.bgInset};
  --controlKnob-bgColor-rest:            ${t.fgOnEmphasis};

  /* 表单控件 — Danger variant */
  --control-danger-fgColor-rest:  ${t.danger};
  --control-danger-fgColor-hover: ${t.danger};
  --control-danger-bgColor-hover: ${dangerSubtle};

  /* 表单控件 — Transparent */
  --control-transparent-bgColor-rest:       transparent;
  --control-transparent-bgColor-hover:      ${hexToRgba(t.fgDefault, 0.08)};
  --control-transparent-bgColor-active:     ${hexToRgba(t.fgDefault, 0.14)};
  --control-transparent-bgColor-selected:   ${hexToRgba(t.fgDefault, 0.14)};
  --control-transparent-borderColor-rest:   transparent;
  --control-transparent-borderColor-hover:  transparent;
  --control-transparent-borderColor-active: transparent;

  /* ═══ 下拉菜单 / Overlay ═══ */
  --overlay-bgColor:       ${overlayBg};
  --overlay-borderColor:   ${hexToRgba(t.border, 0.5)};
  --overlay-backdrop-bgColor: ${hexToRgba('#000000', isDark ? 0.5 : 0.18)};

  /* ═══ 菜单 ═══ */
  --menu-bgColor-active: ${hexToRgba(t.fgDefault, 0.06)};
  --selectMenu-bgColor-active: ${hexToRgba(t.accent, 0.15)};
  --selectMenu-borderColor: transparent;

  /* ═══ Tooltip ═══ */
  --tooltip-bgColor: ${t.bgEmphasis};
  --tooltip-fgColor: ${t.fgOnEmphasis};

  /* ═══ 选中高亮 ═══ */
  --selection-bgColor: ${accentMuted};

  /* ═══ Focus 轮廓 ═══ */
  --focus-outlineColor: ${t.accent};
  --focus-outline-color: ${t.accent};

  /* ═══ 时间线徽章 ═══ */
  --timelineBadge-bgColor: ${t.bgInset};

  /* ═══ 侧边栏 ═══ */
  --sideNav-bgColor-selected: ${t.bgDefault};

  /* ═══ 进度条 ═══ */
  --progressBar-bgColor-accent:    ${t.accent};
  --progressBar-bgColor-success:   ${t.success};
  --progressBar-bgColor-danger:    ${t.danger};
  --progressBar-bgColor-attention: ${t.warning};
  --progressBar-bgColor-done:      ${t.done};
  --progressBar-bgColor-neutral:   ${t.fgMuted};
  --progressBar-bgColor-severe:    ${t.danger};
  --progressBar-bgColor-sponsors:  ${t.done};
  --progressBar-track-bgColor:     ${t.border};
  --progressBar-track-borderColor: transparent;

  /* ═══ 通知 ═══ */
  --color-notifications-row-bg:      ${t.bgDefault};
  --color-notifications-row-read-bg: ${t.bgSubtle};

  /* ═══ Avatar ═══ */
  --avatar-bgColor:     ${t.bgDefault};
  --avatar-borderColor: ${hexToRgba(t.fgDefault, 0.15)};
  --avatar-shadow:      0 0 0 2px ${hexToRgba(t.bgDefault, 0.8)};

  /* ═══ 骨架屏 ═══ */
  --skeletonLoader-bgColor: ${hexToRgba(t.fgDefault, 0.10)};

  /* ═══ 影子 ═══ */
  --shadow-inset:              inset 0 1px 0 0 ${hexToRgba(t.fgDefault, 0.04)};
  --shadow-resting-xsmall:     0 1px 1px 0 ${hexToRgba('#000', isDark ? 0.20 : 0.05)};
  --shadow-resting-small:      0 1px 1px 0 ${hexToRgba('#000', isDark ? 0.20 : 0.05)}, 0 1px 2px 0 ${hexToRgba('#000', isDark ? 0.15 : 0.03)};
  --shadow-resting-medium:     0 1px 1px 0 ${hexToRgba('#000', isDark ? 0.20 : 0.06)}, 0 3px 6px 0 ${hexToRgba('#000', isDark ? 0.15 : 0.04)};
  --shadow-floating-small:     0 0 0 1px ${hexToRgba(t.border, 0.25)}, 0 6px 12px -3px ${hexToRgba('#000', isDark ? 0.4 : 0.06)}, 0 6px 18px 0 ${hexToRgba('#000', isDark ? 0.3 : 0.04)};
  --shadow-floating-medium:    0 0 0 1px ${hexToRgba(t.border, 0.25)}, 0 8px 16px -4px ${hexToRgba('#000', isDark ? 0.4 : 0.06)}, 0 4px 32px -4px ${hexToRgba('#000', isDark ? 0.3 : 0.04)}, 0 24px 48px -12px ${hexToRgba('#000', isDark ? 0.25 : 0.04)}, 0 48px 96px -24px ${hexToRgba('#000', isDark ? 0.2 : 0.04)};
  --shadow-floating-large:     0 0 0 1px ${hexToRgba(t.border, 0.25)}, 0 40px 80px 0 ${hexToRgba('#000', isDark ? 0.45 : 0.10)};
  --shadow-floating-xlarge:    0 0 0 1px ${hexToRgba(t.border, 0.25)}, 0 56px 112px 0 ${hexToRgba('#000', isDark ? 0.50 : 0.12)};

  /* ═══ ANSI 终端色 ═══ */
  --color-ansi-black:           ${t.fgDefault};
  --color-ansi-black-bright:    ${t.fgMuted};
  --color-ansi-white:           ${t.fgMuted};
  --color-ansi-white-bright:    ${t.fgSubtle};
  --color-ansi-gray:            ${t.fgMuted};
  --color-ansi-red:             ${t.danger};
  --color-ansi-red-bright:      ${adjustBrightness(t.danger, 10)};
  --color-ansi-green:           ${t.success};
  --color-ansi-green-bright:    ${adjustBrightness(t.success, 10)};
  --color-ansi-yellow:          ${t.warning};
  --color-ansi-yellow-bright:   ${adjustBrightness(t.warning, 15)};
  --color-ansi-blue:            ${t.accent};
  --color-ansi-blue-bright:     ${adjustBrightness(t.accent, 10)};
  --color-ansi-magenta:         ${t.done};
  --color-ansi-magenta-bright:  ${adjustBrightness(t.done, 10)};
  --color-ansi-cyan:            ${adjustBrightness(t.accent, -6)};
  --color-ansi-cyan-bright:     ${t.accent};

  /* ═══ 项目面板 ═══ */
  --color-project-header-bg:   ${t.headerBg};
  --color-project-sidebar-bg:  ${t.bgDefault};
  --color-project-gradient-in: ${t.bgDefault};
  --color-project-gradient-out: transparent;

  /* ═══ Workflow 卡片 ═══ */
  --color-workflow-card-bg:           ${t.bgSubtle};
  --color-workflow-card-header-shadow: transparent;

  /* ═══ 用户提及 ═══ */
  --color-user-mention-fg: ${t.fgDefault};

  /* ═══ Label 标签 (Issue labels) — 使用主题色映射 ═══ */
  --label-blue-bgColor-rest:    ${hexToRgba(t.accent, 0.15)};
  --label-blue-bgColor-hover:   ${hexToRgba(t.accent, 0.30)};
  --label-blue-bgColor-active:  ${hexToRgba(t.accent, 0.45)};
  --label-blue-fgColor-rest:    ${t.accent};
  --label-blue-fgColor-hover:   ${adjustBrightness(t.accent, isDark ? 15 : -15)};
  --label-blue-fgColor-active:  ${adjustBrightness(t.accent, isDark ? 25 : -25)};
  --label-green-bgColor-rest:   ${hexToRgba(t.success, 0.15)};
  --label-green-bgColor-hover:  ${hexToRgba(t.success, 0.30)};
  --label-green-bgColor-active: ${hexToRgba(t.success, 0.45)};
  --label-green-fgColor-rest:   ${t.success};
  --label-red-bgColor-rest:     ${hexToRgba(t.danger, 0.15)};
  --label-red-bgColor-hover:    ${hexToRgba(t.danger, 0.30)};
  --label-red-bgColor-active:   ${hexToRgba(t.danger, 0.45)};
  --label-red-fgColor-rest:     ${t.danger};
  --label-purple-bgColor-rest:  ${hexToRgba(t.done, 0.15)};
  --label-purple-bgColor-hover: ${hexToRgba(t.done, 0.30)};
  --label-purple-bgColor-active:${hexToRgba(t.done, 0.45)};
  --label-purple-fgColor-rest:  ${t.done};
  --label-orange-bgColor-rest:  ${hexToRgba(t.warning, 0.15)};
  --label-orange-bgColor-hover: ${hexToRgba(t.warning, 0.30)};
  --label-orange-bgColor-active:${hexToRgba(t.warning, 0.45)};
  --label-orange-fgColor-rest:  ${t.warning};
  --label-gray-bgColor-rest:    ${hexToRgba(t.fgMuted, 0.12)};
  --label-gray-bgColor-hover:   ${hexToRgba(t.fgMuted, 0.25)};
  --label-gray-bgColor-active:  ${hexToRgba(t.fgMuted, 0.40)};
  --label-gray-fgColor-rest:    ${t.fgMuted};

  /* 所有 label border 统一透明 */
  --label-blue-borderColor:   transparent;
  --label-green-borderColor:  transparent;
  --label-red-borderColor:    transparent;
  --label-purple-borderColor: transparent;
  --label-orange-borderColor: transparent;
  --label-gray-borderColor:   transparent;
  --label-auburn-borderColor: transparent;
  --label-brown-borderColor:  transparent;
  --label-coral-borderColor:  transparent;
  --label-cyan-borderColor:   transparent;
  --label-indigo-borderColor: transparent;
  --label-lemon-borderColor:  transparent;
  --label-lime-borderColor:   transparent;
  --label-olive-borderColor:  transparent;
  --label-pine-borderColor:   transparent;
  --label-pink-borderColor:   transparent;
  --label-plum-borderColor:   transparent;
  --label-teal-borderColor:   transparent;
  --label-yellow-borderColor: transparent;

  /* ═══ 标签 Tag ═══ */
  --topicTag-borderColor: transparent;

  /* ═══ Reaction 按钮 ═══ */
  --reactionButton-selected-bgColor-rest:  ${accentSubtle};
  --reactionButton-selected-bgColor-hover: ${hexToRgba(t.accent, 0.20)};
  --reactionButton-selected-fgColor-rest:  ${t.accent};
  --reactionButton-selected-fgColor-hover: ${adjustBrightness(t.accent, isDark ? 15 : -15)};

  /* ═══ Underline Nav (标签页导航) ═══ */
  --underlineNav-borderColor-active: ${t.accent};
  --underlineNav-borderColor-hover:  ${borderMuted};
  --underlineNav-iconColor-rest:     ${t.fgMuted};

  /* ═══ Diff Blob ═══ */
  --color-diff-blob-selected-line-highlight-mix-blend-mode: ${isDark ? 'screen' : 'multiply'};

  /* ═══ Contribution Graph ═══ */
  --contribution-default-borderColor-0: ${hexToRgba(t.fgDefault, 0.06)};
  --contribution-default-borderColor-1: ${hexToRgba(t.fgDefault, 0.06)};
  --contribution-default-borderColor-2: ${hexToRgba(t.fgDefault, 0.06)};
  --contribution-default-borderColor-3: ${hexToRgba(t.fgDefault, 0.06)};
  --contribution-default-borderColor-4: ${hexToRgba(t.fgDefault, 0.06)};

  /* ═══ Discussions 表情框 ═══ */
  --color-bg-discussions-row-emoji-box: ${hexToRgba(t.border, 0.5)};

  /* ═══ Marketing icons ═══ */
  --color-marketing-icon-primary:   ${t.accent};
  --color-marketing-icon-secondary: ${adjustBrightness(t.accent, isDark ? 15 : -15)};

  /* ═══ 文本色 (color-text-*) ═══ */
  --color-text-white: ${t.bgDefault};
`;
    }

    /* ── 颜色工具函数 ──────────────────────────────────────────────── */
    function lightenOrDarken(bg, color, amount) {
        // amount > 0 → 在暗色背景上变亮 / 亮色背景上变暗（"更强烈"）
        // 简单实现：混合黑色或白色
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        const bgR = parseInt(bg.slice(1, 3), 16);
        const bgG = parseInt(bg.slice(3, 5), 16);
        const bgB = parseInt(bg.slice(5, 7), 16);
        const bgLum = (bgR * 0.299 + bgG * 0.587 + bgB * 0.114);
        const isDark = bgLum < 128;
        const factor = isDark ? 1 + amount : 1 - amount;
        const nr = Math.min(255, Math.max(0, Math.round(r * factor)));
        const ng = Math.min(255, Math.max(0, Math.round(g * factor)));
        const nb = Math.min(255, Math.max(0, Math.round(b * factor)));
        return '#' + [nr, ng, nb].map(c => c.toString(16).padStart(2, '0')).join('');
    }

    function adjustBrightness(hex, amount) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        const nr = Math.min(255, Math.max(0, r + amount));
        const ng = Math.min(255, Math.max(0, g + amount));
        const nb = Math.min(255, Math.max(0, b + amount));
        return '#' + [nr, ng, nb].map(c => c.toString(16).padStart(2, '0')).join('');
    }

    /* ========================================================================
     *  主题应用
     * ======================================================================== */

    function applyTheme(themeKey) {
        const html = document.documentElement;

        // 清理上一次主题设置的所有 CSS 变量
        for (const name of _appliedVarNames) {
            html.style.removeProperty(name);
        }
        _appliedVarNames = [];

        const themeData = themes[themeKey];
        if (!themeData || themeKey === 'default' || !themeData.tokens) return;

        // 生成纯变量声明字符串并一次性设置（cssText += 是单次样式重算，性能最优）
        const declarations = generateCSSVariables(themeData.tokens);

        // 解析出所有变量名以便后续清理
        const varNameRe = /(--[\w-]+)\s*:/g;
        let m;
        while ((m = varNameRe.exec(declarations)) !== null) {
            _appliedVarNames.push(m[1]);
        }

        // 将变量直接写入 <html> 的 inline style — 这比任何样式表优先级都高
        html.style.cssText += declarations;
    }

    /* ========================================================================
     *  UI 面板
     * ======================================================================== */

    class ThemePanel {
        constructor() {
            this.panel = null;
            this.isVisible = false;
            this.currentTheme = GM_getValue('github_theme', 'default');
            this.searchQuery = '';
        }

        createPanel() {
            if (this.panel) return this.panel;

            const panel = document.createElement('div');
            panel.id = 'github-theme-panel';
            panel.innerHTML = `
                <div class="theme-panel-header">
                    <div class="theme-panel-title-section">
                        <h3>🎨 主题选择器</h3>
                        <span class="theme-count">${Object.keys(themes).length - 1} 款主题</span>
                    </div>
                    <div class="theme-panel-actions">
                        <div class="theme-search-wrapper">
                            <input type="text" id="theme-search" placeholder="🔍 搜索主题..." />
                        </div>
                        <button class="theme-panel-close" title="关闭 (ESC)">×</button>
                    </div>
                </div>
                <div class="theme-panel-content">
                    <div class="theme-section">
                        <h4>☀️ 浅色主题 <span class="theme-type-count" id="light-count"></span></h4>
                        <div class="theme-grid" id="light-themes"></div>
                    </div>
                    <div class="theme-section">
                        <h4>🌙 深色主题 <span class="theme-type-count" id="dark-count"></span></h4>
                        <div class="theme-grid" id="dark-themes"></div>
                    </div>
                    <div class="theme-empty-state" id="empty-state" style="display: none;">
                        <div class="empty-state-icon">🔍</div>
                        <p>没有找到匹配的主题</p>
                        <small>试试其他关键词吧</small>
                    </div>
                </div>
                <div class="theme-panel-footer">
                    <div class="footer-left">
                        <span class="current-theme-label">当前：</span>
                        <span id="current-theme-name" class="current-theme-value"></span>
                    </div>
                    <div class="footer-right">
                        <button class="reset-theme-button" id="reset-theme-btn" title="恢复默认主题">
                            🔄 恢复默认
                        </button>
                        <span class="footer-shortcuts">⌨️ Ctrl+Shift+T</span>
                    </div>
                </div>
            `;

            document.body.appendChild(panel);
            this.panel = panel;
            this.setupPanelStyles();
            this.renderThemeButtons();
            this.setupEventListeners();
            this.setupSearch();
            this.updateCurrentThemeInfo();
            return panel;
        }

        setupPanelStyles() {
            GM_addStyle(`
                /* 面板容器 */
                #github-theme-panel {
                    position: fixed;
                    top: 50%;
                    right: 20px;
                    transform: translateY(-50%);
                    width: 420px;
                    max-height: 85vh;
                    background: #ffffff;
                    border: 1px solid #e1e4e8;
                    border-radius: 12px;
                    box-shadow: 0 12px 48px rgba(0, 0, 0, 0.12);
                    z-index: 9999;
                    display: none;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
                    overflow: hidden;
                    color: #24292f;
                }

                #github-theme-panel.show {
                    display: flex;
                    flex-direction: column;
                    animation: panelSlideIn 0.25s ease-out;
                }

                @keyframes panelSlideIn {
                    from { opacity: 0; transform: translate(20px, -50%); }
                    to   { opacity: 1; transform: translate(0, -50%); }
                }

                .theme-panel-header {
                    padding: 20px 20px 16px;
                    border-bottom: 1px solid #e1e4e8;
                    background: #ffffff;
                }

                .theme-panel-title-section {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 12px;
                }
                .theme-panel-title-section h3 {
                    margin: 0;
                    font-size: 18px;
                    font-weight: 600;
                }
                .theme-count {
                    font-size: 12px;
                    color: #656d76;
                    background: #f6f8fa;
                    padding: 4px 10px;
                    border-radius: 12px;
                    font-weight: 500;
                }

                .theme-panel-actions {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .theme-search-wrapper { flex: 1; }

                #theme-search {
                    width: 100%;
                    padding: 8px 12px 8px 36px;
                    border: 1px solid #d0d7de;
                    border-radius: 6px;
                    font-size: 14px;
                    background: #f6f8fa;
                    color: #24292f;
                    transition: all 0.2s;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23656d76' stroke-width='2'%3E%3Ccircle cx='11' cy='11' r='8'%3E%3C/circle%3E%3Cpath d='m21 21-4.3-4.3'%3E%3C/path%3E%3C/svg%3E");
                    background-repeat: no-repeat;
                    background-position: 12px center;
                }
                #theme-search:focus {
                    outline: none;
                    border-color: #0969da;
                    background-color: #ffffff;
                    box-shadow: 0 0 0 3px rgba(9, 105, 218, 0.15);
                }

                .theme-panel-close {
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #656d76;
                    padding: 4px 8px;
                    border-radius: 6px;
                    transition: all 0.2s;
                    line-height: 1;
                }
                .theme-panel-close:hover { background: #f3f4f6; color: #24292f; }

                .theme-panel-content {
                    flex: 1;
                    overflow-y: auto;
                    padding: 16px 20px;
                    background: #ffffff;
                }
                .theme-panel-content::-webkit-scrollbar { width: 6px; }
                .theme-panel-content::-webkit-scrollbar-thumb {
                    background: #d0d7de;
                    border-radius: 3px;
                }

                .theme-section { margin-bottom: 24px; }
                .theme-section h4 {
                    margin: 0 0 12px 0;
                    font-size: 13px;
                    font-weight: 600;
                    color: #656d76;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .theme-type-count {
                    font-size: 12px;
                    background: #f6f8fa;
                    padding: 2px 8px;
                    border-radius: 10px;
                    font-weight: normal;
                    color: #656d76;
                }

                .theme-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 8px;
                }

                .theme-button {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 12px;
                    border: 2px solid #d0d7de;
                    border-radius: 8px;
                    background: #ffffff;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-size: 13px;
                    color: #24292f;
                    width: 100%;
                    text-align: left;
                    position: relative;
                }
                .theme-button:hover {
                    border-color: #0969da;
                    background: #f6f8fa;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
                }
                .theme-button.active {
                    border-color: #1a7f37;
                    background: #dafbe1;
                }
                .theme-button.active::after {
                    content: '✓';
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    font-size: 12px;
                    color: #1a7f37;
                    font-weight: bold;
                }

                .theme-color-preview {
                    width: 32px;
                    height: 32px;
                    border-radius: 6px;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    flex-shrink: 0;
                }
                .theme-button-text {
                    flex: 1;
                    font-weight: 500;
                    font-size: 13px;
                    line-height: 1.3;
                }
                .theme-button-subtitle {
                    display: block;
                    font-weight: normal;
                    font-size: 11px;
                    color: #656d76;
                    margin-top: 1px;
                }

                .theme-empty-state {
                    text-align: center;
                    padding: 40px 20px;
                    color: #656d76;
                }
                .empty-state-icon { font-size: 48px; margin-bottom: 12px; }
                .theme-empty-state p { font-size: 16px; margin: 8px 0; color: #24292f; }
                .theme-empty-state small { font-size: 13px; color: #656d76; }

                .theme-panel-footer {
                    padding: 12px 20px;
                    border-top: 1px solid #e1e4e8;
                    background: #ffffff;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .footer-left { display: flex; align-items: center; gap: 6px; }
                .current-theme-label { font-size: 13px; color: #656d76; }
                .current-theme-value { font-weight: 600; color: #0969da; font-size: 13px; }
                .footer-right { display: flex; align-items: center; gap: 12px; }
                .reset-theme-button {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    padding: 6px 12px;
                    border: 1px solid #d0d7de;
                    border-radius: 6px;
                    background: #f6f8fa;
                    color: #24292f;
                    cursor: pointer;
                    font-size: 12px;
                    font-weight: 500;
                    transition: all 0.2s;
                    white-space: nowrap;
                }
                .reset-theme-button:hover { background: #eaeef2; border-color: #0969da; color: #0969da; }
                .reset-theme-button:active { background: #d0d7de; transform: scale(0.98); }
                .footer-shortcuts {
                    font-size: 11px;
                    color: #656d76;
                    background: #f6f8fa;
                    padding: 4px 8px;
                    border-radius: 6px;
                    white-space: nowrap;
                }

                @media (max-width: 480px) {
                    #github-theme-panel {
                        right: 8px;
                        width: calc(100vw - 16px);
                        max-width: 380px;
                        max-height: 90vh;
                    }
                    .theme-grid { grid-template-columns: 1fr; }
                }
            `);
        }

        renderThemeButtons(filter = '') {
            const lightGrid = document.getElementById('light-themes');
            const darkGrid = document.getElementById('dark-themes');
            const emptyState = document.getElementById('empty-state');
            if (!lightGrid || !darkGrid) return;

            lightGrid.innerHTML = '';
            darkGrid.innerHTML = '';

            let lightCount = 0, darkCount = 0;
            const searchTerm = filter.toLowerCase();

            // default first, then rest
            const sorted = Object.entries(themes).sort(([a], [b]) => {
                if (a === 'default') return -1;
                if (b === 'default') return 1;
                return 0;
            });

            sorted.forEach(([key, theme]) => {
                if (searchTerm && !theme.name.toLowerCase().includes(searchTerm) &&
                    !key.toLowerCase().includes(searchTerm)) return;

                const button = this.createThemeButton(key, theme);
                if (key === 'default') {
                    lightGrid.appendChild(button);
                    lightCount++;
                } else if (theme.type === 'light') {
                    lightGrid.appendChild(button);
                    lightCount++;
                } else {
                    darkGrid.appendChild(button);
                    darkCount++;
                }
            });

            const lightCountEl = document.getElementById('light-count');
            const darkCountEl = document.getElementById('dark-count');
            if (lightCountEl) lightCountEl.textContent = `(${lightCount})`;
            if (darkCountEl) darkCountEl.textContent = `(${darkCount})`;

            if (emptyState) emptyState.style.display = (lightCount + darkCount === 0) ? 'block' : 'none';

            const lightSection = lightGrid.closest('.theme-section');
            const darkSection = darkGrid.closest('.theme-section');
            if (lightSection) lightSection.style.display = lightCount === 0 ? 'none' : 'block';
            if (darkSection) darkSection.style.display = darkCount === 0 ? 'none' : 'block';
        }

        createThemeButton(key, theme) {
            const button = document.createElement('button');
            button.className = 'theme-button';
            button.dataset.theme = key;
            if (key === this.currentTheme) button.classList.add('active');

            // Generate a preview gradient from the theme tokens
            let previewBg;
            if (key === 'default') {
                previewBg = '#ffffff';
            } else {
                const t = theme.tokens;
                previewBg = `linear-gradient(135deg, ${t.bgDefault} 0%, ${t.bgSubtle} 50%, ${t.accent} 100%)`;
            }

            const subtitle = theme.isDefault ? 'GitHub 原生主题' : key;

            button.innerHTML = `
                <div class="theme-color-preview" style="background: ${previewBg};"></div>
                <div class="theme-button-text">
                    ${theme.name}
                    <span class="theme-button-subtitle">${subtitle}</span>
                </div>
            `;

            button.addEventListener('click', () => {
                this.switchTheme(key);
                button.style.transform = 'scale(0.96)';
                setTimeout(() => { button.style.transform = ''; }, 150);
            });

            return button;
        }

        switchTheme(themeKey) {
            const theme = themes[themeKey];
            if (!theme) return;

            GM_setValue('github_theme', themeKey);
            this.currentTheme = themeKey;

            document.querySelectorAll('.theme-button').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.theme === themeKey);
            });

            this.updateCurrentThemeInfo();
            applyTheme(themeKey);
            this.showToast(`${theme.name} 已应用`);
        }

        resetToDefault() {
            this.switchTheme('default');
            this.showToast('已恢复为 GitHub 默认主题');
        }

        showToast(message) {
            const oldToast = document.querySelector('.theme-toast');
            if (oldToast) oldToast.remove();

            const toast = document.createElement('div');
            toast.className = 'theme-toast';
            toast.textContent = message;
            toast.style.cssText = `
                position: fixed;
                bottom: 24px;
                left: 50%;
                transform: translateX(-50%);
                background: #24292f;
                color: white;
                padding: 10px 20px;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 500;
                z-index: 10000;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
                animation: toastSlideUp 0.3s ease, toastFadeOut 0.3s ease 2.7s forwards;
                pointer-events: none;
            `;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        }

        updateCurrentThemeInfo() {
            const nameElement = document.getElementById('current-theme-name');
            if (nameElement) {
                const theme = themes[this.currentTheme];
                nameElement.textContent = theme ? theme.name : '未知主题';
            }
        }

        setupSearch() {
            const searchInput = document.getElementById('theme-search');
            if (searchInput) {
                let debounceTimer;
                searchInput.addEventListener('input', (e) => {
                    clearTimeout(debounceTimer);
                    debounceTimer = setTimeout(() => {
                        this.searchQuery = e.target.value;
                        this.renderThemeButtons(this.searchQuery);
                    }, 200);
                });
                searchInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        searchInput.value = '';
                        this.searchQuery = '';
                        this.renderThemeButtons('');
                        e.stopPropagation();
                    }
                });
            }
        }

        setupEventListeners() {
            const closeBtn = this.panel.querySelector('.theme-panel-close');
            if (closeBtn) closeBtn.addEventListener('click', () => this.hide());

            const resetBtn = document.getElementById('reset-theme-btn');
            if (resetBtn) resetBtn.addEventListener('click', () => this.resetToDefault());

            document.addEventListener('click', (e) => {
                if (this.isVisible && this.panel && !this.panel.contains(e.target)) this.hide();
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isVisible) this.hide();
            });
        }

        show() {
            if (!this.panel) this.createPanel();
            this.panel.classList.add('show');
            this.isVisible = true;
            setTimeout(() => {
                const searchInput = document.getElementById('theme-search');
                if (searchInput) searchInput.focus();
            }, 100);
        }

        hide() {
            if (this.panel) {
                this.panel.classList.remove('show');
                this.isVisible = false;
            }
        }

        toggle() {
            this.isVisible ? this.hide() : this.show();
        }
    }

    /* ========================================================================
     *  动画 & 主入口
     * ======================================================================== */

    function injectAnimations() {
        GM_addStyle(`
            @keyframes toastSlideUp {
                from { opacity: 0; transform: translate(-50%, 20px); }
                to   { opacity: 1; transform: translate(-50%, 0); }
            }
            @keyframes toastFadeOut {
                from { opacity: 1; }
                to   { opacity: 0; }
            }
        `);
    }

    let themePanel = null;

    function init() {
        injectAnimations();
        themePanel = new ThemePanel();

        const savedTheme = GM_getValue('github_theme', 'default');
        applyTheme(savedTheme);

        GM_registerMenuCommand('🎨 打开主题面板', () => {
            themePanel && themePanel.toggle();
        });

        GM_registerMenuCommand('🔄 恢复默认主题', () => {
            if (themePanel) {
                themePanel.resetToDefault();
            } else {
                GM_setValue('github_theme', 'default');
                applyTheme('default');
            }
        });

        document.addEventListener('keydown', (e) => {
            // Ctrl+Shift+T → toggle panel
            if (e.ctrlKey && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                themePanel && themePanel.toggle();
            }
            // Ctrl+Shift+Left/Right → cycle themes
            if (e.ctrlKey && e.shiftKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
                e.preventDefault();
                const keys = Object.keys(themes);
                const idx = keys.indexOf(themePanel.currentTheme);
                const newIdx = e.key === 'ArrowRight'
                    ? (idx + 1) % keys.length
                    : (idx - 1 + keys.length) % keys.length;
                themePanel.switchTheme(keys[newIdx]);
            }
        });

        // bfcache 恢复时重新注入主题（浏览器后退/前进）
        window.addEventListener('pageshow', (e) => {
            if (e.persisted) {
                const saved = GM_getValue('github_theme', 'default');
                applyTheme(saved);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
