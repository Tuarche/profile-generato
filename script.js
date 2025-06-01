const nameInput = document.getElementById("name");
const twitchInput = document.getElementById("twitch-id");
const youtubeInput = document.getElementById("youtube-id");
const xInput = document.getElementById("x-id");
const activeHoursInput = document.getElementById("active-hours");
const weekdayInputs = document.querySelectorAll(".weekdays input");
const preview = document.getElementById("preview-content");

function createBar(items, activeSet, total, type) {
  const bar = document.createElement("div");
  bar.className = type === "hour" ? "activity-bar" : "weekday-bar";

  for (let i = 0; i < total; i++) {
    const item = document.createElement("span");
    item.textContent = type === "hour" ? i + 1 : items[i];
    if (activeSet.has(type === "hour" ? i + 1 : items[i])) {
      item.classList.add("active");
    }
    bar.appendChild(item);
  }

  return bar;
}

function renderPreview() {
  const name = nameInput.value || "名前未入力";
  const twitch = twitchInput.value;
  const youtube = youtubeInput.value;
  const x = xInput.value;

  const activeHours = new Set(
    (activeHoursInput.value || "")
      .split(",")
      .map((n) => parseInt(n.trim()))
      .filter((n) => n >= 1 && n <= 24)
  );

  const activeDays = new Set();
  weekdayInputs.forEach((el) => {
    if (el.checked) activeDays.add(el.value);
  });

  // プレビューをクリア
  preview.innerHTML = "";

  // アイコン・名前・SNS
  const nameEl = document.createElement("h2");
  nameEl.textContent = name;
  preview.appendChild(nameEl);

  if (x) {
    const xEl = document.createElement("div");
    xEl.textContent = `X: ${x}`;
    preview.appendChild(xEl);
  }

  if (twitch) {
    const twitchEl = document.createElement("div");
    twitchEl.textContent = `Twitch: ${twitch}`;
    preview.appendChild(twitchEl);
  }

  if (youtube) {
    const ytEl = document.createElement("div");
    ytEl.textContent = `YouTube: ${youtube}`;
    preview.appendChild(ytEl);
  }

  // 活動時間
  const activeTimeLabel = document.createElement("div");
  activeTimeLabel.className = "label";
  activeTimeLabel.textContent = "【活動時間】";
  preview.appendChild(activeTimeLabel);
  preview.appendChild(createBar([], activeHours, 24, "hour"));

  // 曜日
  const weekdayLabel = document.createElement("div");
  weekdayLabel.className = "label";
  weekdayLabel.textContent = "【活動曜日】";
  preview.appendChild(weekdayLabel);
  preview.appendChild(
    createBar(["月", "火", "水", "木", "金", "土", "日"], activeDays, 7, "day")
  );
}

// 入力イベント
[nameInput, twitchInput, youtubeInput, xInput, activeHoursInput].forEach((input) =>
  input.addEventListener("input", renderPreview)
);
weekdayInputs.forEach((input) => input.addEventListener("change", renderPreview));

// 出力ボタン
document.getElementById("generate-image")?.addEventListener("click", () => {
  html2canvas(preview).then((canvas) => {
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "profile.png";
    a.click();
  });
});

window.addEventListener("DOMContentLoaded", renderPreview);
