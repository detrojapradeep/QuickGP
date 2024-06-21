import TelegramBot from 'node-telegram-bot-api';
import axios from 'axios';

const token = 'YOUR_TELEGRAM_BOT_API_TOKENAPI_TOKEN'; 
const bot = new TelegramBot(token, { polling: true });

const webServiceUrl = 'http://localhost:5500'; // URL of your web service

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text.toLowerCase();

  if (text === 'show appointments') {
    axios.get(`${webServiceUrl}/appointments`)
      .then((response) => {
        const appointments = response.data;
        if (appointments.length === 0) {
          bot.sendMessage(chatId, 'No appointments available.');
          return;
        }

        const appointmentButtons = appointments.map((appointment, index) => ({
          text: `${appointment.date}, ${appointment.startTimeSlot}`,
          callback_data: `select_${index}`
        }));

        const inlineKeyboard = {
          reply_markup: {
            inline_keyboard: [appointmentButtons]
          }
        };

        bot.sendMessage(chatId, 'Available Appointments:', inlineKeyboard);
      })
      .catch((error) => {
        console.error('Error fetching appointments:', error);
        bot.sendMessage(chatId, 'Error fetching appointments.');
      });
  }
});

// Handle callback queries
bot.on('callback_query', (callbackQuery) => {
  const message = callbackQuery.message;
  const chatId = message.chat.id;
  const data = callbackQuery.data;

  if (data.startsWith('select_')) {
    const appointmentIndex = parseInt(data.split('_')[1]);

    axios.get(`${webServiceUrl}/appointments`)
      .then((response) => {
        const appointments = response.data;
        const selectedAppointment = appointments[appointmentIndex];

        bot.sendMessage(chatId, `You selected:\nHospital: ${selectedAppointment.hospitalName}\nDoctor: ${selectedAppointment.doctorName}\nDate: ${selectedAppointment.date}\nTime: ${selectedAppointment.startTimeSlot}`);
      })
      .catch((error) => {
        console.error('Error fetching selected appointment:', error);
        bot.sendMessage(chatId, 'Error fetching selected appointment.');
      });
  }
});

console.log('Bot is running...');
