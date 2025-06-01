// 名前・Xアカウント・画像反映
document.getElementById('displayName').addEventListener('input', () => {
  document.getElementById('namePreview').textContent = document.getElementById('displayName').value;
});

document.getElementById('xAccount').addEventListener('input', () => {
  document.getElementById('xPreview').textContent = document.getElementById('xAccount').value;
});

document.getElementById('iconUpload').addEventListener('change', (e) => {
  const reader = new FileReader();
  reader.onload = () => {
    document.getElementById('iconPreview').src = reader.result;
  };
  reader.readAsDataURL(e.target.files[0]);
});

// プラットフォームチェックボックス
const checkboxes = document.querySelectorAll('.platform');
checkboxes.forEach(cb => {
  cb.addEventListener('change', () => {
    const input = document.querySelector(`.platform-input[data-platform="${cb.value}"]`);
    input.style.display = cb.checked ? 'block' : 'none';
    updatePlatformPreview();
  });
});

document.querySelectorAll('.platform-input').forEach(input => {
  input.addEventListener('input', updatePlatformPreview);
});

function updatePlatformPreview() {
  const container = document.getElementById('platformPreview');
  container.innerHTML = '';
  checkboxes.forEach(cb => {
    if (cb.checked) {
      const input = document.querySelector(`.platform-input[data-platform="${cb.value}"]`);
      const div = document.createElement('div');
      div.textContent = `${cb.value}: ${input.value}`;
      container.appendChild(div);
    }
  });
}

// 画像生成
document.getElementById('generateBtn').addEventListener('click', () => {
  html2canvas(document.getElementById('previewCard')).then(canvas => {
    const link = document.getElementById('downloadLink');
    link.href = canvas.toDataURL();
    link.download = 'profile-card.png';
    link.textContent = '画像をダウンロード';
    link.style.display = 'block';
  });
});
