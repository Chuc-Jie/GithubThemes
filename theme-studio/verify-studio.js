/* theme-studio 高保真预览验证：light/dark × 4 tab，console 错误捕获 + 关键样式断言 */
const puppeteer = require('puppeteer-core');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE = 'http://127.0.0.1:8974/index.html';
const OUT = __dirname;

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    args: ['--no-first-run', '--disable-extensions'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1720, height: 1000, deviceScaleFactor: 1 });

  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('requestfailed', r => { if (!r.url().includes('favicon')) errors.push('reqfail: ' + r.url()); });

  await page.goto(BASE, { waitUntil: 'networkidle0' });

  const report = {};
  const TABS = ['repo', 'code', 'releases', 'diff'];

  for (const type of ['light', 'dark']) {
    // light → Nord Light 基底；dark → 2026 Dark 基底（真实换 token，而非仅切类型标志）
    await page.evaluate((t) => {
      const sel = document.getElementById('base-select');
      sel.value = t === 'light' ? 'nord-light' : 'vscode-2026-dark';
      sel.dispatchEvent(new Event('change', { bubbles: true }));
    }, type);
    await new Promise(r => setTimeout(r, 300));

    for (const tab of TABS) {
      await page.evaluate((tb) => {
        document.querySelector(`#preview-tabs .ptab[data-tab="${tb}"]`).click();
      }, tab);
      await new Promise(r => setTimeout(r, 250));

      report[`${type}:${tab}`] = await page.evaluate(() => {
        const sh = document.getElementById('device').shadowRoot;
        const ghs = sh.querySelector('.ghs');
        const cs = getComputedStyle(ghs);
        const header = sh.querySelector('.Header');
        const res = {
          bg: cs.backgroundColor,
          varsCount: (sh.getElementById('ghs-vars').textContent.match(/--[\w-]+(?=:)/g) || []).length,
          headerBg: header ? getComputedStyle(header).backgroundColor : null,
          rows: sh.querySelectorAll('.Box-row').length,
          diffHunk: sh.querySelectorAll('.blob-code-hunk').length,
          diffAdd: sh.querySelectorAll('.blob-code-addition').length,
          diffDel: sh.querySelectorAll('.blob-code-deletion').length,
          plClasses: sh.querySelectorAll('[class*="pl-"]').length,
          riIcons: sh.querySelectorAll('.ri').length,
          riColors: Array.from(sh.querySelectorAll('svg.ri')).map(s => getComputedStyle(s).color),
          btnStatic: sh.querySelectorAll('.btn-static').length,
          oldClasses: sh.querySelectorAll('.diff-num,.diff-marker,.diff-line').length,
          nodeIds: document.querySelectorAll('[data-page-node-id]').length,
        };
        return res;
      });

      await page.screenshot({ path: `${OUT}/verify-${type}-${tab}.png`, clip: { x: 360, y: 56, width: 900, height: 940 } });
    }
  }

  // hover 作用域检查：仓库文件行 → 原生灰底无竖条；Releases 资产行 → 保留竖条增强
  await page.evaluate(() => {
    const sel = document.getElementById('base-select');
    sel.value = 'nord-light';
    sel.dispatchEvent(new Event('change', { bubbles: true }));
  });
  await page.evaluate(() => document.querySelector('#preview-tabs .ptab[data-tab="repo"]').click());
  await new Promise(r => setTimeout(r, 250));
  const fileRow = await page.evaluateHandle(() =>
    document.getElementById('device').shadowRoot.querySelector('.Box ul .Box-row'));
  await fileRow.asElement().hover();
  await new Promise(r => setTimeout(r, 120));
  const fileHover = await page.evaluate(() => {
    const cs = getComputedStyle(document.getElementById('device').shadowRoot.querySelector('.Box ul .Box-row'));
    return { shadow: cs.boxShadow, bg: cs.backgroundColor };
  });

  await page.evaluate(() => document.querySelector('#preview-tabs .ptab[data-tab="releases"]').click());
  await new Promise(r => setTimeout(r, 250));
  const assetRow = await page.evaluateHandle(() =>
    document.getElementById('device').shadowRoot.querySelector('.assets-list .Box-row'));
  await assetRow.asElement().hover();
  await new Promise(r => setTimeout(r, 120));
  const assetHover = await page.evaluate(() => {
    const cs = getComputedStyle(document.getElementById('device').shadowRoot.querySelector('.assets-list .Box-row'));
    return { shadow: cs.boxShadow, bg: cs.backgroundColor };
  });

  // 基底主题全量扫描：逐款切换（对齐 GithubTheme.js 的 23 款），断言背景随主题变化、无错误
  const presetReport = await page.evaluate(async () => {
    const sel = document.getElementById('base-select');
    const out = { count: 0, bgs: {} };
    for (const opt of sel.querySelectorAll('option[value]')) {
      sel.value = opt.value;
      sel.dispatchEvent(new Event('change', { bubbles: true }));
      await new Promise(r => setTimeout(r, 80));
      const sh = document.getElementById('device').shadowRoot;
      out.bgs[opt.value] = getComputedStyle(sh.querySelector('.ghs')).backgroundColor;
      out.count++;
    }
    return out;
  });
  const uniq = new Set(Object.values(presetReport.bgs)).size;
  console.log(`presets: count=${presetReport.count} unique-bg=${uniq}`, JSON.stringify(presetReport.bgs));

  console.log('hover-check:', JSON.stringify({ fileRow: fileHover, assetRow: assetHover }));
  console.log(JSON.stringify({ errors, report }, null, 1));
  await browser.close();
})().catch(e => { console.error('FATAL', e); process.exit(1); });
