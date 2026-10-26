#!/usr/bin/env node
/** 由 keyword-content-plan.csv 生成人工评审页 docs/keyword-content-plan.html */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const csv = fs.readFileSync(path.join(root, "docs/keyword-content-plan.csv"), "utf8").replace(/^\uFEFF/, "");

function parseCsv(text) {
  const rows = [];
  let row = [], field = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n") { row.push(field); rows.push(row); row = []; field = ""; }
    else if (c !== "\r") field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows;
}

const [header, ...body] = parseCsv(csv);
const rows = body.filter((r) => r.length > 1).map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ""])));

const pages = rows.filter((r) => r["我的建议"] !== "合并 301");
const merged = rows.filter((r) => r["我的建议"] === "合并 301");

const byCategory = new Map();
for (const r of pages) {
  const k = r["类目"];
  if (!byCategory.has(k)) byCategory.set(k, []);
  byCategory.get(k).push(r);
}
const catStats = [...byCategory.entries()]
  .map(([k, v]) => ({ category: k, pages: v.length, mergedAway: merged.filter((m) => m["类目"] === k).length }))
  .sort((a, b) => b.pages - a.pages);

// 按类目聚合页面，页面内附带被合并词
const mergedByCanonical = new Map();
for (const m of merged) {
  const k = m["建议主关键词"];
  if (!mergedByCanonical.has(k)) mergedByCanonical.set(k, []);
  mergedByCanonical.get(k).push(m["关键词"]);
}

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const pageRows = [];
for (const [category, list] of [...byCategory.entries()].sort((a, b) => b[1].length - a[1].length)) {
  pageRows.push(`<tr class="cat-row" data-cat="${esc(category)}"><td colspan="4">${esc(category)} <span class="muted">· ${list.length} 页</span></td></tr>`);
  for (const p of list) {
    const absorbed = mergedByCanonical.get(p["关键词"]) ?? [];
    const chips = absorbed.length
      ? `<div class="chips">${absorbed.map((k) => `<span class="chip">${esc(k)}</span>`).join("")}</div>`
      : "";
    pageRows.push(`<tr class="page-row" data-cat="${esc(category)}" data-kw="${esc((p["关键词"] + " " + absorbed.join(" ")).toLowerCase())}">
      <td class="c-cluster">${esc(p["簇号"])}</td>
      <td class="c-kw"><strong>${esc(p["关键词"])}</strong>${chips}</td>
      <td class="c-slug">${esc(p["当前slug"])}</td>
      <td class="c-num">${absorbed.length ? absorbed.length + 1 : 1}</td>
    </tr>`);
  }
}

const catRows = catStats.map((c) => `<tr><td>${esc(c.category)}</td><td class="num">${c.pages}</td><td class="num muted">${c.mergedAway}</td></tr>`).join("");

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>关键词页内容计划 · 535 → 384</title>
<style>
  :root{--ink:#15181d;--muted:#6b7280;--line:#e6e8ec;--bg:#ffffff;--soft:#f7f8fa;--accent:#1f5eff;--warn:#b45309;--ok:#0f766e}
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.65 -apple-system,BlinkMacSystemFont,"PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif;-webkit-font-smoothing:antialiased}
  .wrap{max-width:1040px;margin:0 auto;padding:56px 28px 96px}
  header .kicker{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
  h1{font-size:30px;line-height:1.25;margin:10px 0 8px;letter-spacing:-.01em}
  .lede{color:var(--muted);font-size:15px;max-width:760px}
  .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--line);border:1px solid var(--line);border-radius:10px;overflow:hidden;margin:28px 0 8px}
  .stat{background:var(--bg);padding:16px 18px}
  .stat b{display:block;font-size:24px;letter-spacing:-.02em}
  .stat span{color:var(--muted);font-size:12.5px}
  h2{font-size:19px;margin:44px 0 12px;padding-bottom:8px;border-bottom:1px solid var(--line)}
  h3{font-size:15px;margin:22px 0 6px}
  p{margin:10px 0}
  .muted{color:var(--muted)}
  .note{background:var(--soft);border-left:3px solid var(--accent);padding:14px 16px;border-radius:0 8px 8px 0;margin:16px 0}
  .warn{border-left-color:var(--warn)}
  table{width:100%;border-collapse:collapse;font-size:13.5px;margin:12px 0}
  th,td{text-align:left;padding:8px 10px;border-bottom:1px solid var(--line);vertical-align:top}
  th{font-weight:600;color:var(--muted);font-size:12px;letter-spacing:.04em;text-transform:uppercase;background:var(--soft);position:sticky;top:0}
  td.num,th.num{text-align:right;font-variant-numeric:tabular-nums}
  .c-cluster{width:52px;color:var(--muted);font-variant-numeric:tabular-nums}
  .c-slug{width:270px;color:var(--muted);font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;word-break:break-all}
  .c-num{width:64px}
  .cat-row td{background:#fbfbfc;font-weight:600;font-size:13px}
  .chips{margin-top:6px;display:flex;flex-wrap:wrap;gap:4px}
  .chip{font-size:11.5px;color:var(--muted);border:1px solid var(--line);border-radius:99px;padding:1px 8px;background:#fff}
  .toolbar{display:flex;gap:10px;align-items:center;margin:18px 0 10px;flex-wrap:wrap}
  input[type=search],select{font:inherit;font-size:13.5px;padding:7px 10px;border:1px solid var(--line);border-radius:7px;background:#fff;color:var(--ink)}
  input[type=search]{min-width:280px}
  .scroll{max-height:620px;overflow:auto;border:1px solid var(--line);border-radius:10px}
  code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12.5px;background:var(--soft);padding:1px 5px;border-radius:4px}
  ol,ul{margin:10px 0;padding-left:22px}
  li{margin:5px 0}
  .kv{display:grid;grid-template-columns:190px 1fr;gap:6px 18px;font-size:13.5px;margin:10px 0}
  .kv div:nth-child(odd){color:var(--muted)}
  footer{margin-top:56px;padding-top:18px;border-top:1px solid var(--line);color:var(--muted);font-size:12.5px}
  @media(max-width:760px){.stats{grid-template-columns:repeat(2,1fr)}.kv{grid-template-columns:1fr}.c-slug{display:none}}
</style>
</head>
<body>
<div class="wrap">
<header>
  <div class="kicker">Ciwi · Shopify 场景库</div>
  <h1>关键词页内容计划：535 → 384</h1>
  <p class="lede">按「一个搜索意图一个页面」重新切分，并给出每页需要唯一撰写的正文量。左侧表用于逐条标注，标注完即可进入撰写。</p>
  <div class="note warn" style="margin-top:18px">
    <strong>当前状态：仅批准「关键词页标题前置」这一项小范围改动。</strong>
    本页的 <strong>384 页</strong>与<strong>151 条合并</strong>是初判，<strong>未获批执行</strong>；
    最终规模由试产质量与逐条意图复核结果决定。在复核完成前，不合并任何 URL、不删除任何页面。
  </div>
</header>

<div class="stats">
  <div class="stat"><b>535</b><span>现有 URL</span></div>
  <div class="stat"><b>384</b><span>应保留页面</span></div>
  <div class="stat"><b>151</b><span>应合并 URL</span></div>
  <div class="stat"><b>768</b><span>需撰写篇数（中英）</span></div>
</div>
<p class="muted" style="font-size:13px">注：合并掉的 151 条不是删除，是 301 到同意图的规范页；导航与内链都指向规范页。</p>

<h2>一、必须先纠正我上一轮的判断</h2>
<div class="note warn">
  <strong>上一轮我说「167 个真实场景，被 535 个关键词以同义词复用」，这个结论是错的。</strong>
  167 是<strong>正文簇</strong>的数量（按 <code>howToSolve</code> 相同聚出来的），不是<strong>意图</strong>的数量。
  簇内关键词经常是真正不同的需求：20 号簇里同时装着 GA4 接入、Meta 投放报表、多点归因；37 号簇里同时装着竞品比价、新品监控、库存监控。
  把它们当成同义词，会误删掉本来该独立拿排名的页面。
</div>
<p>重新按语义逐个簇判定后，真实结构是：</p>
<div class="kv">
  <div>正文簇</div><div>167 个（决定了 167 份重复正文）</div>
  <div>真实搜索意图</div><div><strong>384 个</strong>（决定了需要 384 份唯一正文）</div>
  <div>纯同义、该合并的词</div><div>151 条，分布在 106 个合并组里</div>
  <div>最大合并组</div><div>6 个词共用一个页面（如 <code>shopify customer segmentation app</code> 组）</div>
</div>
<p>所以「重写」是成立的：<strong>384 个页面确实代表了 384 个不同的任务</strong>，素材来自这些任务各自的输入、产出与失败模式，而不是从同义词里硬编差别。这也意味着工作量比我上一轮估的 1070 篇少，但仍然是一个内容生产项目：<strong>768 篇</strong>。</p>

<h2>二、为什么现在的页面撑不住 384 个独立页</h2>
<p>现有每条数据的字段体量（535 条均值）：</p>
<table>
  <tr><th>字段</th><th class="num">现状</th><th class="num">目标</th><th>为什么</th></tr>
  <tr><td><code>scenarioDescription</code></td><td class="num">47 词</td><td class="num">90–120 词</td><td>现在只交代「在做什么」，没有触发条件、约束和失败代价，读起来像通用介绍</td></tr>
  <tr><td><code>howToSolve</code></td><td class="num">52 词 / 约 3 句</td><td class="num">250–320 词 / 5–6 步</td><td>模板按句号切分步骤，一句就是一步；3 句拆出的「流程」没有任何操作细节</td></tr>
  <tr><td><code>aiPrompt</code></td><td class="num">153 词</td><td class="num">180–220 词</td><td>长度够了但内容同质：同簇内输入清单与产出物逐字相同，提示词不可替换</td></tr>
  <tr><td><code>faqs</code></td><td class="num">3 条</td><td class="num">3 条 × 60–90 词</td><td>现在回答的是一般性问题，没有回答「这个任务为什么容易做错」</td></tr>
</table>
<p>也就是说，单纯把 151 条合并掉、保留 384 条不动，页面照样是薄的。去重和加深必须一起做，否则只是把 535 个薄页变成 384 个薄页。</p>

<h2>三、每页唯一的正文从哪来</h2>
<p>差异化的唯一可靠来源是<strong>任务本身的结构</strong>，不是措辞。每页固定的六个信息位：</p>
<ol>
  <li><strong>触发条件</strong> — 什么信号出现时该做这件事（指标异常、上新、投放起量、退款集中）。</li>
  <li><strong>前置输入</strong> — 需要哪些具体数据，缺了会怎样算错。</li>
  <li><strong>判定规则</strong> — 阈值、对比基线、样本量下限。</li>
  <li><strong>失败模式</strong> — 这个任务最常见的三种做错方式及其表现。</li>
  <li><strong>产出格式</strong> — 交付物长什么样（表格列定义、分级标准）。</li>
  <li><strong>复核方式</strong> — 怎么知道这次判断是对的，多久后回看。</li>
</ol>
<p>这六项在每个意图上都有实质差异，因为任务不同。撰写时每页必须至少有三处<strong>只在该页成立的数字或规则</strong>（例如安全库存的算法、退款率的行业基线、广告疲劳的频次阈值），否则视为未完成。</p>

<h2>四、样张（已按上述标准写完，中英各一版）</h2>
<p>选了 <code>shopify product research tool</code>（合并了 <code>shopify product research app</code> 与 <code>find winning products for shopify</code>），文件在 <code>docs/keyword-content-sample.json</code>。摘录场景段：</p>
<div class="note">
  “Someone on the team has a spreadsheet of forty product candidates and a purchase decision three weeks out. The real question is not which product is trending; it is which of these forty can be sourced, shipped, and sold at a margin that survives paid acquisition in the markets you actually serve.”
</div>
<p>与现有写法对比，区别不在修辞，在于它给出了<strong>场景数量、决策期限、约束条件</strong>三件只在选品这件事上成立的事实。撰写标准以这份样张为准。</p>

<h2>五、384 个页面清单（按类目，含被合并词）</h2>
<div class="toolbar">
  <input type="search" id="q" placeholder="搜索关键词或 slug…">
  <select id="cat"><option value="">全部类目（${catStats.length}）</option>${catStats.map((c) => `<option>${esc(c.category)}</option>`).join("")}</select>
  <span class="muted" id="count"></span>
</div>
<div class="scroll">
<table id="plan">
  <thead><tr><th>簇</th><th>规范页主词 / 被并入的词</th><th>slug</th><th class="num">覆盖词数</th></tr></thead>
  <tbody>
  ${pageRows.join("\n")}
  </tbody>
</table>
</div>

<h2>六、各页面数分布</h2>
<table>
  <thead><tr><th>类目</th><th class="num">保留页数</th><th class="num">并掉</th></tr></thead>
  <tbody>${catRows}</tbody>
</table>

<h2>七、怎么标注</h2>
<p>用 <code>docs/keyword-content-plan.csv</code>（535 行，Excel 可直接打开，UTF-8 BOM）。只需填两列：</p>
<div class="kv">
  <div><code>你的决定</code></div><div>留空 = 同意我的建议；或填 <code>独立</code> / <code>合并到:xxx</code></div>
  <div><code>备注</code></div><div>给撰写用的补充信息，例如「这个词我们有真实数据可以引用」</div>
</div>
<p>改完把表发我，我更新 <code>docs/keyword-intent-map.json</code> 并重跑 <code>node ./scripts/build-keyword-content-plan.mjs</code>，页面数会重新计算。</p>

<h2>八、撰写怎么分批</h2>
<p>768 篇不适合一次全出：质量无法逐篇复核，且一旦标准偏了就是 768 篇返工。建议：</p>
<ol>
  <li><strong>第 1 批 10 页（20 篇）</strong> — 覆盖 5 个不同类目，你逐篇过。验收标准：每页至少三处只在该页成立的数字或规则。</li>
  <li><strong>第 2 批 40 页</strong> — 校准后的标准跑一遍，抽查 20%。</li>
  <li><strong>其余 334 页</strong> — 按类目分批，每批 50 页，批内自查 + 抽样。</li>
</ol>
<p>每批产出直接写入 <code>shopify_keyword_use_cases.json</code> 的对应记录（含 <code>zh_*</code> 字段），并跑 <code>seo:check</code> 与 <code>content:validate</code>。合并掉的 151 条在最后一批统一做 301 与内链改指。</p>

<footer>
  数据源：<code>src/content/data/shopify_keyword_use_cases.json</code>（535 条）· 意图表：<code>docs/keyword-intent-map.json</code> · 生成脚本：<code>scripts/build-keyword-content-plan.mjs</code>
</footer>
</div>
<script>
const q = document.getElementById('q'), cat = document.getElementById('cat'), count = document.getElementById('count');
function apply(){
  const term = q.value.trim().toLowerCase();
  const c = cat.value;
  let visible = 0, shownCat = new Set();
  document.querySelectorAll('#plan tbody tr').forEach(tr => {
    if (tr.classList.contains('cat-row')) { tr.dataset.show = 'maybe'; tr.style.display = 'none'; return; }
    const okTerm = !term || tr.dataset.kw.includes(term);
    const okCat = !c || tr.dataset.cat === c;
    const show = okTerm && okCat;
    tr.style.display = show ? '' : 'none';
    if (show) { visible++; shownCat.add(tr.dataset.cat); }
  });
  document.querySelectorAll('#plan tbody tr.cat-row').forEach(tr => {
    tr.style.display = shownCat.has(tr.dataset.cat) ? '' : 'none';
  });
  count.textContent = visible + ' 页';
}
q.addEventListener('input', apply); cat.addEventListener('change', apply); apply();
</script>
</body>
</html>`;

fs.writeFileSync(path.join(root, "docs/keyword-content-plan.html"), html, "utf8");
console.log("页面数:", pages.length, " 合并:", merged.length, " 类目:", catStats.length);
console.log("输出: docs/keyword-content-plan.html");
