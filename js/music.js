const audio = document.getElementById('myAudio');

  // 第一次使用者互動（點擊、觸碰、按鍵、滾輪等）就開聲
  // 用 'click' 就夠了，大多數情況下也會跟隨 touchstart 等
  const unlockAudio = () => {
    if (audio.muted) {
      audio.muted = false;
      audio.volume = 0.4;          // 建議預設音量不要太大，0.3~0.6 比較舒服
      // audio.play().catch(() => {});  // 通常不用再 play，因為 muted 狀態下已經在播
      console.log('背景音樂聲音已開啟');
    }
  };

  // 只監聽一次，避免重複觸發
  document.addEventListener('click', unlockAudio, { once: true });

  // 額外支援手機觸碰（有些 iOS/Android 情況 click 不夠靈敏）
  document.addEventListener('touchstart', unlockAudio, { once: true });
