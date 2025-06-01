// DOM Elements取得
const form = document.getElementById("profile-form");
const iconUpload = document.getElementById("icon-upload");
const iconShapeSelect = document.getElementById("icon-shape");
const platformCheckboxes = [...document.querySelectorAll('input[name="platform"]')];
const platformOtherContainer = document.getElementById("platform-other-container");
const platformOtherText = document.getElementById("platform-other-text");
const platformAccountsContainer = document.getElementById("platform-accounts-container");
const previewDiv = document.getElementById("profile-preview");
const generateBtn = document.getElementById("generate-image-btn");

let uploadedIconImage = null;

// アイコン画像をFileReaderで読み込む
iconUpload.addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) {
    uploadedIconImage = null;
    updatePreview();
    return;
  }
  const reader = new FileReader();
  reader.onload = function (ev) {
    uploadedIconImage = new Image();
    uploadedIconImage.src = ev.target.result;
    uploadedIconImage.onload = () => {
      updatePreview();
    };
  };
  reader.readAsDataURL(file);
});

// 配信プラットフォームのチェックボックス制御
function updatePlatformInputs() {
  // その他テキスト欄表示制御
  const otherChecked = platformCheckboxes.find(chk => chk.value === "Other").checked;
  platformOtherContainer.style.display = otherChecked ? "block" : "none";

  // プラットフォーム別アカウント入力欄更新
  platformAccountsContainer.innerHTML = ""; // 一旦クリア

  platformCheckboxes.forEach(chk => {
    if (chk.checked) {
      if (chk.value === "Other") {
        // その他は自由入力名＋アカウント欄
        const platformName = platformOtherText.value.trim() || "その他";
        const wrapper = document.createElement("div");
        wrapper.classList.add("platform-account-wrapper");
        wrapper.innerHTML = `
          <label>${platformName}アカウント名</label>
          <input type="text" name="platformAccount_${platformName}" placeholder="例: your_account" maxlength="30" />
        `;
        platformAccountsContainer.appendChild(wrapper);
      } else {
        const wrapper = document.createElement("div");
        wrapper.classList.add("platform-account-wrapper");
        wrapper.innerHTML = `
          <label>${chk.value}アカウント名</label>
          <input type="text" name="platformAccount_${chk.value}" placeholder="例: your_account" maxlength="30" />
        `;
        platformAccountsContainer.appendChild(wrapper);
      }
    }
  });
}

// チェックボックス変化で更新
platformCheckboxes.forEach(chk => {
  chk.addEventListener("change", () => {
    updatePlatformInputs();
    updatePreview();
  });
});
platformOtherText.addEventListener("input", () => {
  updatePlatformInputs();
  updatePreview();
});

// アイコン形状やフォーム変更でプレビュー更新
iconShapeSelect.addEventListener("change", updatePreview);
form.addEventListener("input", updatePreview);

// 初期化
updatePlatformInputs();

// プレビュー描画(canvas利用)
function updatePreview() {
  // canvas生成（または再利用）
  let canvas = previewDiv.querySelector("canvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 180;
    previewDiv.appendChild(canvas);
  }
  const ctx = canvas.getContext("2d");

  // 背景クリア＆ベース色
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#f0f0f0";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // --- 左上：アイコン画像（大きめ） ---
  const iconSize = 100;
  const iconX = 20;
  const iconY = (canvas.height - iconSize) / 2;

  ctx.save();
  // 形状マスク
  const shape = iconShapeSelect.value;

  ctx.beginPath();
  if (shape === "circle") {
    ctx.arc(iconX + iconSize/2, iconY + iconSize/2, iconSize/2, 0, Math.PI * 2);
  } else if (shape === "star") {
    drawStar(ctx, iconX + iconSize/2, iconY + iconSize/2, iconSize/2, 5);
  } else if (shape === "rounded-square") {
    const r = 15;
    roundRect(ctx, iconX, iconY, iconSize, iconSize, r);
  } else {
    ctx.rect(iconX, iconY, iconSize, iconSize);
  }
  ctx.clip();

  if (uploadedIconImage) {
    ctx.drawImage(uploadedIconImage, iconX, iconY, iconSize, iconSize);
  } else {
    // 代替アイコン
    ctx.fillStyle = "#bbb";
    ctx.fillRect(iconX, iconY, iconSize, iconSize);
    ctx.fillStyle = "#666";
    ctx.font = "bold 60px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("?", iconX + iconSize/2, iconY + iconSize/2);
  }
  ctx.restore();

  // --- アイコンの右横：名前・Xアカウント・配信プラットフォーム ---
  const name = form.name.value.trim() || "名前なし";
  const xAccount = form.xAccount.value.trim() || "@なし";

  ctx.fillStyle = "#222";
  ctx.font = "bold 24px sans-serif";
  ctx.textBaseline = "top";
  ctx.textAlign = "left";
  ctx.fillText(name, iconX + iconSize + 20, iconY);

  ctx.font = "16px sans-serif";
  ctx.fillStyle = "#555";
  ctx.fillText(xAccount, iconX + iconSize + 20, iconY + 34);

  // 配信プラットフォーム（選択＋入力名）
  const selectedPlatforms = platformCheckboxes.filter(chk => chk.checked);
  let platY = iconY + 60;
  ctx.font = "14px sans-serif";
  ctx.fillStyle = "#444";

  selectedPlatforms.forEach(chk => {
    let platName = chk.value;
    if (platName === "Other") {
      platName = platformOtherText.value.trim() || "その他";
    }
    const inputName = form[`platformAccount_${platName}`]?.value || "";
    const text = `${platName}: ${inputName || "(未入力)"}`;
    ctx.fillText(text, iconX + iconSize + 20, platY);
    platY += 20;
  });

  // TODO: 以下 活動時間～ひとことまで縦並びで描画する処理を追加予定
}

// 角丸長方形描画関数
function roundRect(ctx, x, y, width, height, radius) {
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
}

// 星形描画関数
function drawStar(ctx, cx, cy, outerRadius, points) {
  const step = Math.PI / points;
  ctx.moveTo(cx, cy - outerRadius);
  for(let i=0; i < 2 * points; i++) {
    const r = (i % 2 === 0) ? outerRadius : outerRadius / 2.5;
    const a = i * step - Math.PI / 2;
    ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
  }
  ctx.closePath();
}

// 画像生成ボタン押下時処理（今はダミー）
generateBtn.addEventListener("click", () => {
  alert("画像生成機能はまだ実装中です。もう少しお待ちください！");
});

// 初回プレビュー描画
updatePreview();
