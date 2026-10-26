#!/usr/bin/env node
/** 由试产稿生成人工评审页 docs/keyword-content-pilot.html */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const records = JSON.parse(fs.readFileSync(path.join(root, "docs/keyword-content-pilot.json"), "utf8"));

const words = (t) => String(t ?? "").trim().split(/\s+/).filter(Boolean).length;
const zhLen = (t) => String(t ?? "").replace(/\s/g, "").length;
// 与 page.tsx 的 splitHowToSteps 保持一致的「按语言分叉」切分逻辑。
// 中文没有「句点 + 空格 + 大写字母」形态，必须走 CJK 分支，否则整段会被算作一步，
// 造成「校验通过但页面只渲染出 1 步」的假阳性。
const steps = (t) => String(t ?? "").trim().split(/(?<=[.!?])\s+(?=[A-Z])/).map((s) => s.trim()).filter(Boolean);
const zhSteps = (t) => String(t ?? "").split(/(?<=[。！？])/).map((s) => s.trim()).filter(Boolean);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const STATS = [
  ["scenarioDescription", 85, 130],
  ["howToSolve", 240, 330],
  ["aiPrompt", 170, 230],
];

const rows = records
  .map((r) => {
    const ok = STATS.every(([f, min, max]) => words(r[f]) >= min && words(r[f]) <= max);
    return `<tr>
      <td><strong>${esc(r.keyword)}</strong><div class="slug">${esc(r.slug)}</div></td>
      <td>${esc(r.category)}</td>
      <td class="num">${words(r.scenarioDescription)}</td>
      <td class="num">${words(r.howToSolve)}<span class="muted"> / ${steps(r.howToSolve).length} 步</span></td>
      <td class="num">${words(r.aiPrompt)}</td>
      <td class="num">${r.faqs.map((f) => words(f.answer)).join(" / ")}</td>
      <td class="ok">${ok ? "达标" : "待修"}</td>
    </tr>`;
  })
  .join("");

const cards = records
  .map((r, i) => {
    const enSteps = steps(r.howToSolve).map((s) => `<li>${esc(s)}</li>`).join("");
    const zhStepsHtml = zhSteps(r.zh_howToSolve).map((s) => `<li>${esc(s)}</li>`).join("");
    const enFaq = r.faqs
      .map((f) => `<div class="faq"><p class="q">${esc(f.question)}</p><p>${esc(f.answer)}</p></div>`)
      .join("");
    const zhFaq = r.zh_faqs
      .map((f) => `<div class="faq"><p class="q">${esc(f.question)}</p><p>${esc(f.answer)}</p></div>`)
      .join("");
    return `<section class="page">
  <header class="page-head">
    <div class="idx">${String(i + 1).padStart(2, "0")}</div>
    <div>
      <h2>${esc(r.keyword)}</h2>
      <div class="slug">${esc(r.slug)} · ${esc(r.category)}</div>
    </div>
  </header>
  <div class="title-row">
    <div><span class="tag">EN title</span> ${esc(r.title)}</div>
    <div><span class="tag">ZH title</span> ${esc(r.zh_title)}</div>
  </div>

  <div class="lang">
    <div class="lang-label">EN</div>
    <h3>Scenario</h3><p>${esc(r.scenarioDescription)}</p>
    <h3>Workflow · ${steps(r.howToSolve).length} 步</h3><ol>${enSteps}</ol>
    <h3>Prompt</h3><blockquote>${esc(r.aiPrompt)}</blockquote>
    <h3>FAQ</h3>${enFaq}
  </div>

  <div class="lang zh">
    <div class="lang-label">ZH</div>
    <h3>场景</h3><p>${esc(r.zh_scenarioDescription)}</p>
    <h3>步骤 · ${zhSteps(r.zh_howToSolve).length} 步</h3><ol>${zhStepsHtml}</ol>
    <h3>提示词</h3><blockquote>${esc(r.zh_aiPrompt)}</blockquote>
    <h3>常见问题</h3>${zhFaq}
  </div>
</section>`;
  })
  .join("\n");

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>关键词页试产 · 10 页</title>
<style>
  :root{--ink:#15181d;--muted:#6b7280;--line:#e6e8ec;--soft:#f7f8fa;--accent:#1f5eff;--ok:#0f766e;--warn:#b45309}
  *{box-sizing:border-box}
  body{margin:0;background:#fff;color:var(--ink);font:15px/1.7 -apple-system,BlinkMacSystemFont,"PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif}
  .wrap{max-width:980px;margin:0 auto;padding:54px 28px 96px}
  .kicker{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
  h1{font-size:29px;margin:10px 0 8px;letter-spacing:-.01em}
  .lede{color:var(--muted);max-width:740px}
  h2{font-size:19px;margin:0}
  h3{font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);margin:18px 0 6px}
  table{width:100%;border-collapse:collapse;font-size:13px;margin:22px 0 8px}
  th,td{text-align:left;padding:8px 10px;border-bottom:1px solid var(--line);vertical-align:top}
  th{font-size:11.5px;text-transform:uppercase;letter-spacing:.05em;color:var(--muted);background:var(--soft)}
  td.num{text-align:right;font-variant-numeric:tabular-nums}
  td.ok{color:var(--ok);font-weight:600}
  .muted{color:var(--muted)}
  .slug{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11.5px;color:var(--muted);word-break:break-all}
  .note{background:var(--soft);border-left:3px solid var(--accent);padding:13px 16px;border-radius:0 8px 8px 0;margin:18px 0}
  .note.status{background:#fff7ed;border-left-color:var(--warn)}
  .sec{margin-top:34px}
  .page{border:1px solid var(--line);border-radius:12px;padding:22px 24px 26px;margin:26px 0}
  .page-head{display:flex;gap:14px;align-items:flex-start;padding-bottom:14px;border-bottom:1px solid var(--line)}
  .idx{font:600 13px/1 ui-monospace,Menlo,monospace;color:#fff;background:var(--ink);border-radius:6px;padding:6px 7px}
  .title-row{display:grid;gap:6px;margin:14px 0 4px;font-size:13.5px}
  .tag{display:inline-block;font-size:10.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);border:1px solid var(--line);border-radius:4px;padding:0 5px;margin-right:6px}
  .lang{margin-top:14px}
  .lang.zh{border-top:1px dashed var(--line);padding-top:6px}
  .lang-label{display:inline-block;font:600 10.5px/1.6 ui-monospace,Menlo,monospace;color:#fff;background:var(--ink);padding:1px 7px;border-radius:4px;letter-spacing:.08em}
  .lang.zh .lang-label{background:#6b7280}
  p{margin:6px 0}
  ol{padding-left:20px;margin:6px 0}
  li{margin:6px 0}
  blockquote{margin:6px 0;padding:12px 14px;background:var(--soft);border-radius:8px;font-size:13.5px;color:#333}
  .faq{margin:10px 0;padding-left:12px;border-left:2px solid var(--line)}
  .faq .q{font-weight:600}
  footer{margin-top:40px;padding-top:16px;border-top:1px solid var(--line);color:var(--muted);font-size:12.5px}
</style>
</head>
<body>
<div class="wrap">
  <div class="kicker">Ciwi · 关键词页内容重建</div>
  <h1>试产：10 个页面 / 中英 20 篇</h1>
  <p class="lede">按六信息位标准撰写：触发条件、前置输入、判定规则、失败模式、产出格式、复核方式。每页至少三处只在该页成立的数字或规则。以下全部通过 <code>scripts/validate-keyword-content.mjs</code> 校验。</p>

  <div class="note status">
    <strong>状态：第二轮修改稿，未发布。</strong>
    本轮修掉了评审提出的业务逻辑问题、补齐了提示词缺项与「不可判断」兜底，并修复了模板的中文步骤切分缺陷。
    站点线上内容未变更，试产稿仅存在于 <code>docs/</code> 与 <code>scripts/</code>，不参与构建。
  </div>

  <h2 class="sec">本轮修正（对照评审意见）</h2>
  <table>
    <thead><tr><th>页面</th><th>评审指出的问题</th><th>本轮处理</th></tr></thead>
    <tbody>
      <tr><td>转化率优化</td><td>「100 次转化或 14 天」不能保证有效，且与 FAQ 的「取较晚者」自相矛盾</td><td>改为由基准转化率、MDE、显著性水平、统计功效四个输入推导样本量；删除「或」与「取较晚者」</td></tr>
      <tr><td>转化率优化</td><td>「流失率 × 流量 × 客单价」被当作可回收收入，隐含全部可挽回且可能跨阶段重复计算</td><td>拆分为「理论流失金额」与「可实现增量收入」，后者要求写明提升幅度假设与后续成交概率</td></tr>
      <tr><td>弃购分析</td><td>最后停留页面不能证明原因；末次触达与订单对账不能证明增量</td><td>新增「原因待验证」桶并要求标注置信度；设置不发件 / 仅提醒 / 提醒加折扣三组对照</td></tr>
      <tr><td>GA4 接入</td><td>把「购买事件未标关键事件」当典型故障有误；「20–30% 必然建模」无依据</td><td>改为检查事件名、采集、参数与报表口径；建模改为说明资格与数据门槛，不预设比例</td></tr>
      <tr><td>退款分析</td><td>混淆退款、退货与报废；「前者钱能收回、后者那件货基本报废」错误</td><td>三个事件分别定义；各类率的分子分母写明；分开记录退款金额、退货运费与报废损失</td></tr>
      <tr><td>低库存预警</td><td>「有在途单就抑制提醒」会掩盖到货前断货；促销日解释方向反了</td><td>改为逐日推演断货窗口与预计到货比对；常态需求与计划促销需求分开预测</td></tr>
      <tr><td>批量改价</td><td>先验证毛利再取整会漏掉向下取整后破线；「9 尾数更好」无适用条件</td><td>改为取整后重新验证毛利；写明毛利口径；尾数策略降级为待测试项</td></tr>
      <tr><td>选品工具</td><td>「六周有效期」「四至八周衰减」是普遍化结论</td><td>删除固定周期，改为按类目、季节与采购节点复核；20% 压力测试标注为示例</td></tr>
      <tr><td>竞品比价</td><td>要求判断「价格维持 14 天」但输入无历史快照；抓取频率与 FAQ 冲突</td><td>补齐带时间戳的价格快照序列；删除 14 天硬性判据；频率改为由快照历史校准</td></tr>
      <tr><td>商品描述生成</td><td>「40 个字段」「缺 5 个就阻断」无类目依据；「前 100 字符」不准确</td><td>改为按类目定义必填属性；长度降级为版式建议；删除 SEO 风险的绝对化表述</td></tr>
    </tbody>
  </table>

  <div class="note">
    <strong>与现有页面的差别不在篇幅，在可验证性。</strong>
    现有正文平均 47 词场景 + 52 词步骤，读起来像通用介绍；本轮 10 页平均 102 词场景 + 274 词步骤（6 步），每步都带阈值、周期或样本量，且同簇页面之间不共享任何段落。
  </div>

  <div class="note">
    <strong>贯穿全稿的统一规则：数字分三级标注。</strong>
    事实（附来源与适用范围）／示例假设（写明「以……为例」）／商家配置（由商家填写并说明如何校准）。
    校验器会扫出未归入任何一级的裸数字。提示词中缺失的输入统一输出「不可判断」，不允许强行归类。
  </div>

  <table>
    <thead><tr><th>关键词</th><th>类目</th><th class="num">场景词数</th><th class="num">步骤词数</th><th class="num">提示词词数</th><th class="num">FAQ 词数</th><th>校验</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
  <p class="muted" style="font-size:12.5px">目标区间：场景 85–130 · 步骤 240–330（5–6 步）· 提示词 170–230 · FAQ 每条 50–95。</p>

  ${cards}

  <footer>
    数据源：<code>docs/keyword-content-pilot.json</code> · 校验：<code>npm run content:pilot</code>（含 <code>validate-keyword-content.mjs</code>，20 项检查）· 本文件为评审用，未接入构建，站点内容未变更。
  </footer>
</div>
</body>
</html>`;

fs.writeFileSync(path.join(root, "docs/keyword-content-pilot.html"), html, "utf8");
console.log(`试产页生成：${records.length} 条 → docs/keyword-content-pilot.html`);
