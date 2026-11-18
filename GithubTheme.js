// ==UserScript==
// @name         GitHub Themes
// @namespace    github-themes
// @version      1.4.0.2
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

        // ── 21. Warm Paper ── 暖白纸感，墨字青绿冷锚 ───────────────────
        // 设计：底不刺眼(暖白掺黄)、字是墨(暖调深灰)、青绿做冷锚、
        //       标题色相谱(藏蓝→紫→青绿→玫红→琥珀)承载层级
        'warm-paper': {
            name: '🪶 Warm Paper',
            type: 'light',
            tokens: {
                bgDefault:    '#faf7f1',  bgSubtle:     '#f1ebe1',
                bgInset:      '#e9e1d4',  bgEmphasis:   '#1d345c',
                fgDefault:    '#3d3730',  fgMuted:      '#5f564b',
                fgSubtle:     '#857a6b',  fgOnEmphasis: '#faf7f1',
                accent:       '#0e6e63',  success:      '#3e6b34',
                danger:       '#b0404f',  warning:      '#8f5e16',
                done:         '#52377a',  headerBg:     '#1d345c',
                headerFg:     '#faf7f1',  codeBg:       '#e9e1d4',
                border:       '#d8cdbb',  link:         '#0e6e63',
            }
        },

        // ── 22. Warm Paper Dark ── 同色相提亮，换光线不换皮肤 ───────────
        'warm-paper-dark': {
            name: '🕯️ Warm Paper Dark',
            type: 'dark',
            tokens: {
                bgDefault:    '#262322',  bgSubtle:     '#312d29',
                bgInset:      '#1a1815',  bgEmphasis:   '#e9e2d6',
                fgDefault:    '#e9e2d6',  fgMuted:      '#b0a58f',
                fgSubtle:     '#8a8070',  fgOnEmphasis: '#262322',
                accent:       '#6db3a3',  success:      '#a3c98f',
                danger:       '#e58a98',  warning:      '#e3b26a',
                done:         '#ad94d9',  headerBg:     '#1b2a45',
                headerFg:     '#e9e2d6',  codeBg:       '#1d1a17',
                border:       '#47413a',  link:         '#6db3a3',
            }
        },

        // ── 23. VSCode 2026 Dark ── 冷灰蓝，编辑器质感 ──────────────────
        // 提炼自 VSCode「2026 Dark」(dark_modern)：editor #121314 为最凹层、
        // UI 面板 #191A1B、青蓝 #297AA0 做主按钮与强调、链接亮蓝 #48A0C7
        'vscode-2026-dark': {
            name: '💻 2026 Dark',
            type: 'dark',
            tokens: {
                bgDefault:    '#191A1B',  bgSubtle:     '#202122',
                bgInset:      '#121314',  bgEmphasis:   '#333536',
                fgDefault:    '#bfbfbf',  fgMuted:      '#8C8C8C',
                fgSubtle:     '#7a7b7d',  fgOnEmphasis: '#ffffff',
                accent:       '#297AA0',  success:      '#73c991',
                danger:       '#f48771',  warning:      '#e5ba7d',
                done:         '#d2a8ff',  headerBg:     '#121314',
                headerFg:     '#bfbfbf',  codeBg:       '#121314',
                border:       '#333536',  link:         '#48A0C7',
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

        // Box-row 悬停增强（Release / 列表行）— 左侧竖条跟随主题 accent
        const boxRowHoverBg  = isDark ? hexToRgba(t.accent, 0.18) : hexToRgba(t.accent, 0.10);

        // 返回 :root 块，每个声明带 !important（确保覆盖 GitHub 样式并存活 bfcache）
        const css = /* css */ `
:root {
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

  /* ═══ Release 资产徽章色调（按明暗自动挑选可读色）═══ */
  --ghb-win:       ${isDark ? '#6cb6ff' : '#0969da'};
  --ghb-mac:       ${isDark ? '#c297ff' : '#8250df'};
  --ghb-linux:     ${isDark ? '#f0a632' : '#9a6700'};
  --ghb-android:   ${isDark ? '#56d364' : '#1a7f37'};
  --ghb-ios:       ${isDark ? '#ff80c8' : '#bf3989'};
  --ghb-portable:  ${isDark ? '#4fd1a5' : '#1a7f5a'};
  --ghb-meta:      ${t.fgSubtle};
  --ghb-neutral:   ${isDark ? '#a7b0bd' : '#6b7280'};
  --ghb-star:      ${isDark ? '#ffd33d' : '#bf8700'};

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

  /* ═══ Box-row 悬停增强 — 左侧竖条 / 悬停底色（供 github-boxrow-style 引用） ═══ */
  --ghb-accent-bar:      ${t.accent};
  --ghb-boxrow-hover-bg: ${boxRowHoverBg};
}
`;
        // 给所有 CSS 变量声明追加 !important（确保覆盖 GitHub 样式 & bfcache 恢复）
        return css.replace(/^(  --[\w-]+:[^;]*);$/gm, '$1 !important;');
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
        // 移除旧主题样式元素
        const oldStyle = document.getElementById('github-theme-style');
        if (oldStyle) oldStyle.remove();

        const themeData = themes[themeKey];
        if (!themeData || themeKey === 'default' || !themeData.tokens) return;

        // 生成 CSS 并注入为 <style> 元素（DOM 元素可存活 bfcache，比 inline style 更可靠）
        const css = generateCSSVariables(themeData.tokens);
        const styleEl = document.createElement('style');
        styleEl.id = 'github-theme-style';
        styleEl.textContent = css;
        document.head.appendChild(styleEl);
    }

    /* ========================================================================
     *  Box-row 悬停增强 — 左侧竖条 + 悬停底色，颜色随主题 accent 变化
     *  独立于主题样式，默认常驻注入；默认主题下用 GitHub 原生蓝兜底
     * ======================================================================== */

    function applyBoxRowEnhancement() {
        const enabled = GM_getValue('github_boxrow_enabled', true);
        const width   = Math.min(16, Math.max(2, GM_getValue('github_boxrow_bar_width', 4)));
        let el = document.getElementById('github-boxrow-style');

        // 关闭增强 → 移除样式（彻底还原，不强制直角 / 分隔线）
        if (!enabled) {
            if (el) el.remove();
            return;
        }

        const css = /* css */ `
/* 列表项强制直角，悬停时显示主题色左侧竖条 */
.Box-row {
  border-radius: 0 !important;
}
.Box-row:hover {
  background-color: var(--ghb-boxrow-hover-bg, #f0f6ff) !important;
  box-shadow: inset ${width}px 0 0 var(--ghb-accent-bar, #0969da) !important;
  border-radius: 0 !important;
  transition: background-color 0.15s ease, box-shadow 0.15s ease;
}
/* 悬停时链接色跟随主题强调色 */
.Box-row:hover a {
  color: var(--fgColor-link, #0550ae) !important;
}
/* 自定义下载按钮（如 Releases 页）反馈 */
.Box-row:hover .ghb-dl-btn {
  background: var(--ghb-boxrow-hover-bg, #eaf3ff) !important;
  border-color: var(--ghb-accent-bar, #58a6ff) !important;
  color: var(--fgColor-link, #0550ae) !important;
}
`;
        if (!el) {
            el = document.createElement('style');
            el.id = 'github-boxrow-style';
            document.head.appendChild(el);
        }
        el.textContent = css;
    }

    /* ========================================================================
     *  Release 分组排序 — 按系统（Windows/macOS/Linux/Android/iOS）重排下载项
     *  同系统文件聚拢，且同系统 .octicon-package 图标统一着色、跨系统颜色不同
     *  默认关闭，由面板开关控制
     * ======================================================================== */

    const PLATFORM_ORDER = ['windows', 'mac', 'linux', 'android', 'ios'];
    const PLATFORM_COLORS = {
        windows: '#0078d4',   // Windows 蓝
        mac:     '#8e8e93',   // 银灰
        linux:   '#f5803e',   // 橙（Tux 风）
        android: '#3ddc84',   // Android 绿
        ios:     '#5e5ce6'    // iOS 靛紫
    };

    // 从文件名（优先下载链接 href 的 basename）判定所属系统
    function ghbAssetName(row) {
        const a = row.querySelector('a');
        if (a) {
            const href = a.getAttribute('href') || '';
            const last = href.split('/').pop();
            if (last) return decodeURIComponent(last);
        }
        return (row.textContent || '').trim();
    }

    function detectPlatform(name) {
        const n = name.toLowerCase();
        const tok = (s) => new RegExp('(^|[-_.])' + s + '(\\d|[-_.]|$)', 'i').test(n);
        if (/\.apk$|\.aab$|\.xapk$|\.apks$|\.obb$|android/.test(n)) return 'android';
        if (/\.ipa$|\bios\b/.test(n)) return 'ios';
        if (/\.exe$|\.msi$|\.msix$|\.msixbundle$|\.appx$|\.appxbundle$|\.msixupload$|\.appxupload$|\.xap$|windows|win32|win64|mingw/.test(n) || tok('win')) return 'windows';
        if (/\.dmg$|\.pkg$|macos|macosx|osx|darwin/.test(n) || tok('mac')) return 'mac';
        if (/\.appimage$|\.deb$|\.rpm$|\.snap$|\.flatpak$|linux|ubuntu/.test(n)) return 'linux';
        return 'other';
    }

    function platformRank(row) {
        const i = PLATFORM_ORDER.indexOf(detectPlatform(ghbAssetName(row)));
        return i === -1 ? 999 : i;
    }

    function colorReleaseIcon(row, enabled) {
        const svg = row.querySelector('.octicon-package');
        if (!svg) return;
        if (!enabled) { svg.style.removeProperty('color'); return; }
        const color = PLATFORM_COLORS[detectPlatform(ghbAssetName(row))];
        if (color) svg.style.setProperty('color', color, 'important');
        else svg.style.removeProperty('color');
    }

    let ghbGroupCounter = 0;

    function applyReleaseGrouping() {
        const enabled = GM_getValue('github_release_group_enabled', false);
        const assets = Array.from(document.querySelectorAll('.Box-row'))
            .filter(r => r.querySelector('.octicon-package'));
        if (!assets.length) return;

        // 按父容器分组（避免误排页面其它 .Box-row）
        const byParent = new Map();
        assets.forEach(r => {
            const p = r.parentElement;
            if (!byParent.has(p)) byParent.set(p, []);
            byParent.get(p).push(r);
        });

        byParent.forEach((rows) => {
            const parent = rows[0].parentElement;
            // 首次见到时记录原始相对序，供关闭后还原
            rows.forEach((r) => { if (r.dataset.ghbOrig == null) r.dataset.ghbOrig = String(++ghbGroupCounter); });

            const target = rows.slice().sort((a, b) => {
                if (enabled) {
                    const ra = platformRank(a), rb = platformRank(b);
                    if (ra !== rb) return ra - rb;
                }
                return (+a.dataset.ghbOrig) - (+b.dataset.ghbOrig);
            });

            // 仅在顺序变化时重排，避免 MutationObserver 死循环
            const children = Array.from(parent.children);
            const assetSet = new Set(rows);
            const result = [];
            let si = 0;
            children.forEach(c => result.push(assetSet.has(c) ? target[si++] : c));
            const changed = children.some((c, i) => c !== result[i]);
            if (changed) result.forEach(el => parent.appendChild(el));

            rows.forEach(r => colorReleaseIcon(r, enabled));
        });
    }

    // 监听动态加载（GitHub 资源常异步渲染），仅在开启时生效
    let ghbReleaseObserver = null;
    function setupReleaseGroupingObserver() {
        if (ghbReleaseObserver) return;
        let timer = null;
        ghbReleaseObserver = new MutationObserver(() => {
            const grouping = GM_getValue('github_release_group_enabled', false);
            const hints = GM_getValue('github_release_hint_enabled', true);
            if (!grouping && !hints) return;
            clearTimeout(timer);
            timer = setTimeout(() => { applyReleaseGrouping(); applyAssetHints(); }, 300);
        });
        ghbReleaseObserver.observe(document.documentElement, { childList: true, subtree: true });
    }

    /* ========================================================================
     *  Release 资产类型提示 — 从文件名推断「是什么 / 给谁用 / 怎么装」
     *  · 行内徽章：类型图标 + 短文案；本机系统可用的包在类型文案前加 ⭐
     *  · 悬停 / 键盘聚焦 / 触屏点击 → 悬浮说明面板
     *  · 校验和、签名、SBOM 等元数据只显示图标并弱化，避免喧宾夺主
     *  · 浮层挂在 body + position:fixed，避免被 .Box 的 overflow 裁切
     *  · 纯文件名推断，无网络请求；关闭开关即完全移除
     * ======================================================================== */

    const PLATFORM_LABELS = {
        windows: 'Windows', mac: 'macOS', linux: 'Linux',
        android: 'Android', ios: 'iOS'
    };

    // 资产类型规则：按顺序先命中者胜（元数据在前，避免 *.dSYM.zip 被当成压缩包）
    // 每条可带 tone（徽章色调：neutral/meta/win/mac/linux/android/ios），供样式层区分
    const ASSET_KIND_RULES = [
        {
            id: 'signature', meta: true, icon: '🔏', chip: '签名', name: '分离签名', tone: 'meta',
            re: /\.(sig|asc|minisig|p7s)$/i,
            audience: '安全审计、镜像站、CI',
            usage: '用 GPG / minisign 验证文件确实由作者发布',
            note: '不是安装包，普通用户不需要下载'
        },
        {
            id: 'checksum', meta: true, icon: '🧾', chip: '校验和', name: '校验和文件', tone: 'meta',
            re: /(^|[-_.])(sha256sums?|sha512sums?|checksums?|digests?)(\.(txt|asc))?$|\.(sha256|sha512|sha1|md5|b2sum)$/i,
            audience: '运维、谨慎用户、CI',
            usage: '用 sha256sum -c 核对文件完整、未被篡改',
            note: '可选文件，普通用户可忽略'
        },
        {
            id: 'sbom', meta: true, icon: '📜', chip: 'SBOM', name: '软件物料清单（SBOM）', tone: 'meta',
            re: /\.(sbom\.json|spdx(\.json|\.xml)?|cdx\.(json|xml))$/i,
            audience: '合规、安全扫描、企业采购',
            usage: '列出依赖与许可证，用于漏洞与合规审计',
            note: '普通用户不需要'
        },
        {
            id: 'provenance', meta: true, icon: '🛡️', chip: '来源证明', name: 'SLSA 构建来源证明', tone: 'meta',
            re: /\.(intoto\.jsonl|sigstore(\.json)?|attestation)$|provenance\.json$/i,
            audience: '供应链安全、审计',
            usage: '用 slsa-verifier 校验二进制由哪个工作流构建',
            note: '普通用户不需要'
        },
        {
            id: 'symbols', meta: true, icon: '🐞', chip: '调试符号', name: '调试符号', tone: 'meta',
            re: /(\.pdb$|\.dSYM\.zip$|\.dbg$|\.sym$|-debug(info)?\.|-dbgsym\.|\.debuginfo$|\.ddeb$)/i,
            audience: '开发者排障',
            usage: '崩溃时把地址还原成函数名（配合调试器）',
            note: '普通用户不需要'
        },
        {
            id: 'updater', meta: true, icon: '♻️', chip: '更新元数据', name: '自动更新元数据', tone: 'meta',
            re: /\.blockmap$|\.delta$|\.appinstaller$|^latest(-[a-z0-9]+)?\.(ya?ml|json)$|appcast\.xml$/i,
            audience: '应用内的更新器',
            usage: '由客户端自动拉取，用于增量或版本检查',
            note: '无需手动下载'
        },
        {
            id: 'android', icon: '🤖', chip: 'Android', name: 'Android 安装包', tone: 'android',
            re: /\.(apk|aab|xapk|apks|obb)$/i,
            audience: 'Android 用户',
            usage: '安装 .apk 前需允许「未知来源」；.aab 只能上架应用商店',
            note: '多数手机选 arm64-v8a 版本'
        },
        {
            id: 'ios', icon: '📱', chip: 'iOS', name: 'iOS 安装包', tone: 'ios',
            re: /\.ipa$/i,
            audience: 'iOS 开发者、越狱用户',
            usage: '需要签名或侧载工具，普通用户无法直接安装'
        },
        {
            // 商店上传包（upload）只用于开发者上架，普通用户下了也用不了
            id: 'win-store-upload', meta: true, icon: '📤', chip: '商店上传包', name: 'Windows 商店上传包（MSIX/AppX upload）', tone: 'meta',
            re: /\.(msixupload|appxupload)$/i,
            audience: '应用开发者（Microsoft Store 上架）',
            usage: '在 Partner Center 上传，不能直接双击安装',
            note: '普通用户别下，请选 msixbundle / appxbundle'
        },
        {
            // 注意：msixbundle / appxbundle 必须排在 msix / appx 之前，否则会被 \.(msix|appx)$ 抢先命中
            id: 'win-store', icon: '🪟', chip: 'Windows 应用包', name: 'Windows 商店应用包（MSIX/AppX 系列）', tone: 'win',
            re: /\.(msixbundle|appxbundle|msix|appx|xap)$/i,
            audience: 'Windows 10/11 用户、上架开发者',
            usage: '双击或用 winget / App Installer 安装；bundle 内含多架构合一',
            note: '优先选 bundle，一个包兼容 x64 / arm64'
        },
        {
            id: 'win-patch', meta: true, icon: '🩹', chip: '系统补丁', name: 'Windows 系统补丁/合并模块', tone: 'meta',
            re: /\.(msu|msp|msm|cab)$/i,
            audience: '系统维护、企业部署',
            usage: '系统级独立更新或 .msi 增量补丁，通常由更新机制自动应用',
            note: '普通用户一般不需要手动安装'
        },
        {
            id: 'win-installer', icon: '⚙️', chip: '安装版', name: 'Windows 安装程序', tone: 'win',
            re: /\.msi$|(^|[^a-z])(setup|installer|install)([-_.\s\d][^]*)?\.exe$/i,
            audience: 'Windows 用户',
            usage: '双击安装，会写注册表并创建快捷方式，通常需要管理员权限',
            note: '想免安装请找 portable 或 zip 包'
        },
        {
            id: 'win-exe', icon: '🪟', chip: 'Windows 程序', name: 'Windows 可执行文件', tone: 'win',
            re: /\.exe$/i,
            audience: 'Windows 用户',
            usage: '可能是安装器，也可能是单文件绿色版，看文件名是否带 portable',
            note: '不确定时优先选带 setup 的安装版'
        },
        {
            id: 'mac-installer', icon: '💿', chip: 'macOS 安装包', name: 'macOS 安装包', tone: 'mac',
            re: /\.(dmg|pkg)$/i,
            audience: 'macOS 用户',
            usage: '.dmg 打开后把 App 拖进 Applications；.pkg 走安装向导',
            note: '.pkg 也可能是 FreeBSD 的系统包'
        },
        {
            id: 'linux-pkg', icon: '🐧', chip: 'Linux 安装包', name: 'Linux 安装包', tone: 'linux',
            re: /\.(deb|rpm|appimage|snap|flatpak|run|pkg\.tar\.xz|pkg\.tar\.zst|pkg\.tar\.gz)$/i,
            audience: 'Linux 用户',
            usage: 'AppImage 需 chmod +x 后直接运行；deb / rpm / pkg.tar.* 用发行版包管理器安装'
        },
        {
            id: 'pkg-eco', icon: '📚', chip: '语言包', name: '语言生态安装包', tone: 'neutral',
            re: /\.(whl|jar|war|ear|nupkg|gem|crate|vsix|crx|xpi|conda|phar)$/i,
            audience: '开发者',
            usage: '用对应语言的包管理器安装（pip / NuGet / RubyGems 等）',
            note: 'VS Code、Chrome、Firefox 扩展也在其中'
        },
        {
            id: 'firmware', icon: '🔌', chip: '固件/镜像', name: '固件或磁盘镜像', tone: 'neutral',
            re: /\.(uf2|hex|elf|img|dtb|uboot)$/i,
            audience: '硬件玩家、刷机用户',
            usage: '按设备文档烧录到硬件或磁盘',
            note: '刷错设备可能变砖，先确认型号'
        },
        {
            id: 'vm-image', icon: '🖥️', chip: '虚拟机镜像', name: '虚拟机/云镜像', tone: 'neutral',
            re: /\.(ova|ovf|vhd|vhdx|vmdk|vdi|qcow2)$/i,
            audience: '虚拟化/云用户',
            usage: '导入 VirtualBox / VMware / Hyper-V / KVM 直接启动',
            note: '先确认虚拟化平台再选格式'
        },
        {
            id: 'iso-image', icon: '💿', chip: '光盘镜像', name: '光盘/安装镜像', tone: 'neutral',
            re: /\.iso$/i,
            audience: '装机、系统维护用户',
            usage: '刻录到光盘或写入 U 盘后启动安装'
        },
        {
            id: 'docs', icon: '📄', chip: '文档', name: '文档', tone: 'meta',
            re: /\.(pdf|epub|chm|mobi)$/i,
            audience: '阅读文档的用户',
            usage: '离线手册 / 电子书'
        },
        {
            id: 'script', icon: '📜', chip: '安装脚本', name: '安装/运行脚本', tone: 'neutral',
            re: /(^|[/_-])(install|setup|bootstrap)\.(sh|ps1|bat)$/i,
            audience: '命令行用户',
            usage: '在终端执行（curl | sh / irm | iex）；先看清脚本内容再运行',
            note: '来源不明的脚本不要直接执行'
        },
        {
            id: 'archive', icon: '🗜️', chip: '压缩包', name: '压缩归档', tone: 'neutral',
            re: /\.(zip|7z|rar|tar|tgz|tbz2|txz|tzst|tlz4|tzo|tar\.gz|tar\.bz2|tar\.xz|tar\.zst|tar\.lz4)$/i,
            audience: '需要免安装 / 便携版的用户',
            usage: '解压后查看内容，可能是便携程序、源码或资源文件',
            note: '压缩包里通常有 README，先看再运行'
        }
    ];

    // 只有这些类型才值得标记「适合本机系统」
    const RECOMMENDABLE_KINDS = new Set(['android', 'win-store', 'win-installer', 'win-exe', 'mac-installer', 'linux-pkg', 'archive']);

    // 本机系统（无网络，仅 UA 推断）
    function detectUserPlatform() {
        const ua = navigator.userAgent || '';
        const plat = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || '';
        if (/android/i.test(ua)) return 'android';
        if (/iphone|ipad|ipod/i.test(ua)) return 'ios';
        if (/mac/i.test(plat) && navigator.maxTouchPoints > 1) return 'ios';   // iPadOS 伪装成 macOS
        if (/win/i.test(plat) || /windows/i.test(ua)) return 'windows';
        if (/mac/i.test(plat)) return 'mac';
        if (/linux|x11/i.test(plat)) return 'linux';
        return 'other';
    }

    // 架构解读（决定同系统里到底该下哪个）
    function describeArch(name) {
        const n = name.toLowerCase();
        if (/universal2?/.test(n)) return 'Universal（Intel + Apple Silicon 通用）';
        if (/x86_64|amd64|x64|win64/.test(n)) return 'x86_64（Intel / AMD 64 位）';
        if (/aarch64|arm64/.test(n)) return 'arm64（Apple Silicon / ARM 设备）';
        if (/armv7|armhf/.test(n)) return '32 位 ARM（树莓派等）';
        if (/i[3-6]86/.test(n)) return '32 位 x86（老旧设备）';
        if (/riscv64/.test(n)) return 'RISC-V 64 位';
        return '';
    }

    // 文件名 → { platform, arch, kind }
    function classifyAsset(name) {
        const n = name.toLowerCase();
        const platform = detectPlatform(name);
        const arch = describeArch(name);
        for (let i = 0; i < ASSET_KIND_RULES.length; i++) {
            if (ASSET_KIND_RULES[i].re.test(n)) return { platform: platform, arch: arch, kind: ASSET_KIND_RULES[i] };
        }
        return { platform: platform, arch: arch, kind: null };
    }

    // 徽章文字（压缩包按是否含系统信息区分「免安装」/「压缩包」）
    function assetChipLabel(kind, platform) {
        if (!kind) return '';
        if (kind.id === 'archive') return platform === 'other' ? '压缩包' : '免安装';
        return kind.chip;
    }

    // 徽章图标（免安装用开箱即用的箱子，压缩包保留压缩图标）
    function assetChipIcon(kind, platform) {
        if (!kind) return '';
        if (kind.id === 'archive') return platform === 'other' ? '🗜️' : '📦';
        return kind.icon;
    }

    // 免安装 = 压缩包且能识别到系统平台，单独走「绿色便携」色调
    function isPortable(kind, platform) {
        return !!kind && kind.id === 'archive' && platform !== 'other';
    }

    function assetUsage(kind, platform) {
        if (!kind) return '';
        if (kind.id === 'archive' && platform !== 'other') return '解压后直接运行里面的程序，不需要安装';
        return kind.usage;
    }

    // 计算「适合本机系统」的行：同系统优先 64 位/通用包，避免把所有变体都标星
    function pickRecommended(items, userPlatform) {
        if (!userPlatform || userPlatform === 'other') return new Set();
        const candidates = items.filter(function (item) {
            const info = item.info;
            return info.kind && !info.kind.meta &&
                info.platform === userPlatform &&
                RECOMMENDABLE_KINDS.has(info.kind.id);
        });
        const is64 = function (item) {
            return /(x86_64|amd64|x64|aarch64|arm64|universal2?)/.test(item.name.toLowerCase());
        };
        // 同一类型里若有 64 位/通用包就只标它们（避免 i686 也标星）；安装器没有架构信息，照标
        const byKind = new Map();
        candidates.forEach(function (item) {
            const id = item.info.kind.id;
            if (!byKind.has(id)) byKind.set(id, []);
            byKind.get(id).push(item);
        });
        const picked = [];
        byKind.forEach(function (list) {
            const preferred = list.filter(is64);
            (preferred.length ? preferred : list).forEach(function (item) { picked.push(item.row); });
        });
        return new Set(picked);
    }

    function assetAriaLabel(item, recommended) {
        const info = item.info;
        const kind = info.kind;
        const parts = [];
        if (recommended) parts.push('适合你的 ' + (PLATFORM_LABELS[info.platform] || '') + ' 系统');
        if (kind) {
            parts.push(kind.name);
            parts.push('面向' + kind.audience);
            parts.push(assetUsage(kind, info.platform));
            if (kind.note) parts.push(kind.note);
        }
        parts.push('根据文件名推断');
        return (kind ? assetChipIcon(kind, info.platform) + ' ' : '') + parts.join('，');
    }

    function removeAssetChip(row) {
        const chip = row.querySelector('.ghb-asset-chip');
        if (chip) chip.remove();
        if (row.classList.contains('ghb-asset-meta')) row.classList.remove('ghb-asset-meta');
    }

    function decorateAssetRow(item, recommended) {
        const row = item.row;
        const link = item.link;
        const kind = item.info.kind;
        if (!kind) { removeAssetChip(row); return; }

        let chip = row.querySelector('.ghb-asset-chip');
        if (!chip) {
            chip = document.createElement('button');
            chip.type = 'button';
            chip.className = 'ghb-asset-chip';
            chip.setAttribute('aria-expanded', 'false');
            link.after(chip);   // 紧跟在资产名之后
        }

        chip.__ghb = { info: item.info, name: item.name, recommended: recommended };

        const portable = isPortable(kind, item.info.platform);
        const icon = assetChipIcon(kind, item.info.platform);
        const ico = '<span class="ghb-chip-ico">' + icon + '</span>';
        const label = recommended
            ? (kind.meta ? '' : '<span class="ghb-chip-star">⭐</span>') + ico + assetChipLabel(kind, item.info.platform)
            : (kind.meta ? ico : ico + assetChipLabel(kind, item.info.platform));

        if (chip.innerHTML !== label) chip.innerHTML = label;
        const baseTone = portable ? 'portable' : (kind.tone || 'neutral');
        const tone = kind.meta && baseTone !== 'meta' ? baseTone + ' meta' : baseTone;
        if (chip.dataset.tone !== tone) chip.dataset.tone = tone;
        if (chip.dataset.portable !== (portable ? '1' : '0')) chip.dataset.portable = portable ? '1' : '0';
        if (chip.classList.contains('ghb-asset-chip--rec') !== !!recommended) {
            chip.classList.toggle('ghb-asset-chip--rec', !!recommended);
        }
        const aria = assetAriaLabel(item, recommended);
        if (chip.getAttribute('aria-label') !== aria) chip.setAttribute('aria-label', aria);
        if (row.classList.contains('ghb-asset-meta') !== !!kind.meta) {
            row.classList.toggle('ghb-asset-meta', !!kind.meta);
        }
    }

    /* ── 悬浮说明面板（body 级 fixed，避免被 .Box 裁切） ───────────────── */

    let ghbTipEl = null;
    let ghbTipFor = null;
    let ghbTipTimer = null;
    let ghbTipCloseTimer = null;
    let ghbTipBound = false;

    function ensureAssetTip() {
        if (ghbTipEl && document.body.contains(ghbTipEl)) return ghbTipEl;
        ghbTipEl = document.createElement('div');
        ghbTipEl.id = 'ghb-asset-tip';
        ghbTipEl.className = 'ghb-asset-tip';
        ghbTipEl.setAttribute('aria-hidden', 'true');
        document.body.appendChild(ghbTipEl);
        return ghbTipEl;
    }

    function renderAssetTip(tip, chip) {
        const data = chip.__ghb;
        const info = data.info;
        const kind = info.kind;
        const pLabel = PLATFORM_LABELS[info.platform] || '';
        tip.textContent = '';
        const portable = isPortable(kind, info.platform);
        const toneVar = portable ? '--ghb-portable,#1a7f5a'
            : ({ win: '--ghb-win,#2f81f7', mac: '--ghb-mac,#a371f7', linux: '--ghb-linux,#e3a008',
            android: '--ghb-android,#3fb950', ios: '--ghb-ios,#db61a2', meta: '--ghb-meta,#8c959f' }[ (kind.tone||'neutral') ] || '--ghb-neutral,#6e7781');
        tip.style.setProperty('--ghb-tone', 'var(' + toneVar + ')');

        const head = document.createElement('div');
        head.className = 'ghb-asset-tip-head';
        head.textContent = kind ? assetChipIcon(kind, info.platform) + ' ' + kind.name : '📦 ' + (pLabel || 'Release') + ' 资产';
        tip.appendChild(head);

        if (data.recommended) {
            const rec = document.createElement('div');
            rec.className = 'ghb-asset-tip-rec';
            rec.textContent = '⭐ 适合你的 ' + pLabel + ' 系统';
            tip.appendChild(rec);
        }

        const body = document.createElement('div');
        body.className = 'ghb-asset-tip-body';
        const addLine = function (key, val) {
            const line = document.createElement('div');
            line.className = 'ghb-asset-tip-line';
            const k = document.createElement('span');
            k.className = 'ghb-asset-tip-key';
            k.textContent = key;
            const v = document.createElement('span');
            v.className = 'ghb-asset-tip-val';
            v.textContent = val;
            line.appendChild(k);
            line.appendChild(v);
            body.appendChild(line);
        };

        if (kind) {
            if (pLabel) addLine('系统', pLabel);
            addLine('面向', kind.audience);
            addLine('用法', assetUsage(kind, info.platform));
            if (kind.note) addLine('注意', kind.note);
            if (info.arch) addLine('架构', info.arch);
        } else {
            if (pLabel) addLine('系统', pLabel);
            if (info.arch) addLine('架构', info.arch);
        }
        tip.appendChild(body);

        const foot = document.createElement('div');
        foot.className = 'ghb-asset-tip-foot';
        foot.textContent = '根据文件名推断 · ' + data.name;
        tip.appendChild(foot);
    }

    function placeAssetTip(tip, chip) {
        const r = chip.getBoundingClientRect();
        const w = tip.offsetWidth;
        const h = tip.offsetHeight;
        let x = r.right + 10;
        if (x + w > window.innerWidth - 12) x = r.left - w - 10;
        if (x < 12) x = 12;
        let y = r.top;
        if (y + h > window.innerHeight - 12) y = window.innerHeight - h - 12;
        if (y < 12) y = 12;
        tip.style.left = Math.round(x) + 'px';
        tip.style.top = Math.round(y) + 'px';
    }

    function openAssetTip(chip) {
        if (!chip || !chip.__ghb) return;
        const tip = ensureAssetTip();
        renderAssetTip(tip, chip);
        tip.style.visibility = 'hidden';
        tip.classList.add('show');
        tip.setAttribute('aria-hidden', 'false');
        placeAssetTip(tip, chip);
        tip.style.visibility = 'visible';
        ghbTipFor = chip;
        if (chip.getAttribute('aria-expanded') !== 'true') chip.setAttribute('aria-expanded', 'true');
    }

    function closeAssetTip() {
        clearTimeout(ghbTipTimer);
        clearTimeout(ghbTipCloseTimer);
        if (ghbTipFor) {
            if (ghbTipFor.getAttribute('aria-expanded') !== 'false') ghbTipFor.setAttribute('aria-expanded', 'false');
            ghbTipFor = null;
        }
        if (ghbTipEl) {
            ghbTipEl.classList.remove('show');
            ghbTipEl.setAttribute('aria-hidden', 'true');
        }
    }

    function initAssetTipEvents() {
        if (ghbTipBound) return;
        ghbTipBound = true;
        const canHover = function () {
            return !window.matchMedia || window.matchMedia('(hover: hover)').matches;
        };

        document.addEventListener('mouseover', function (e) {
            const chip = e.target.closest ? e.target.closest('.ghb-asset-chip') : null;
            if (!chip || !canHover()) return;
            if (e.relatedTarget && chip.contains(e.relatedTarget)) return;
            clearTimeout(ghbTipTimer);
            ghbTipTimer = setTimeout(function () { openAssetTip(chip); }, 220);
        });

        document.addEventListener('mouseout', function (e) {
            const chip = e.target.closest ? e.target.closest('.ghb-asset-chip') : null;
            if (!chip) return;
            if (e.relatedTarget && chip.contains(e.relatedTarget)) return;
            clearTimeout(ghbTipTimer);
            if (ghbTipFor === chip) ghbTipCloseTimer = setTimeout(closeAssetTip, 120);
        });

        document.addEventListener('focusin', function (e) {
            const chip = e.target.closest ? e.target.closest('.ghb-asset-chip') : null;
            if (chip) openAssetTip(chip);
        });

        document.addEventListener('focusout', function (e) {
            const chip = e.target.closest ? e.target.closest('.ghb-asset-chip') : null;
            if (chip) closeAssetTip();
        });

        document.addEventListener('click', function (e) {
            const chip = e.target.closest ? e.target.closest('.ghb-asset-chip') : null;
            if (!chip) return;
            e.preventDefault();
            e.stopPropagation();
            if (e.detail === 0) return;   // 键盘 Enter/Space：聚焦时已展开，不再切换
            if (ghbTipFor === chip) closeAssetTip();
            else openAssetTip(chip);
        }, true);

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeAssetTip();
        });

        document.addEventListener('scroll', closeAssetTip, true);
        window.addEventListener('resize', closeAssetTip);
        document.addEventListener('pointerdown', function (e) {
            const chip = e.target.closest ? e.target.closest('.ghb-asset-chip') : null;
            if (!chip) closeAssetTip();
        }, true);
    }

    function injectAssetHintStyles() {
        if (document.getElementById('github-asset-hint-style')) return;
        const el = document.createElement('style');
        el.id = 'github-asset-hint-style';
        el.textContent = [
            // ── 徽章：语义色弱底 + 高对比前景；色调由 data-tone 区分，明暗主题都自动适配 ──
            '.ghb-asset-chip {',
            '  --ghb-tone: var(--ghb-neutral);',
            '  display: inline-flex; align-items: center; justify-content: center; gap: 5px;',
            '  margin-left: 6px; padding: 0 11px; height: 23px; border-radius: 999px;',
            '  border: 1px solid color-mix(in srgb, var(--ghb-tone) 30%, transparent);',
            '  background: color-mix(in srgb, var(--ghb-tone) 10%, transparent);',
            '  color: color-mix(in srgb, var(--ghb-tone) 82%, var(--fgColor-default, #1f2328));',
            '  font: 600 12.5px/1 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;',
            '  letter-spacing: .2px;',
            '  white-space: nowrap; vertical-align: middle; flex-shrink: 0;',
            '  cursor: help;',
            "  transition: background-color .12s ease, border-color .12s ease, color .12s ease, transform .12s ease;",
            '}',
            '@supports not (background: color-mix(in srgb, red 14%, transparent)) {',
            '  .ghb-asset-chip { background: var(--bgColor-neutral-muted, rgba(127,127,127,.16)); color: var(--fgColor-default, #1f2328); border-color: var(--borderColor-default, rgba(127,127,127,.4)); }',
            '}',
            '.ghb-asset-chip:hover {',
            '  background: color-mix(in srgb, var(--ghb-tone) 20%, transparent);',
            '  border-color: color-mix(in srgb, var(--ghb-tone) 55%, transparent);',
            '  color: color-mix(in srgb, var(--ghb-tone) 92%, var(--fgColor-default, #1f2328));',
            '}',
            '.ghb-asset-chip:active { transform: scale(.96); }',
            '.ghb-asset-chip[data-tone^="win"]      { --ghb-tone: var(--ghb-win, #2f81f7); }',
            '.ghb-asset-chip[data-tone^="mac"]      { --ghb-tone: var(--ghb-mac, #a371f7); }',
            '.ghb-asset-chip[data-tone^="linux"]    { --ghb-tone: var(--ghb-linux, #e3a008); }',
            '.ghb-asset-chip[data-tone^="android"]  { --ghb-tone: var(--ghb-android, #3fb950); }',
            '.ghb-asset-chip[data-tone^="ios"]      { --ghb-tone: var(--ghb-ios, #db61a2); }',
            '.ghb-asset-chip[data-tone^="portable"] { --ghb-tone: var(--ghb-portable, #1a7f5a); }',
            '.ghb-asset-chip[data-tone^="meta"]     { --ghb-tone: var(--ghb-meta, #8c959f); }',
            '.ghb-asset-chip[data-tone^="neutral"]  { --ghb-tone: var(--ghb-neutral, #6e7781); }',
            // ── 免安装 / 便携版：绿色描边胶囊，左侧图标带浅色圆底，清爽不压抑 ──
            '.ghb-asset-chip[data-portable="1"] {',
            '  gap: 6px; padding: 0 12px 0 5px;',
            '  border-color: color-mix(in srgb, var(--ghb-portable, #1a7f5a) 42%, transparent);',
            '  background: color-mix(in srgb, var(--ghb-portable, #1a7f5a) 9%, transparent);',
            '  color: color-mix(in srgb, var(--ghb-portable, #1a7f5a) 85%, var(--fgColor-default, #1f2328));',
            '  font-weight: 600;',
            '}',
            '.ghb-asset-chip[data-portable="1"]:hover {',
            '  background: color-mix(in srgb, var(--ghb-portable, #1a7f5a) 18%, transparent);',
            '  border-color: color-mix(in srgb, var(--ghb-portable, #1a7f5a) 62%, transparent);',
            '  color: color-mix(in srgb, var(--ghb-portable, #1a7f5a) 95%, var(--fgColor-default, #1f2328));',
            '}',
            // 图标单独装进一个浅色小圆底，和文字拉开层次
            '.ghb-asset-chip .ghb-chip-ico {',
            '  display: inline-flex; align-items: center; justify-content: center;',
            '  width: 16px; height: 16px; border-radius: 50%;',
            '  font-size: 11px; line-height: 1;',
            '  background: color-mix(in srgb, var(--ghb-tone) 18%, transparent);',
            '}',
            '.ghb-asset-chip[data-portable="1"] .ghb-chip-ico {',
            '  background: color-mix(in srgb, var(--ghb-portable, #1a7f5a) 22%, transparent);',
            '}',
            // 元信息（签名/校验和/符号等）：更小、虚线边框，和安装包拉开层级
            '.ghb-asset-chip[data-tone$="meta"] { padding: 0 6px; font-weight: 500; border-style: dashed; }',
            // 推荐徽章：实心强调底，⭐ 单独高亮
            '.ghb-asset-chip--rec {',
            '  border-color: transparent;',
            '  background: var(--bgColor-accent-emphasis, #0969da);',
            '  color: var(--fgColor-onEmphasis, #fff);',
            '  box-shadow: 0 1px 2px color-mix(in srgb, var(--bgColor-accent-emphasis, #0969da) 40%, transparent);',
            '}',
            '.ghb-asset-chip--rec:hover {',
            '  background: color-mix(in srgb, var(--bgColor-accent-emphasis, #0969da) 88%, black);',
            '  border-color: transparent; color: var(--fgColor-onEmphasis, #fff);',
            '}',
            '.ghb-asset-chip--rec .ghb-chip-star { color: var(--ghb-star, #ffd33d); }',
            '.ghb-asset-chip:focus-visible { outline: 2px solid var(--focus-outlineColor, #0969da); outline-offset: 2px; }',
            'li.ghb-asset-meta { opacity: .75; }',
            'li.ghb-asset-meta .octicon { opacity: .6; }',
            'li.ghb-asset-meta .wb-break-all { opacity: .8; }',
            // ── 浮层：三层结构（标题 / 内容 / 页脚），左侧色条呼应徽章色调 ──
            '.ghb-asset-tip {',
            '  position: fixed; z-index: 10001; display: none;',
            '  box-sizing: border-box; padding: 0 0 10px; border-radius: 10px; overflow: hidden;',
            '  width: max-content; max-width: min(380px, calc(100vw - 24px));',
            '  background: var(--bgColor-overlay, var(--bgColor-default, #ffffff));',
            '  color: var(--fgColor-default, #1f2328);',
            '  border: 1px solid var(--borderColor-default, rgba(127,127,127,.35));',
            '  box-shadow: 0 1px 0 color-mix(in srgb, var(--ghb-tone, transparent) 70%, transparent) inset,',
            '              0 10px 30px rgba(0,0,0,.22);',
            '  font: 400 13.5px/1.6 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;',
            '  text-align: left; pointer-events: none;',
            '}',
            '.ghb-asset-tip.show { display: block; }',
            '.ghb-asset-tip-head {',
            '  display: flex; align-items: center; gap:6px;',
            '  padding: 10px 13px 9px; margin-bottom: 9px;',
            '  font-weight: 700; font-size: 14px;',
            '  background: color-mix(in srgb, var(--ghb-tone, var(--ghb-neutral)) 12%, transparent);',
            '  border-bottom: 1px solid var(--borderColor-muted, rgba(127,127,127,.2));',
            '}',
            '.ghb-asset-tip-head::before {',
            '  content: ""; width: 3px; align-self: stretch; margin-right: 2px; border-radius: 2px;',
            '  background: var(--ghb-tone, var(--ghb-neutral));',
            '}',
            '.ghb-asset-tip-rec {',
            '  margin: -2px 13px 7px; padding: 4px 9px; border-radius: 6px; display: inline-block;',
            '  background: color-mix(in srgb, var(--bgColor-accent-emphasis, #0969da) 14%, transparent);',
            '  color: var(--fgColor-accent, #0969da); font-weight: 600; font-size: 12.5px;',
            '}',
            '.ghb-asset-tip-body { display: flex; flex-direction: column; gap: 5px; padding: 0 13px; }',
            '.ghb-asset-tip-line { display: flex; gap: 9px; }',
            '.ghb-asset-tip-key { flex: 0 0 auto; min-width: 30px; color: var(--fgColor-muted, #59636e); }',
            '.ghb-asset-tip-val { flex: 1 1 auto; }',
            '.ghb-asset-tip-foot {',
            '  margin: 9px 13px 0; padding-top: 8px;',
            '  border-top: 1px solid var(--borderColor-muted, rgba(127,127,127,.2));',
            '  color: var(--fgColor-muted, #59636e); font-size: 12px; overflow-wrap: anywhere;',
            '}'
        ].join('\n');
        document.head.appendChild(el);
    }

    function removeAssetHints() {
        closeAssetTip();
        document.querySelectorAll('.ghb-asset-chip').forEach(function (c) { c.remove(); });
        document.querySelectorAll('.ghb-asset-meta').forEach(function (r) { r.classList.remove('ghb-asset-meta'); });
        const styleEl = document.getElementById('github-asset-hint-style');
        if (styleEl) styleEl.remove();
    }

    function applyAssetHints() {
        if (!GM_getValue('github_release_hint_enabled', true)) {
            removeAssetHints();
            return;
        }
        injectAssetHintStyles();

        const items = [];
        document.querySelectorAll('.Box-row').forEach(function (row) {
            const link = row.querySelector('a[href*="/releases/download/"]');
            if (!link) return;
            const href = link.getAttribute('href') || '';
            const name = decodeURIComponent(href.split('/').pop() || '');
            if (!name) return;
            items.push({ row: row, link: link, name: name, info: classifyAsset(name) });
        });

        let recommended = new Set();
        if (GM_getValue('github_release_recommend_enabled', true)) {
            recommended = pickRecommended(items, detectUserPlatform());
        }

        items.forEach(function (item) {
            decorateAssetRow(item, recommended.has(item.row));
        });
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
                    <div class="theme-section boxrow-section">
                        <h4>📐 列表行增强 <span class="theme-type-count">悬停竖条</span></h4>
                        <div class="boxrow-controls">
                            <label class="boxrow-toggle">
                                <input type="checkbox" id="boxrow-enabled" ${GM_getValue('github_boxrow_enabled', true) ? 'checked' : ''} />
                                <span>启用列表行悬停增强</span>
                            </label>
                            <div class="boxrow-width">
                                <label for="boxrow-width">竖条粗细</label>
                                <input type="range" id="boxrow-width" min="2" max="16" step="1" value="${GM_getValue('github_boxrow_bar_width', 4)}" />
                                <span class="boxrow-width-val" id="boxrow-width-val">${GM_getValue('github_boxrow_bar_width', 4)}px</span>
                            </div>
                        </div>
                    </div>
                    <div class="theme-section boxrow-section">
                        <h4>🗂️ Release 分组排序 <span class="theme-type-count">按系统</span></h4>
                        <div class="boxrow-controls">
                            <label class="boxrow-toggle">
                                <input type="checkbox" id="release-group-enabled" ${GM_getValue('github_release_group_enabled', false) ? 'checked' : ''} />
                                <span>按系统分组排序（Windows → macOS → Linux → Android → iOS）</span>
                            </label>
                        </div>
                    </div>
                    <div class="theme-section boxrow-section">
                        <h4>🏷️ 资产类型提示 <span class="theme-type-count">图标 + 悬浮说明</span></h4>
                        <div class="boxrow-controls">
                            <label class="boxrow-toggle">
                                <input type="checkbox" id="release-hint-enabled" ${GM_getValue('github_release_hint_enabled', true) ? 'checked' : ''} />
                                <span>显示资产类型图标（悬停 / 点击查看说明）</span>
                            </label>
                            <label class="boxrow-toggle">
                                <input type="checkbox" id="release-recommend-enabled" ${GM_getValue('github_release_recommend_enabled', true) ? 'checked' : ''} />
                                <span>标记「⭐ 适合本机系统」的资产</span>
                            </label>
                        </div>
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
                    flex-shrink: 0;
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
                    min-height: 0;
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
                    flex-shrink: 0;
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

                /* ── 列表行增强设置 ── */
                .boxrow-section { margin-top: 4px; }
                .boxrow-controls {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    padding: 12px;
                    background: #f6f8fa;
                    border: 1px solid #e1e4e8;
                    border-radius: 8px;
                }
                .boxrow-toggle {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 13px;
                    color: #24292f;
                    cursor: pointer;
                }
                .boxrow-toggle input {
                    width: 16px;
                    height: 16px;
                    cursor: pointer;
                    accent-color: #0969da;
                }
                .boxrow-width {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 13px;
                    color: #24292f;
                }
                .boxrow-width label { white-space: nowrap; }
                .boxrow-width input[type="range"] {
                    flex: 1;
                    accent-color: #0969da;
                    cursor: pointer;
                }
                .boxrow-width-val {
                    min-width: 36px;
                    text-align: right;
                    font-variant-numeric: tabular-nums;
                    color: #656d76;
                    font-size: 12px;
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
                        if (this.searchQuery) {
                            // 有搜索词：ESC 先清空并恢复完整列表
                            searchInput.value = '';
                            this.searchQuery = '';
                            this.renderThemeButtons('');
                            e.stopPropagation(); // 阻止冒泡到 document 的关闭监听
                        }
                        // 无搜索词：不拦截，事件冒泡 → document 监听器关闭面板
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

            this.setupBoxRowControls();
        }

        setupBoxRowControls() {
            const enabledEl = document.getElementById('boxrow-enabled');
            const widthEl   = document.getElementById('boxrow-width');
            const widthVal  = document.getElementById('boxrow-width-val');

            if (enabledEl) {
                enabledEl.addEventListener('change', () => {
                    GM_setValue('github_boxrow_enabled', enabledEl.checked);
                    applyBoxRowEnhancement();
                    this.showToast(enabledEl.checked ? '列表行增强已开启' : '列表行增强已关闭');
                });
            }

            if (widthEl && widthVal) {
                widthEl.addEventListener('input', () => {
                    const w = parseInt(widthEl.value, 10) || 0;
                    widthVal.textContent = w + 'px';
                    GM_setValue('github_boxrow_bar_width', w);
                    applyBoxRowEnhancement();   // 拖动时实时重绘竖条
                });
            }

            const relEl = document.getElementById('release-group-enabled');
            if (relEl) {
                relEl.addEventListener('change', () => {
                    GM_setValue('github_release_group_enabled', relEl.checked);
                    applyReleaseGrouping();
                    this.showToast(relEl.checked ? 'Release 分组排序已开启' : 'Release 分组排序已关闭');
                });
            }

            const hintEl = document.getElementById('release-hint-enabled');
            const recommendEl = document.getElementById('release-recommend-enabled');
            if (hintEl && recommendEl) recommendEl.disabled = !hintEl.checked;
            if (hintEl) {
                hintEl.addEventListener('change', () => {
                    GM_setValue('github_release_hint_enabled', hintEl.checked);
                    if (recommendEl) recommendEl.disabled = !hintEl.checked;
                    applyAssetHints();
                    this.showToast(hintEl.checked ? '资产类型提示已开启' : '资产类型提示已关闭');
                });
            }
            if (recommendEl) {
                recommendEl.addEventListener('change', () => {
                    GM_setValue('github_release_recommend_enabled', recommendEl.checked);
                    applyAssetHints();
                    this.showToast(recommendEl.checked ? '已标出适合本机系统的资产' : '已取消本机系统标记');
                });
            }
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
        applyBoxRowEnhancement();   // 默认常驻：列表行悬停增强（竖条跟随主题，受开关/粗细控制）
        applyReleaseGrouping();    // Release 分组排序（受开关控制，默认关闭）
        applyAssetHints();         // 资产类型徽章 + 本机系统标记（受开关控制，默认开启）
        initAssetTipEvents();
        setupReleaseGroupingObserver();
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
                applyReleaseGrouping();
                applyAssetHints();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
