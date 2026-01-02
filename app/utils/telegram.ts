// Thay đổi các giá trị dưới đây với thông tin của bạn
var TELEGRAM_BOT_TOKEN = '8226522512:AAGgpgreJuQu3uXjMuFeo6qcweKO1fs1Yvg';  // Token của Bot Telegram
var CHAT_ID = '-4966250298';  // Chat ID của bạn
var GOOGLE_SHEET_ID = '1XKIy8-_fWqfBlzhdu9vrC3yeHuzvqVgXiiDvmaXweKI';  // ID của Google Sheet
var SHEET_NAME = '시트1';  // Tên Tab Sheet trong Google Sheets

// Hàm xử lý khi nhận tin nhắn
function doPost(e) {
  var sheet = SpreadsheetApp.openById(GOOGLE_SHEET_ID).getSheetByName(SHEET_NAME); // Lấy sheet theo tên
  var data = JSON.parse(e.postData.contents); // Phân tích dữ liệu từ Telegram
  
  var message = data.message.text; // Lấy tin nhắn
  var sender = data.message.from.first_name + " " + data.message.from.last_name; // Lấy tên người gửi
  var chatId = data.message.chat.id; // Lấy chat ID của người gửi
  
  // Ghi thông tin vào Google Sheets
  sheet.appendRow([new Date(), sender, message, chatId]);
  
  // Trả lời tin nhắn cho người gửi
  var url = 'https://api.telegram.org/bot' + TELEGRAM_BOT_TOKEN + '/sendMessage';
  var payload = {
    chat_id: chatId,
    text: 'Cảm ơn bạn đã gửi tin nhắn!'
  };
  
  var options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  };
  
  UrlFetchApp.fetch(url, options);  // Gửi tin nhắn trả lại Telegram
}

// Đảm bảo webhook được thiết lập đúng
function setWebhook() {
  var url = 'https://api.telegram.org/bot' + TELEGRAM_BOT_TOKEN + '/setWebhook?url=' + YOUR_WEB_APP_URL;
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText());  // In thông tin phản hồi từ Telegram
}
