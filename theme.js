// theme.js
(function() {
  // 保存されたテーマカラーを取得し、適用
  const savedThemeColor = localStorage.getItem("themeColor");
  const defaultColor = "#00AAFF"; // デフォルトのテーマカラー
  document.documentElement.style.setProperty("--header-bg-color", savedThemeColor || defaultColor);
  
  // news.htmlのカラーも反映させる
  const newsHeadings = document.querySelectorAll('h3');
  const newsDates = document.querySelectorAll('.date');
  
  // カラー変更を反映する関数
  function applyThemeColorToNews() {
    const themeColor = savedThemeColor || defaultColor;
    newsHeadings.forEach(heading => {
      heading.style.color = themeColor;
    });
    newsDates.forEach(date => {
      date.style.color = "#777"; // 日付の色は固定でいいと思うけど、調整も可能
    });
  }

  // テーマカラーを保存する関数
  window.setThemeColor = function(themeColor) {
    localStorage.setItem("themeColor", themeColor);
    document.documentElement.style.setProperty("--header-bg-color", themeColor);
    applyThemeColorToNews(); // newsの部分にも適用
  };

  // 初期読み込み時にも反映
  applyThemeColorToNews();
})();
