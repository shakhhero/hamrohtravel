document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();

  var name = document.getElementById('name').value;
  var phone = document.getElementById('phone').value;
  var message = document.getElementById('message').value;

  var botToken = '7307334874:AAGH82bI1Nc0aBNFOiHz-3sOTfsXMrAnsLQ'; // Sizning Telegram bot to'keningiz
  var adminChatIds = ['5607700179', '905650268', '6464610612']; // Adminlar chat ID larining ro'yxati

  var telegramMessage = "Ism: " + name + "\nTelefon: " + phone + "\nXabar: " + message + "\nWeb sitedan xabar keldi";

  adminChatIds.forEach(chatId => {
      var url = 'https://api.telegram.org/bot' + botToken + '/sendMessage';

      fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              chat_id: chatId,
              text: telegramMessage
          })
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Xatolik yuz berdi: ' + response.status);
          }
          return response.json();
      })
      .then(data => {
          if (data.ok) {
              console.log('Xabaringiz muvaffaqiyatli yuborildi. Rahmat!');
              document.getElementById('contact-form').reset();
          } else {
              throw new Error('Telegram botga xabar yuborishda xatolik yuz berdi: ' + data.description);
          }
      })
      .catch(error => {
          console.error('Xatolik:', error);
          alert('Xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.');
      });
  });
});
