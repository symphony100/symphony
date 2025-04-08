// theme.js
(function() {
  // 保存されたテーマカラーを取得し、適用
  const savedThemeColor = localStorage.getItem("themeColor");
  const defaultColor = "#00AAFF"; // デフォルトのテーマカラー
  const themeColor = savedThemeColor || defaultColor;
  
  document.documentElement.style.setProperty("--header-bg-color", themeColor);

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
    localStorage.setItem("themeColor", newThemeColor);
    document.documentElement.style.setProperty("--header-bg-color", newThemeColor);
    applyThemeColorToNews(); // newsの部分にも適用
    applyThemeColorToRefreshButton(newThemeColor); // リフレッシュボタンのカラーも変更
  };

  // 初期読み込み時にも反映
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
