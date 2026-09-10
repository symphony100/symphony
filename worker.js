// インストール処理
self.addEventListener('install', (e) => {
  console.log('Worker installed');
});

// ネットワーク処理（オフライン対応の土台）
self.addEventListener('fetch', (e) => {
  // 通常の通信をそのまま通す
});
