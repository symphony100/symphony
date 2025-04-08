// theme.js
(function() {
  // 保存されたテーマカラーを取得し、適用
  const savedThemeColor = localStorage.getItem("themeColor");
  const defaultColor = "#008DBD"; // デフォルトのテーマカラー
  document.documentElement.style.setProperty("--header-bg-color", savedThemeColor || defaultColor);
  document.documentElement.style.setProperty("--news-title-color", themeColor); 

  // テーマカラーを保存する関数
  window.setThemeColor = function(themeColor) {
    localStorage.setItem("themeColor", themeColor);
    document.documentElement.style.setProperty("--header-bg-color", themeColor);
    document.documentElement.style.setProperty("--news-title-color", themeColor); 
  };
})();
