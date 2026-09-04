// —— 极乐迪斯科风格的自定义写作标签 ——
// {% skill 技能名 [颜色] %} ... {% endskill %}   技能说话（颜色: intellect/psyche/physique/motorics/orange/white）
// {% check 技能名 难度 结果 %}                    检定横幅，可点击掷骰
// {% thought 思维名 %} ... {% endthought %}      思维阁结晶卡
// {% hl 文字 %}                                  半光橙色高亮

// 属性与全部 24 项技能 → 归属颜色
const ATTR_COLOR = {
  '智力': 'intellect', '精神': 'psyche', '体质': 'physique', '机能': 'motorics',
  // 智力
  '逻辑': 'intellect', '百科': 'intellect', '修辞': 'intellect', '戏剧': 'intellect',
  '概念化': 'intellect', '视觉演算': 'intellect',
  'logic': 'intellect', 'encyclopedia': 'intellect', 'rhetoric': 'intellect',
  'drama': 'intellect', 'conceptualization': 'intellect', 'visual calculus': 'intellect',
  // 精神
  '意志': 'psyche', '内陆帝国': 'psyche', '共情': 'psyche', '权威': 'psyche',
  '团队精神': 'psyche', '暗示': 'psyche',
  'volition': 'psyche', 'inland empire': 'psyche', 'empathy': 'psyche',
  'authority': 'psyche', 'esprit de corps': 'psyche', 'suggestion': 'psyche',
  // 体质
  '耐力': 'physique', '电化学': 'physique', '战栗': 'physique', '半光': 'physique',
  '疼痛阈值': 'physique', '体能': 'physique',
  'endurance': 'physique', 'electrochemistry': 'physique', 'shivers': 'physique',
  'half light': 'physique', 'pain threshold': 'physique', 'physical instrument': 'physique',
  // 机能
  '手眼协调': 'motorics', '感知': 'motorics', '反应速度': 'motorics', '处世经验': 'motorics',
  '交感': 'motorics', '镇定': 'motorics',
  'hand/eye coordination': 'motorics', 'perception': 'motorics', 'reaction speed': 'motorics',
  'savoir faire': 'motorics', 'interfacing': 'motorics', 'composure': 'motorics'
};

const renderMd = (content) =>
  hexo.render.renderSync({ text: content, engine: 'markdown' }).replace(/^<p>|<\/p>\n?$/g, '');

hexo.extend.tag.register('skill', function (args, content) {
  const name = args[0] || '你';
  const cls = args[1] || ATTR_COLOR[name] || 'white';
  return `<div class="skill-line ${cls}"><span class="sk-name">${name}</span><div class="sk-text">${renderMd(content)}</div></div>`;
}, { ends: true });

hexo.extend.tag.register('check', function (args) {
  const name = args[0] || '检定';
  const diff = args[1] || '';
  const result = args[2] || '成功';
  const cls = /成功|通过|白色/.test(result) ? 'pass' : 'fail';
  return `<div class="check-banner ${cls}" data-roll role="button" tabindex="0" aria-label="技能检定，点击掷骰">`
    + `<span class="cb-name">${name}</span>`
    + (diff ? `<span class="cb-diff">${diff}</span>` : '')
    + `<span class="cb-res">${result}</span>`
    + `<span class="cb-dice" aria-hidden="true"></span></div>`;
});

hexo.extend.tag.register('thought', function (args, content) {
  const title = args.join(' ') || '未命名的想法';
  return `<aside class="thought-box"><div class="tb-head"><span class="tb-tag">思维阁 · 新想法正在结晶</span><strong class="tb-title">${title}</strong></div><div class="tb-body">${renderMd(content)}</div></aside>`;
}, { ends: true });

hexo.extend.tag.register('hl', function (args) {
  return `<mark class="hl">${args.join(' ')}</mark>`;
});
