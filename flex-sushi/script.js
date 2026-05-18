const levels = [
  {
    title: '1. 鮭魚先到中央席',
    text: '客人坐在吧台正中央，請把壽司盤水平移到輸送帶中央。',
    hint: '試試 justify-content: center; 讓主軸置中。',
    sushi: ['salmon'],
    target: { justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'row' },
    required: { 'justify-content': 'center' },
  },
  {
    title: '2. 送到右側取餐口',
    text: '右側客人揮手了！把壽司送到輸送帶最右邊。',
    hint: '主軸是水平 row，終點可以用 flex-end。',
    sushi: ['salmon'],
    target: { justifyContent: 'flex-end', alignItems: 'flex-start', flexDirection: 'row' },
    required: { 'justify-content': 'flex-end' },
  },
  {
    title: '3. 章魚燒靠近下層',
    text: '盤子要停在下方的取餐層，請沿交錯軸對齊底部。',
    hint: '垂直方向是交錯軸，可以使用 align-items。',
    sushi: ['octopus'],
    target: { justifyContent: 'flex-start', alignItems: 'flex-end', flexDirection: 'row' },
    required: { 'align-items': 'flex-end' },
  },
  {
    title: '4. 茶碗蒸在正中央',
    text: '讓餐點同時在水平與垂直方向置中，成為吧台焦點。',
    hint: '你會需要 justify-content 與 align-items 都置中。',
    sushi: ['maki'],
    target: { justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
    required: { 'justify-content': 'center', 'align-items': 'center' },
  },
  {
    title: '5. 三盤平均散開',
    text: '鮭魚、玉子燒、蝦壽司要平均分散，兩端貼近輸送帶邊緣。',
    hint: '平均分散且兩端貼邊是 space-between。',
    sushi: ['salmon', 'tamago', 'ebi'],
    target: { justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: 'row' },
    required: { 'justify-content': 'space-between' },
  },
  {
    title: '6. 每盤都有呼吸空間',
    text: '四盤壽司需要左右留白也彼此平均，讓客人好拿取。',
    hint: '包含兩端空間的平均分配可以用 space-around。',
    sushi: ['salmon', 'onigiri', 'ebi', 'maki'],
    target: { justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' },
    required: { 'justify-content': 'space-around', 'align-items': 'center' },
  },
  {
    title: '7. 輸送帶反轉',
    text: '師傅從右側補餐，請讓壽司排序反向排列。',
    hint: '主軸方向可以改成 row-reverse。',
    sushi: ['salmon', 'ebi', 'onigiri'],
    target: { justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'row-reverse' },
    required: { 'flex-direction': 'row-reverse' },
  },
  {
    title: '8. 直式升降梯',
    text: '改成直式輸送帶，並把第一盤送到底部。',
    hint: '先用 column 改主軸，再用 justify-content 控制垂直方向。',
    sushi: ['salmon', 'maki'],
    target: { justifyContent: 'flex-end', alignItems: 'flex-start', flexDirection: 'column' },
    required: { 'flex-direction': 'column', 'justify-content': 'flex-end' },
  },
  {
    title: '9. 右側直式套餐',
    text: '套餐要垂直置中，並靠右側取餐口。',
    hint: 'column 的主軸是垂直；水平靠右要設定 align-items。',
    sushi: ['salmon', 'ebi', 'maki'],
    target: { justifyContent: 'center', alignItems: 'flex-end', flexDirection: 'column' },
    required: { 'flex-direction': 'column', 'justify-content': 'center', 'align-items': 'flex-end' },
  },
  {
    title: '10. 壽司列車保持間距',
    text: '最後挑戰：三盤置中排列，而且每盤之間保留 32px 間距。',
    hint: '除了置中，也可以用 gap: 32px; 控制項目間距。',
    sushi: ['salmon', 'onigiri', 'ebi'],
    target: { justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: '32px' },
    required: { 'justify-content': 'center', 'align-items': 'center', gap: '32px' },
  },
];


const sushiTypes = {
  salmon: { label: '鮭魚微笑壽司', face: '◕‿◕' },
  ebi: { label: '蝦蝦眨眼壽司', face: '>‿◕' },
  tamago: { label: '玉子開心壽司', face: '＾▽＾' },
  onigiri: { label: '飯糰害羞壽司', face: '•ᴗ•' },
  maki: { label: '海苔卷圓圓壽司', face: 'ᵔᴥᵔ' },
  octopus: { label: '章魚粉紅壽司', face: '◠‿◠' },
};

const belt = document.querySelector('#belt');
const targets = document.querySelector('#targets');
const codeInput = document.querySelector('#codeInput');
const checkBtn = document.querySelector('#checkBtn');
const resetBtn = document.querySelector('#resetBtn');
const hintBtn = document.querySelector('#hintBtn');
const hintText = document.querySelector('#hintText');
const missionTitle = document.querySelector('#mission-title');
const missionText = document.querySelector('#missionText');
const statusText = document.querySelector('#status');
const levelNow = document.querySelector('#levelNow');
const levelTotal = document.querySelector('#levelTotal');
const progressBar = document.querySelector('#progressBar');
const levelList = document.querySelector('#levelList');
const sushiTemplate = document.querySelector('#sushiTemplate');

function readSolvedLevels() {
  try {
    return JSON.parse(localStorage.getItem('flexSushiSolved') || '[]');
  } catch {
    return [];
  }
}

function saveSolvedLevels() {
  try {
    localStorage.setItem('flexSushiSolved', JSON.stringify([...solvedLevels]));
  } catch {
    setStatus('已通關，但瀏覽器暫時無法儲存進度。', 'success');
  }
}

const solvedLevels = new Set(readSolvedLevels());
let currentLevel = 0;

function normalizePropertyName(property) {
  return property.trim().toLowerCase();
}

function normalizeValue(value) {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

function getDeclarationText(cssText) {
  const withoutComments = cssText.replace(/\/\*[\s\S]*?\*\//g, '');
  const blockMatch = withoutComments.match(/\{([\s\S]*)\}/);
  return (blockMatch ? blockMatch[1] : withoutComments).replace(/；/g, ';').replace(/：/g, ':');
}

function parseDeclarations(cssText) {
  return getDeclarationText(cssText)
    .split(';')
    .map((declaration) => declaration.trim())
    .filter(Boolean)
    .reduce((styles, declaration) => {
      const separatorIndex = declaration.indexOf(':');
      if (separatorIndex === -1) return styles;
      const property = normalizePropertyName(declaration.slice(0, separatorIndex));
      const value = normalizeValue(declaration.slice(separatorIndex + 1));
      styles[property] = value;
      return styles;
    }, {});
}

function playBeltMotion() {
  belt.classList.remove('is-moving');
  window.requestAnimationFrame(() => {
    belt.classList.add('is-moving');
  });
}

function renderLevelButtons() {
  levelList.innerHTML = '';
  levels.forEach((level, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = index + 1;
    button.title = level.title;
    button.classList.toggle('active', index === currentLevel);
    button.classList.toggle('solved', solvedLevels.has(index));
    button.addEventListener('click', () => loadLevel(index));
    levelList.append(button);
  });
}

function createSushi(type, index) {
  const sushi = sushiTypes[type] || sushiTypes.salmon;
  const node = sushiTemplate.content.firstElementChild.cloneNode(true);
  node.classList.add(`sushi-${type}`);
  node.querySelector('.face').textContent = sushi.face;
  node.style.setProperty('--sushi-index', index);
  node.setAttribute('aria-label', `第 ${index + 1} 盤 ${sushi.label}`);
  return node;
}

function createTarget(index) {
  const node = document.createElement('div');
  node.className = 'target-slot';
  node.textContent = index + 1;
  return node;
}

function applyStyles(element, styles) {
  element.removeAttribute('style');
  Object.entries(styles).forEach(([property, value]) => {
    element.style[property] = value;
  });
}

function applyUserCss() {
  const declarations = parseDeclarations(codeInput.value);
  belt.style.justifyContent = declarations['justify-content'] || '';
  belt.style.alignItems = declarations['align-items'] || '';
  belt.style.flexDirection = declarations['flex-direction'] || '';
  belt.style.gap = declarations.gap || '';
  playBeltMotion();
}

function setStatus(message, type = '') {
  statusText.textContent = message;
  statusText.className = `status ${type}`.trim();
}

function loadLevel(index) {
  currentLevel = index;
  const level = levels[index];

  missionTitle.textContent = level.title;
  missionText.textContent = level.text;
  hintText.textContent = level.hint;
  hintText.hidden = true;
  hintBtn.textContent = '顯示提示';
  levelNow.textContent = index + 1;
  levelTotal.textContent = levels.length;
  progressBar.style.width = `${((index + 1) / levels.length) * 100}%`;
  codeInput.value = '';

  belt.innerHTML = '';
  targets.innerHTML = '';
  level.sushi.forEach((type, sushiIndex) => {
    belt.append(createSushi(type, sushiIndex));
    targets.append(createTarget(sushiIndex));
  });

  applyStyles(targets, level.target);
  belt.removeAttribute('style');
  belt.classList.remove('is-moving');
  setStatus('輸入 CSS 後按下「送出答案」。可直接輸入宣告，也可以貼上完整 .belt { ... }。');
  renderLevelButtons();
}

function checkAnswer() {
  applyUserCss();
  const declarations = parseDeclarations(codeInput.value);
  const requiredEntries = Object.entries(levels[currentLevel].required);
  const wrongEntry = requiredEntries.find(([property, value]) => declarations[property] !== value);

  if (wrongEntry) {
    const [property] = wrongEntry;
    setStatus(`還差一點！請檢查 ${property} 的設定是否符合任務。`, 'error');
    return;
  }

  solvedLevels.add(currentLevel);
  saveSolvedLevels();
  renderLevelButtons();

  if (currentLevel === levels.length - 1) {
    setStatus('恭喜通關！你已經是 Flexbox 可愛壽司職人了 🍣', 'success');
    return;
  }

  setStatus('成功送達！下一盤壽司即將出發…', 'success');
  window.setTimeout(() => loadLevel(currentLevel + 1), 900);
}

codeInput.addEventListener('input', applyUserCss);
checkBtn.addEventListener('click', checkAnswer);
resetBtn.addEventListener('click', () => loadLevel(currentLevel));
hintBtn.addEventListener('click', () => {
  hintText.hidden = !hintText.hidden;
  hintBtn.textContent = hintText.hidden ? '顯示提示' : '收起提示';
});

document.querySelectorAll('[data-snippet]').forEach((button) => {
  button.addEventListener('click', () => {
    const snippet = button.dataset.snippet;
    codeInput.value = `${codeInput.value.trim()}\n${snippet}`.trim();
    codeInput.focus();
    applyUserCss();
  });
});

loadLevel(0);
