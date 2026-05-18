const levels = [
    {
        title: "把玉子燒送到右邊客人",
        story: "右側客人已經坐好，請把壽司盤推到輸送帶尾端。",
        order: "訂單：玉子燒 → 右側",
        hint: "主軸是從左到右，想把項目推到尾端可以改變 justify-content。",
        sushi: ["tamago"],
        answer: { flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-start", flexWrap: "nowrap", gap: "8px" },
    },
    {
        title: "鮭魚握壽司要坐到吧檯中央",
        story: "客人坐在中間座位，讓餐盤停在輸送帶正中央。",
        order: "訂單：鮭魚 → 中央",
        hint: "justify-content 可以控制主軸上的整體位置。",
        sushi: ["salmon"],
        answer: { flexDirection: "row", justifyContent: "center", alignItems: "flex-start", flexWrap: "nowrap", gap: "8px" },
    },
    {
        title: "把三盤壽司平均分給三位客人",
        story: "三位客人分坐在左、中、右，請讓每盤壽司之間留出相同間隔。",
        order: "訂單：三盤壽司 → 平均分散",
        hint: "space-between 會把第一個與最後一個項目推到兩端，中間平均分配。",
        sushi: ["salmon", "tuna", "tamago"],
        answer: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "nowrap", gap: "8px" },
    },
    {
        title: "師傅站在下方，請把壽司靠近他",
        story: "輸送帶高度變高了，這次要控制交叉軸，讓壽司停在下緣。",
        order: "訂單：鮪魚 → 下方",
        hint: "當 flex-direction 是 row，交叉軸是垂直方向，可以使用 align-items。",
        sushi: ["tuna"],
        answer: { flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-end", flexWrap: "nowrap", gap: "8px" },
    },
    {
        title: "直立輸送帶：海苔卷要到最下層",
        story: "店長把輸送帶改成直立模式，請先改變主軸方向。",
        order: "訂單：海苔卷 → 下層",
        hint: "column 會讓主軸由上往下，justify-content 的 flex-end 就會變成底部。",
        sushi: ["maki"],
        answer: { flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-start", flexWrap: "nowrap", gap: "8px" },
    },
    {
        title: "反向輸送帶：第一盤要從右邊出發",
        story: "今天輸送帶反方向轉動，讓第一盤玉子燒出現在右側。",
        order: "訂單：反向出餐",
        hint: "row-reverse 會讓項目排列方向從右往左。",
        sushi: ["tamago", "salmon", "tuna"],
        answer: { flexDirection: "row-reverse", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "nowrap", gap: "8px" },
    },
    {
        title: "壽司太多了，請換到第二圈輸送帶",
        story: "六盤壽司擠不下一排，請讓餐盤自動換行。",
        order: "訂單：六盤壽司 → 換行",
        hint: "flex-wrap: wrap 允許項目換到下一行。",
        sushi: ["salmon", "tuna", "tamago", "maki", "salmon", "tuna"],
        answer: { flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "wrap", gap: "20px" },
    },
    {
        title: "豪華拼盤要整齊置中",
        story: "最後一關！兩排拼盤要置中並保留舒服間距。",
        order: "訂單：豪華拼盤 → 置中換行",
        hint: "同時組合 justify-content、align-items、flex-wrap 與 gap。",
        sushi: ["salmon", "tuna", "tamago", "maki", "salmon"],
        answer: { flexDirection: "row", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "44px" },
    },
];

const sushiEmoji = {
    salmon: "🍣",
    tuna: "🍣",
    tamago: "🍳",
    maki: "🍙",
};

const form = document.querySelector("#flex-form");
const sushiRow = document.querySelector("#sushi-row");
const targets = document.querySelector("#targets");
const codePreview = document.querySelector("#code-preview");
const feedback = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-level");
const checkButton = document.querySelector("#check-answer");
const resetButton = document.querySelector("#reset-level");
const levelBadge = document.querySelector("#level-badge");
const levelScore = document.querySelector("#level-score");
const progressBar = document.querySelector("#progress-bar");
const title = document.querySelector("#level-title");
const story = document.querySelector("#level-story");
const hint = document.querySelector("#level-hint");
const ticket = document.querySelector("#order-ticket");

let currentLevelIndex = 0;
let solvedLevels = new Set();

function getControls() {
    const data = new FormData(form);
    return {
        flexDirection: data.get("flexDirection"),
        justifyContent: data.get("justifyContent"),
        alignItems: data.get("alignItems"),
        flexWrap: data.get("flexWrap"),
        gap: data.get("gap"),
    };
}

function applyFlexStyles(targetElement, values) {
    targetElement.style.flexDirection = values.flexDirection;
    targetElement.style.justifyContent = values.justifyContent;
    targetElement.style.alignItems = values.alignItems;
    targetElement.style.flexWrap = values.flexWrap;
    targetElement.style.gap = values.gap;
}

function updatePreview() {
    const values = getControls();
    applyFlexStyles(sushiRow, values);
    codePreview.textContent = `.sushi-row {\n  display: flex;\n  flex-direction: ${values.flexDirection};\n  justify-content: ${values.justifyContent};\n  align-items: ${values.alignItems};\n  flex-wrap: ${values.flexWrap};\n  gap: ${values.gap};\n}`;
}

function createSushi(type, index) {
    const item = document.createElement("div");
    item.className = `sushi sushi--${type}`;
    item.textContent = sushiEmoji[type];
    item.setAttribute("role", "img");
    item.setAttribute("aria-label", `第 ${index + 1} 盤 ${type} 壽司`);
    return item;
}

function renderPlates(container, level, isTarget = false) {
    container.replaceChildren();
    level.sushi.forEach((type, index) => {
        container.append(isTarget ? createTarget(type) : createSushi(type, index));
    });
}

function createTarget(type) {
    const target = document.createElement("div");
    target.className = "target-plate";
    target.dataset.sushi = sushiEmoji[type];
    return target;
}

function setFormValues(values) {
    Object.entries(values).forEach(([key, value]) => {
        form.elements[key].value = value;
    });
}

function resetControls() {
    setFormValues({ flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start", flexWrap: "nowrap", gap: "8px" });
    feedback.className = "feedback";
    feedback.textContent = "請調整下方 Flexbox 屬性後按「確認出餐」。";
    nextButton.disabled = true;
    updatePreview();
}

function loadLevel(index) {
    currentLevelIndex = index;
    const level = levels[index];
    title.textContent = level.title;
    story.textContent = level.story;
    hint.innerHTML = level.hint.replaceAll("justify-content", "<code>justify-content</code>").replaceAll("align-items", "<code>align-items</code>").replaceAll("flex-wrap", "<code>flex-wrap</code>").replaceAll("flex-direction", "<code>flex-direction</code>").replaceAll("gap", "<code>gap</code>");
    ticket.textContent = level.order;
    levelBadge.textContent = `第 ${index + 1} 關`;
    levelScore.textContent = `${solvedLevels.size} / ${levels.length} 顆星`;
    progressBar.style.width = `${((index + 1) / levels.length) * 100}%`;

    renderPlates(sushiRow, level);
    renderPlates(targets, level, true);
    applyFlexStyles(targets, level.answer);
    resetControls();
}

function normalizeAnswer(values) {
    return Object.entries(values).map(([key, value]) => `${key}:${value}`).join(";");
}

function checkAnswer() {
    const current = normalizeAnswer(getControls());
    const answer = normalizeAnswer(levels[currentLevelIndex].answer);

    if (current === answer) {
        solvedLevels.add(currentLevelIndex);
        feedback.className = "feedback is-success";
        feedback.textContent = currentLevelIndex === levels.length - 1 ? "太完美了！你已完成所有迴轉壽司 Flexbox 任務。" : "出餐成功！壽司精準抵達客人面前。";
        levelScore.textContent = `${solvedLevels.size} / ${levels.length} 顆星`;
        nextButton.disabled = currentLevelIndex === levels.length - 1;
        sushiRow.querySelectorAll(".sushi").forEach((item, index) => {
            item.style.transform = `translateY(${index % 2 === 0 ? "-4px" : "4px"}) rotate(${index % 2 === 0 ? "-4deg" : "4deg"})`;
        });
        return;
    }

    feedback.className = "feedback is-error";
    feedback.textContent = "還差一點！觀察半透明目標盤，再調整一個 Flexbox 屬性試試看。";
}

form.addEventListener("change", () => {
    feedback.className = "feedback";
    feedback.textContent = "設定已更新，按「確認出餐」看看是否成功。";
    nextButton.disabled = true;
    updatePreview();
});

checkButton.addEventListener("click", checkAnswer);
resetButton.addEventListener("click", resetControls);
nextButton.addEventListener("click", () => {
    if (currentLevelIndex < levels.length - 1) {
        loadLevel(currentLevelIndex + 1);
    }
});

loadLevel(0);
