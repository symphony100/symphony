const express = require('express');
const bodyParser = require('body-parser');
const { google } = require('googleapis');

const app = express();
app.use(bodyParser.json());

// Google Sheets APIの認証情報を読み込む
const credentials = require('./credentials.json'); // サービスアカウントJSON
const { client_email, private_key } = credentials;
const SPREADSHEET_ID = '1WxAzeuzhnlwxhQSN_PhG1Y9rpx5q86kyCYKE2m6BHcQ'; // スプレッドシートID

const auth = new google.auth.JWT(
  client_email,
  null,
  private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);
const sheets = google.sheets({ version: 'v4', auth });

app.post('/submit', async (req, res) => {
  const { gender, purpose, details, email } = req.body;

  try {
    // データをスプレッドシートに追加
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:D', // スプレッドシートの範囲
      valueInputOption: 'RAW',
      resource: {
        values: [[gender, purpose, details, email]],
      },
    });
    res.status(200).send('データがGoogle Sheetsに送信されました！');
  } catch (error) {
    console.error('エラー:', error);
    res.status(500).send('エラーが発生しました。');
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
