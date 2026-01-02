// Thay đổi các giá trị dưới đây với thông tin của bạn
const TELEGRAM_BOT_TOKEN = `8226522512:AAGgpgreJuQu3uXjMuFeo6qcweKO1fs1Yvg`;  // Token của Bot Telegram
const CHAT_ID = `-4966250298`;  // Chat ID của bạn
const GOOGLE_SHEET_ID = `1XKIy8-_fWqfBlzhdu9vrC3yeHuzvqVgXiiDvmaXweKI`;  // ID của Google Sheet
const SHEET_NAME = `시트1`;  // Tên Tab Sheet trong Google Sheets

// Hàm xử lý khi nhận tin nhắn từ Telegram
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById(GOOGLE_SHEET_ID).getSheetByName(SHEET_NAME); // Lấy sheet theo tên
    const data = JSON.parse(e.postData.contents); // Phân tích dữ liệu từ Telegram
    
    const message = data.message.text || ''; // Lấy tin nhắn
    const sender = data.message.from.first_name + " " + data.message.from.last_name || 'Unknown'; // Lấy tên người gửi
    const chatId = data.message.chat.id; // Lấy chat ID của người gửi
    const timestamp = new Date();  // Lấy thời gian gửi tin nhắn
    
    // Ghi thông tin vào Google Sheets
    sheet.appendRow([timestamp, sender, message, chatId]);

    // Trả lời tin nhắn cho người gửi
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const payload = {
      chat_id: chatId,
      text: 'Cảm ơn bạn đã gửi tin nhắn!'
    };

    const options = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify(payload)
    };

    UrlFetchApp.fetch(url, options);  // Gửi tin nhắn trả lại Telegram
  } catch (error) {
    Logger.log('Error: ' + error.toString());
  }
}

// Đảm bảo webhook được thiết lập đúng
function setWebhook() {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook?url=${YOUR_WEB_APP_URL}`;
  const response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());  // In thông tin phản hồi từ Telegram
}
