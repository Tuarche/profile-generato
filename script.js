// script.js

document.addEventListener("DOMContentLoaded", () => {
  const preview = document.getElementById("preview-content");

  const inputFields = [
    "name", "twitch-id", "youtube-id", "x-id", "active-hours"
  ];

  inputFields.forEach(id => {
    document.getElementById(id)?.addEventListener("input", updatePreview);
  });

  document.querySelectorAll(".weekdays input[type='checkbox']").forEach(cb => {
    cb.addEventListener("change", updatePreview);
  });

  document.querySelectorAll(".checkbox-group input[type='checkbox']").forEach(cb => {
    cb.addEventListener("change", updatePreview);
  });

  document.querySelectorAll("select").forEach(select => {
    select.addEventListener("change", updatePreview);
  });

  document.querySelectorAll(".bg-sample").forEach(div => {
    div.addEventListener("click", e => {
      const bg = div.dataset.bg;
      if (bg === "black") preview.style.background = "#000";
      else if (bg === "white") preview.style.background = "#fff";
      else preview.style.background = "linear-gradient(45deg, #ff8a00, #e52e71, #4a00e0)";
    });
  });

  document.getElementById("font-color")?.addEventListener("input", e => {
    preview.style.color = e.target.value;
  });

  document.querySelectorAll(".font-sample").forEach(div => {
    div.addEventListener("click", () => {
      preview.style.fontFamily = window.getComputedStyle(div).fontFamily;
    });
  });

  document.getElementById("icon")?.addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = document.createElement("img");
      img.src = reader.result;
      img.style.width = "80px";
      img.style.height = "80px";
      img.style.borderRadius = "50%";
      img.style.objectFit = "cover";
      img.style.marginBottom = "10px";
      preview.prepend(img);
    };
    reader.readAsDataURL(file);
  });

  document.getElementById("background-img")?.addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      preview.style.background = `url('${reader.result}') center/cover`;
    };
    reader.readAsDataURL(file);
  });

  function generateHourBar(hours) {
    const bar = Array(24).fill('□');
    const ranges = hours.split(/[、,\s]+/);
    ranges.forEach(r => {
      const [start, end] = r.split("〜").map(n => parseInt(n));
      if (!isNaN(start) && !isNaN(end)) {
        for (let i = start; i < end; i++) {
          if (i >= 0 && i < 24) bar[i] = '■';
        }
      }
    });
    return `${Array.from({length: 24}, (_, i) => i + 1).join(' ')}\n${bar.join(' ')}`;
  }

  function generateWeekBar(days) {
    const allDays = ['月', '火', '水', '木', '金', '土', '日'];
    const bar = allDays.map(day => days.includes(day) ? '■' : '□');
    return `${allDays.join(' ')}\n${bar.join(' ')}`;
  }

  function updatePreview() {
    const name = document.getElementById("name").value;
    const twitch = document.getElementById("twitch-id").value;
    const youtube = document.getElementById("youtube-id").value;
    const x = document.getElementById("x-id").value;
    const hours = document.getElementById("active-hours").value;
    const daysChecked = [...document.querySelectorAll(".weekdays input:checked")];
    const days = daysChecked.map(cb => cb.value);
    const styles = [...document.querySelectorAll(".checkbox-group input[type='checkbox']:checked")].map(cb => cb.value);
    const selects = [...document.querySelectorAll("select")].map(s => s.options[s.selectedIndex].text);

    const hourBar = generateHourBar(hours);
    const weekBar = generateWeekBar(days);

    preview.innerHTML = `
      <div><strong>${name}</strong></div>
      ${x ? `<div>X: ${x}</div>` : ""}
      ${twitch ? `<div>Twitch: ${twitch}</div>` : ""}
      ${youtube ? `<div>YouTube: ${youtube}</div>` : ""}

      <div class="section-title">活動時間</div>
      <div style="white-space: pre; font-family: monospace;">${hourBar}</div>

      <div class="section-title">活動曜日</div>
      <div style="white-space: pre; font-family: monospace;">${weekBar}</div>

      <div class="section-title">スタイル</div>
      <div>${styles.join("、")}</div>

      <div class="section-title">コメント</div>
      <div>${selects[0]}</div>

      <div class="section-title">ROM</div>
      <div>${selects[1]}</div>

      <div class="section-title">コラボ方針</div>
      <div>${selects[2]}</div>

      <div class="section-title">ひとこと</div>
      <div>${selects[3]}</div>
    `;
  }

  updatePreview();
});
