document.addEventListener('DOMContentLoaded', () => {
  // --- DOM取得 ---
  const iconInput = document.getElementById('iconInput');
  const iconPreview = document.getElementById('profileIconPreview');

  const nameInput = document.getElementById('nameInput');
  const xAccountInput = document.getElementById('xAccountInput');

  const platformCheckboxes = document.querySelectorAll('.platform-checkbox');
  const platformAccountsContainer = document.getElementById('platformAccountsContainer');
  const platformPreviewContainer = document.getElementById('platformPreviewContainer');

  const activityStartInput = document.getElementById('activityStart');
  const activityEndInput = document.getElementById('activityEnd');
  const activityBarPreview = document.getElementById('previewActivityBar');

  const weekdayCheckboxes = document.querySelectorAll('.weekday-checkbox');
  const weekdayBarPreview = document.getElementById('previewWeekdayBar');

  const streamingStylesCheckboxes = document.querySelectorAll('.streaming-style-checkbox');
  const gameGenresCheckboxes = document.querySelectorAll('.game-genre-checkbox');
  const playStyleRadios = document.querySelectorAll('input[name="playStyle"]');

  const featuresInputs = [
    document.getElementById('feature1'),
    document.getElementById('feature2'),
    document.getElementById('feature3')
  ];

  const commentInput = document.getElementById('commentInput');

  const romRadios = document.querySelectorAll('input[name="rom"]');

  const collabRadios = document.querySelectorAll('input[name="collab"]');

  const backgroundSelect = document.getElementById('backgroundSelect');
  const backgroundImageInput = document.getElementById('backgroundImageInput');
  const fontSelect = document.getElementById('fontSelect');
  const textColorInput = document.getElementById('textColorInput');

  const previewCard = document.getElementById('previewCard');

  // --- プラットフォームアイコンの画像URLマップ ---
  const platformIcons = {
    twitch: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Twitch_logo_2019.svg/120px-Twitch_logo_2019.svg.png',
    youtube: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/YouTube_icon_%282013-2017%29.png/120px-YouTube_icon_%282013-2017%29.png',
  };

  // --- 関数：画像アップロードプレビュー ---
  iconInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      iconPreview.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

  // --- 関数：名前反映 ---
  nameInput.addEventListener('input', () => {
    document.getElementById('previewName').textContent = nameInput.value || '名前未設定';
  });

  // --- 関数：Xアカウント反映 ---
  xAccountInput.addEventListener('input', () => {
    const xElem = document.getElementById('previewXAccount');
    xElem.textContent = xAccountInput.value ? `@${xAccountInput.value}` : '';
  });

  // --- プラットフォーム選択制御 ---
  function updatePlatformAccountsInputs() {
    platformAccountsContainer.innerHTML = '';
    platformPreviewContainer.innerHTML = '';
    platformCheckboxes.forEach(checkbox => {
      if (checkbox.checked) {
        // 入力欄追加
        const inputDiv = document.createElement('div');
        inputDiv.className = 'platform-account-input-item';
        inputDiv.innerHTML = `
          <label for="${checkbox.id}-account">アカウント名（${checkbox.dataset.name}）</label>
          <input type="text" id="${checkbox.id}-account" class="platform-account-input" data-platform="${checkbox.id}" placeholder="${checkbox.dataset.name}のアカウント名" />
        `;
        platformAccountsContainer.appendChild(inputDiv);

        // プレビューも初期空で追加
        const previewDiv = document.createElement('div');
        previewDiv.className = 'account-item';
        previewDiv.id = `preview-${checkbox.id}-account`;
        const iconUrl = platformIcons[checkbox.id] || '';
        previewDiv.innerHTML = iconUrl ? `<img src="${iconUrl}" alt="${checkbox.dataset.name}ロゴ" /> <span></span>` : `<span>${checkbox.dataset.name}</span><span></span>`;
        platformPreviewContainer.appendChild(previewDiv);

        // 入力欄に連動するイベントを付ける
        const inputElem = inputDiv.querySelector('input');
        const previewSpan = previewDiv.querySelector('span:nth-child(2)');
        inputElem.addEventListener('input', () => {
          previewSpan.textContent = inputElem.value.trim() ? inputElem.value.trim() : '';
        });
      }
    });
  }

  platformCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      updatePlatformAccountsInputs();
    });
  });
  updatePlatformAccountsInputs(); // 初期化

  // --- 活動時間バー更新 ---
  function updateActivityBar() {
    const start = parseInt(activityStartInput.value);
    const end = parseInt(activityEndInput.value);
    if (isNaN(start) || isNaN(end)) return;

    activityBarPreview.innerHTML = '';
    for (let i = 0; i < 24; i++) {
      const div = document.createElement('div');
      div.textContent = i + 1;
      if (start <= end) {
        if (i >= start && i < end) {
          div.classList.add('active');
        }
      } else {
        // 24時をまたぐ場合（例：22〜2）
        if (i >= start || i < end) {
          div.classList.add('active');
        }
      }
      activityBarPreview.appendChild(div);
    }
  }
  activityStartInput.addEventListener('input', updateActivityBar);
  activityEndInput.addEventListener('input', updateActivityBar);
  updateActivityBar();

  // --- 曜日バー更新 ---
  function updateWeekdayBar() {
    weekdayBarPreview.innerHTML = '';
    weekdayCheckboxes.forEach(cb => {
      const div = document.createElement('div');
      div.textContent = cb.dataset.day;
      if (cb.checked) div.classList.add('active');
      weekdayBarPreview.appendChild(div);
    });
  }
  weekdayCheckboxes.forEach(cb => {
    cb.addEventListener('change', updateWeekdayBar);
  });
  updateWeekdayBar();

  // --- 配信スタイル反映 ---
  const previewStreamingStyle = document.getElementById('previewStreamingStyle');
  function updateStreamingStyle() {
    const selected = [];
    streamingStylesCheckboxes.forEach(cb => {
      if (cb.checked) selected.push(cb.value);
    });
    previewStreamingStyle.textContent = selected.join(' / ') || '未設定';
  }
  streamingStylesCheckboxes.forEach(cb => {
    cb.addEventListener('change', updateStreamingStyle);
  });
  updateStreamingStyle();

  // --- ゲームジャンル反映 ---
  const previewGameGenre = document.getElementById('previewGameGenre');
  function updateGameGenre() {
    const selected = [];
    gameGenresCheckboxes.forEach(cb => {
      if (cb.checked) selected.push(cb.value);
    });
    previewGameGenre.textContent = selected.join(' / ') || '未設定';
  }
  gameGenresCheckboxes.forEach(cb => {
    cb.addEventListener('change', updateGameGenre);
  });
  updateGameGenre();

  // --- プレイスタイル反映 ---
  const previewPlayStyle = document.getElementById('previewPlayStyle');
  function updatePlayStyle() {
    let selected = '';
    playStyleRadios.forEach(radio => {
      if (radio.checked) selected = radio.value;
    });
    previewPlayStyle.textContent = selected || '未設定';
  }
  playStyleRadios.forEach(radio => {
    radio.addEventListener('change', updatePlayStyle);
  });
  updatePlayStyle();

  // --- 特徴タグ反映 ---
  const previewFeatures = document.getElementById('previewFeatures');
  function updateFeatures() {
    const vals = featuresInputs.map(input => input.value.trim()).filter(v => v);
    previewFeatures.textContent = vals.length ? vals.join(' / ') : 'なし';
  }
  featuresInputs.forEach(input => {
    input.addEventListener('input', () => {
      // 入力3つまでの制限はHTML maxlengthで済ませてるのでOK
      updateFeatures();
    });
  });
  updateFeatures();

  // --- コメント反映 ---
  const previewComment = document.getElementById('previewComment');
  commentInput.addEventListener('input', () => {
    previewComment.textContent = commentInput.value.trim() || 'なし';
  });

  // --- ROM反映 ---
  const previewRom = document.getElementById('previewRom');
  function updateRom() {
    let val = '';
    romRadios.forEach(radio => {
      if (radio.checked) val = radio.value;
    });
    previewRom.textContent = val || '未設定';
  }
  romRadios.forEach(radio => {
    radio.addEventListener('change', updateRom);
  });
  updateRom();

  // --- コラボ方針反映 ---
  const previewCollab = document.getElementById('previewCollab');
  function updateCollab() {
    let val = '';
    collabRadios.forEach(radio => {
      if (radio.checked) val = radio.value;
    });
    previewCollab.textContent = val || '未設定';
  }
  collabRadios.forEach(radio => {
    radio.addEventListener('change', updateCollab);
  });
  updateCollab();

  // --- 背景色反映 ---
  function updateBackground() {
    const val = backgroundSelect.value;
    previewCard.style.background = val;
  }
  backgroundSelect.addEventListener('change', updateBackground);
  updateBackground();

  // --- フォント反映 ---
  function updateFont() {
    const val = fontSelect.value;
    previewCard.style.fontFamily = val;
  }
  fontSelect.addEventListener('change', updateFont);
  updateFont();

  // --- 文字色反映 ---
  function updateTextColor() {
    const val = textColorInput.value;
    previewCard.style.color = val;
  }
  textColorInput.addEventListener('input', updateTextColor);
  updateTextColor();


  // 画像生成ボタン押下時の処理
document.getElementById('generateImageBtn').addEventListener('click', () => {
  const canvas = document.getElementById('profileCanvas');
  const ctx = canvas.getContext('2d');

  // キャンバス初期化
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 背景（白グラデーション）
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, '#ffffff');
  gradient.addColorStop(1, '#e0e0e0');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // アイコン（左上） - もしアップロード画像があれば描画、なければ丸いダミー
  const iconImg = document.getElementById('iconPreview'); // 事前にプレビュー表示してるimgタグ想定
  const iconSize = 120;
  if(iconImg && iconImg.src) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(20 + iconSize*0.5, 20);
    ctx.arc(20 + iconSize*0.5, 20 + iconSize*0.5, iconSize/2, 0, Math.PI*2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(iconImg, 20, 20, iconSize, iconSize);
    ctx.restore();
  } else {
    // ダミー丸アイコン
    ctx.fillStyle = '#aaa';
    ctx.beginPath();
    ctx.arc(20 + iconSize/2, 20 + iconSize/2, iconSize/2, 0, Math.PI*2);
    ctx.fill();
  }

  // 名前（アイコン右横）
  const name = document.getElementById('nameInput').value || '名前未設定';
  ctx.fillStyle = '#222';
  ctx.font = 'bold 28px Arial';
  ctx.fillText(name, 160, 60);

  // Xアカウント（その下）
  const xAccount = document.getElementById('xAccountInput').value || '';
  if(xAccount) {
    ctx.font = '18px Arial';
    ctx.fillStyle = '#555';
    ctx.fillText(`X: @${xAccount}`, 160, 95);
  }

  // 配信プラットフォーム（その下）
  const twitchChecked = document.getElementById('platformTwitch').checked;
  const youtubeChecked = document.getElementById('platformYouTube').checked;
  let platformText = '';
  if(twitchChecked) platformText += 'Twitch ';
  if(youtubeChecked) platformText += 'YouTube ';
  ctx.font = '16px Arial';
  ctx.fillStyle = '#444';
  ctx.fillText(platformText.trim(), 160, 120);

  // ひとこと（下部）
  const catchphrase = document.getElementById('profileCatchphrase').textContent || '';
  ctx.font = 'italic 20px Arial';
  ctx.fillStyle = '#666';
  ctx.fillText(catchphrase, 20, canvas.height - 40);

  // Canvasを表示
  canvas.style.display = 'block';
});

});
