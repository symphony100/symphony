(function() {
  // 保存されたテーマカラーを取得し、適用
  const savedThemeColor = localStorage.getItem("themeColor");
  const defaultColor = "#00AAFF"; // デフォルトのテーマカラー
  const themeColor = savedThemeColor || defaultColor;
  
  // 初期表示時にテーマカラーを適用
  document.documentElement.style.setProperty("--header-bg-color", themeColor);

  // ヘッダーの背景色を変更
  const header = document.querySelector("header");
  if (header) {
    header.style.backgroundColor = themeColor;
  }

  // news.htmlのカラーも反映させる
  const newsHeadings = document.querySelectorAll('h3');
  const newsDates = document.querySelectorAll('.date');
  
  // カラー変更を反映する関数
  function applyThemeColorToNews() {
    newsHeadings.forEach(heading => {
      heading.style.color = themeColor;
    });
    newsDates.forEach(date => {
      date.style.color = "#777"; // 日付の色は固定
    });
    console.log("Theme applied to news");
  }

  // テーマカラーを保存する関数
  window.setThemeColor = function(newThemeColor) {
    // 保存してテーマを即座に適用
    localStorage.setItem("themeColor", newThemeColor);
    document.documentElement.style.setProperty("--header-bg-color", newThemeColor);
    
    // ヘッダーのカラーも変更
    if (header) {
      header.style.backgroundColor = newThemeColor;
    }

    // newsの部分にも適用
    applyThemeColorToNews();
    applyThemeColorToRefreshButton(newThemeColor); // リフレッシュボタンのカラーも変更
  };

  // 初期読み込み時に反映
  applyThemeColorToNews();
  applyThemeColorToRefreshButton(themeColor); // 初期状態でもリフレッシュボタンに適用

  // リフレッシュボタンのカラーを変更
  function applyThemeColorToRefreshButton(color) {
    const refreshButton = document.getElementById("refresh-button");
    if (refreshButton) {
      refreshButton.style.borderColor = color; // ボーダーの色
      const svgIcon = refreshButton.querySelector("svg");
      if (svgIcon) {
        svgIcon.style.stroke = color; // アイコンの色
      }
    }
  }
})();

(function () {
  const defaultColor = "#00AAFF";

  const savedThemeColor = localStorage.getItem("themeColor");
  const themeColor = savedThemeColor || defaultColor;

  document.documentElement.style.setProperty("--header-bg-color", themeColor);

  const newsTitle = document.getElementById("news-title");
  if (newsTitle) newsTitle.style.color = themeColor;

  // ⭐ h1, h2 全部に色を適用
  const h1Tags = document.querySelectorAll("h1");
  const h2Tags = document.querySelectorAll("h2");

  h1Tags.forEach(tag => {
    tag.style.color = themeColor;
  });
  h2Tags.forEach(tag => {
    tag.style.color = themeColor;
  });

  window.setThemeColor = function (newColor) {
    localStorage.setItem("themeColor", newColor);
    document.documentElement.style.setProperty("--header-bg-color", newColor);

    if (newsTitle) newsTitle.style.color = newColor;

    h1Tags.forEach(tag => {
      tag.style.color = newColor;
    });
    h2Tags.forEach(tag => {
      tag.style.color = newColor;
    });
  };
})();

(function() {
  // 保存されたテーマカラーを取得し、適用
  const savedThemeColor = localStorage.getItem("themeColor");
  const defaultColor = "#00AAFF"; // デフォルトのテーマカラー
  document.documentElement.style.setProperty("--header-bg-color", savedThemeColor || defaultColor);

  // リフレッシュボタンの動作
  const refreshButton = document.getElementById("refresh-button");
  if (refreshButton) {
    const svgIcon = refreshButton.querySelector("svg");
    
    refreshButton.addEventListener("click", () => {
      // ボタンを無効化
      refreshButton.style.pointerEvents = "none"; // クリック不可にする
      refreshButton.style.opacity = 0.5; // ボタンを半透明にする

      // アイコンの回転
      svgIcon.style.transition = "transform 1s ease";
      svgIcon.style.transform = "rotate(360deg)"; // 1秒で回転

      // 回転が終わった後にボタンを再度有効化
      setTimeout(() => {
        // 回転終了後の処理
        svgIcon.style.transform = "rotate(0deg)"; // アイコンの回転を元に戻す
        refreshButton.style.pointerEvents = "auto"; // クリック可能に戻す
        refreshButton.style.opacity = 1; // 半透明を元に戻す
      }, 1000); // 1秒後にボタンを再度有効にする
    });
  }
})();

