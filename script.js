// script.js

const previewContent = document.getElementById('preview-content');

// 背景色とフォント選択のための初期設定（最初は白背景・サンセリフ）
document.querySelector('.bg-sample.bg-white').classList.add('selected');
document.querySelector('.font-sample[style*="sans-serif"]').classList.add('selected');

// 背景色選択イベント
document.querySelectorAll('.bg-sample').forEach(div => {
  div.addEventListener('click', () => {
    document.querySelectorAll('.bg-sample').forEach(d => d.classList.remove('selected'));
    div.classList.add('selected');
    updatePreview();
  });
});

// フォント選択イベント
document.querySelectorAll('.font-sample').forEach(div => {
  div.addEventListener('click', () => {
    document.querySelectorAll('.font-sample').forEach(d => d.classList.remove('selected'));
    div.classList.add('selected');
    updatePreview();
  });
});

// 「条件付き」入力欄の表示切り替え
document.getElementById('twitch-check').addEventListener('change', e => {
  document.getElementById('twitch-id').style.display = e.target.checked ? 'block' : 'none';
  updatePreview();
});
document.getElementById('youtube-check').addEventListener('change', e => {
  document.getElementById('youtube-id').style.display = e.target.checked ? 'block' : 'none';
  updatePreview();
});

// 初期は隠しておく
document.getElementById('twitch-id').style.display = 'none';
document.getElementById('youtube-id').style.display = 'none';

// 全入力にイベント登録する関数
function addEventListenerToSelector(selector, event, func) {
  document.querySelectorAll(selector).forEach(el => el.addEventListener(event, func));
}

// ここでリアルタイム更新関数登録
addEventListenerToSelector('#name, #twitch-id, #youtube-id, #x-id, #active-hours, .checkbox-group.limited input[type=text], input[placeholder*="ちるい"], input[placeholder*="世界観"], #font-color', 'input', updatePreview);
addEventListenerToSelector('.weekdays input[type=checkbox], .checkbox-group input[type=checkbox]', 'change', updatePreview);
addEventListenerToSelector('select', 'change', updatePreview);
document.getElementById('icon').addEventListener('change', updatePreview);
document.getElementById('font-color').addEventListener('input', updatePreview);
document.getElementById('twitch-check').addEventListener('change', updatePreview);
document.getElementById('youtube-check').addEventListener('change', updatePreview);
document.getElementById('background-img').addEventListener('change', updatePreview);

// 画像URL保持用（背景とアイコン）
let backgroundImgUrl = null;
let iconImgUrl = null;

// 背景画像アップロード
document.getElementById('background-img').addEventListener('change', e => {
  if (e.target.files && e.target.files[0]) {
    if(backgroundImgUrl) URL.revokeObjectURL(backgroundImgUrl);
    backgroundImgUrl = URL.createObjectURL(e.target.files[0]);
  } else {
    backgroundImgUrl = null;
  }
  updatePreview();
});

// アイコン画像アップロードはupdatePreview内でも処理するが、URLは保持したいのでここで作成
document.getElementById('icon').addEventListener('change', e => {
  if (e.target.files && e.target.files[0]) {
    if(iconImgUrl) URL.revokeObjectURL(iconImgUrl);
    iconImgUrl = URL.createObjectURL(e.target.files[0]);
  } else {
    iconImgUrl = null;
  }
  updatePreview();
});

// ここがメインのプレビュー更新関数
function updatePreview() {
  const name = document.getElementById('name').value.trim() || '名前を入力してください';

  const twitchCheck = document.getElementById('twitch-check');
  const twitchId = document.getElementById('twitch-id').value.trim();

  const youtubeCheck = document.getElementById('youtube-check');
  const youtubeId = document.getElementById('youtube-id').value.trim();

  const xId = document.getElementById('x-id').value.trim();
  const activeHours = document.getElementById('active-hours').value.trim();

  const weekdays = Array.from(document.querySelectorAll('.weekdays input[type=checkbox]'))
    .filter(cb => cb.checked).map(cb => cb.value).join(' ');

  // 配信スタイルは全部のcheckbox-groupから、limited(ゲームジャンル)は別扱い
  const streamStyleCheckboxes = Array.from(document.querySelectorAll('.checkbox-group input[type=checkbox]'))
    .filter(cb => !cb.closest('.limited')); // limited外のチェックボックス
  const streamStyles = streamStyleCheckboxes.filter(cb => cb.checked).map(cb => cb.value).join(', ');

  // ゲームジャンル（limited内）
  const genreCheckboxes = Array.from(document.querySelectorAll('.checkbox-group.limited input[type=checkbox]'));
  let gameGenres = genreCheckboxes.filter(cb => cb.checked).map(cb => cb.value);
  const otherGenreInput = document.querySelector('.checkbox-group.limited input[type=text]');
  if (otherGenreInput && otherGenreInput.value.trim() !== '') {
    gameGenres.push(otherGenreInput.value.trim());
  }
  const gameGenresText = gameGenres.join(', ');

  // プレイスタイルはlimited外のチェックボックスで除外済みなので今は別に取得する必要なし
  // なのでstreamStylesに含まれてるが、質問の構造上、分けて表示したければ調整してね

  // 特徴タグ
  const featureTagsInput = document.querySelector('label input[placeholder*="ちるい"]');
  const featureTags = featureTagsInput ? featureTagsInput.value.trim() : '';

  // コメント、ROM、コラボ方針 select
  const selects = document.querySelectorAll('select');
  const comment = selects[0] ? selects[0].value : '';
  const rom = selects[1] ? selects[1].value : '';
  const collab = selects[2] ? selects[2].value : '';

  // ひとこと
  const shortCommentInput = document.querySelector('input[placeholder*="世界観"]');
  const shortComment = shortCommentInput ? shortCommentInput.value.trim() : '';

  // 背景色（選択中のbg-sample）
  let bgColor = 'white';
  const selectedBg = document.querySelector('.bg-sample.selected');
  if(selectedBg) {
    const bg = selectedBg.getAttribute('data-bg');
    if(bg === 'black') bgColor = 'black';
    else if(bg === 'white') bgColor = 'white';
    else if(bg === 'gradient') bgColor = 'linear-gradient(45deg, #ff8a00, #e52e71, #4a00e0)';
  }

  // 文字色
  const fontColor = document.getElementById('font-color').value || '#000000';

  // フォント
  let fontFamily = 'sans-serif';
  const selectedFont = document.querySelector('.font-sample.selected');
  if(selectedFont) fontFamily = selectedFont.style.fontFamily || fontFamily;

  // アイコン画像
  let iconHTML = '';
  if(iconImgUrl){
    iconHTML = `<img src="${iconImgUrl}" alt="アイコン" style="width:100px; height:100px; border-radius: 50%; object-fit: cover;">`;
  }

  // 背景画像スタイル
  let bgImageStyle = '';
  if(backgroundImgUrl) {
    bgImageStyle = `background-image: url('${backgroundImgUrl}'); background-size: cover; background-position: center;`;
  }

  // まとめてプレビューHTML作成
  const html = `
    <div style="
      background: ${bgColor};
      ${bgImageStyle}
      color: ${fontColor};
      font-family: ${fontFamily};
      padding: 1em;
      border-radius: 20px;
      min-height: 300px;
      box-sizing: border-box;
      ">
      <div style="display: flex; align-items: center; gap: 1em;">
        ${iconHTML}
        <div>
          <h2 style="margin:0 0 0.5em 0;">${name}</h2>
          ${twitchCheck.checked && twitchId ? `<p>Twitch: ${twitchId}</p>` : ''}
          ${youtubeCheck.checked && youtubeId ? `<p>YouTube: ${youtubeId}</p>` : ''}
          ${xId ? `<p>X: ${xId}</p>` : ''}
        </div>
      </div>

      <p><strong>活動時間:</strong> ${activeHours || '-'}</p>
      <p><strong>活動曜日:</strong> ${weekdays || '-'}</p>
      <p><strong>
