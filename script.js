/* 全体レイアウト */
body {
  font-family: "Noto Sans JP", sans-serif;
  background-color: #f8f8f8;
  margin: 0;
  padding: 0;
  color: #222;
  display: flex;
  justify-content: center;
  min-height: 100vh;
}

#app-container {
  display: flex;
  max-width: 1100px;
  width: 100%;
  padding: 20px;
  gap: 20px;
  box-sizing: border-box;
}

/* 入力フォームセクション */
#input-section {
  flex: 1;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);
  max-height: 90vh;
  overflow-y: auto;
}

#input-section h1 {
  margin-top: 0;
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 20px;
}

/* フォーム要素 */
form label {
  display: block;
  margin-top: 15px;
  margin-bottom: 6px;
  font-weight: 600;
}

form label.required::before {
  content: "★";
  color: #d93f3f;
  margin-right: 4px;
  font-weight: 700;
}

form input[type="text"],
form input[type="file"],
form select,
form textarea {
  width: 100%;
  padding: 8px 10px;
  font-size: 15px;
  border: 1.8px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

form input[type="text"]:focus,
form select:focus,
form textarea:focus {
  outline: none;
  border-color: #6a9eff;
  box-shadow: 0 0 8px rgba(106, 158, 255, 0.4);
}

/* チェックボックスフィールドセット */
fieldset {
  border: 1.5px solid #ccc;
  border-radius: 8px;
  padding: 12px 15px;
  margin-top: 20px;
}

fieldset legend {
  font-weight: 700;
  font-size: 16px;
  padding: 0 5px;
}

fieldset label {
  display: block;
  font-weight: 500;
  margin-bottom: 8px;
  cursor: pointer;
}

fieldset input[type="checkbox"] {
  margin-right: 8px;
  cursor: pointer;
}

/* プレビューセクション */
#preview-section {
  width: 440px;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

#preview-section h2 {
  margin-top: 0;
  font-weight: 700;
  font-size: 22px;
  margin-bottom: 20px;
}

/* プレビュー画像表示領域 */
#profile-preview {
  width: 400px;
  height: 180px; /* 横長のイメージ */
  background-color: #ddd;
  border-radius: 24px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

/* 画像生成ボタン */
#generate-image-btn {
  margin-top: 18px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 700;
  border: none;
  background-color: #3b82f6;
  color: white;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

#generate-image-btn:hover {
  background-color: #2563eb;
}

/* スクロールバー調整 */
#input-section::-webkit-scrollbar {
  width: 8px;
}

#input-section::-webkit-scrollbar-thumb {
  background-color: #bbb;
  border-radius: 4px;
}

/* スクロールバー（Firefox用） */
#input-section {
  scrollbar-width: thin;
  scrollbar-color: #bbb transparent;
}
