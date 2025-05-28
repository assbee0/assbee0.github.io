window.addEventListener('DOMContentLoaded', () => {
  const imgSwitcher = document.getElementById('js_imgSwitcher');
  if (imgSwitcher) {
    const mainImg = document.querySelector('.img-switcher-main img');
    const thumbBtns = document.querySelectorAll('.img-switcher-btn');
    
    // 初期設定（最初のサムネイルをメイン画像にセット）
    mainImg.src = thumbBtns[0].querySelector('img').src;
    mainImg.alt = thumbBtns[0].querySelector('img').alt;
    thumbBtns[0].classList.add('is_active');

    // サムネイルを選択した時の処理
    thumbBtns.forEach(thumbBtn => {
      thumbBtn.addEventListener('click', switchImage);
      thumbBtn.addEventListener('focus', switchImage);
    });

    /**
     * メイン画像を選択したサムネイル画像に切り替える関数
     * - メイン画像をフェードアウト
     * - 0.1秒待機してsrcとaltを変更
     * - メイン画像をフェードイン
     * - is_activeクラスを更新
     */
    async function switchImage() {
      const img = this.querySelector('img');

      // メイン画像と同じサムネイルが選択された場合は何もしない
      if (mainImg.getAttribute('src') === img.getAttribute('src')) return;

      // メイン画像をフェードアウト
      mainImg.style.opacity = 0;

      // 0.1秒待機
      await new Promise(resolve => setTimeout(resolve, 100));

      // メイン画像のsrcとaltを更新
      mainImg.src = img.src;
      mainImg.alt = img.alt;

      // メイン画像をフェードイン
      mainImg.style.opacity = 1;

      // サムネイルのis_activeクラスを更新
      thumbBtns.forEach(thumbBtn => thumbBtn.classList.remove('is_active'));
      this.classList.add('is_active');
    }
  }
});