require('dotenv').config()
const apiaiApp = require('apiai')(process.env.API_AI_KEY)


const TOKEN = process.env.TELEGRAM_TOKEN || 'YOUR_TELEGRAM_BOT_TOKEN';
const TelegramBot = require('node-telegram-bot-api');
const url = process.env.APP_URL || 'https://<app-name>.herokuapp.com:443';
const bot = new TelegramBot(TOKEN, {polling: true});

bot.setWebHook(`${url}/bot${TOKEN}`);
bot.onText(/\/start/, (msg) => {    
    bot.sendMessage(msg.chat.id, "Welcome "+msg.chat.first_name);        
});
bot.on('message', function onMessage(msg) {
    //bot.sendMessage(msg.chat.id, 'Welcome '+msg.chat.first_name+' '+msg.chat.last_name);
    let apiai = apiaiApp.textRequest(msg.text, {
        sessionId: 'tabby_cat' // use any arbitrary id
    });
    apiai.on('response', (response) => {
        let aiText = response.result.fulfillment.speech;
        bot.sendMessage(msg.chat.id, aiText);
    });
    apiai.on('error', (error) => {
        console.log(error);
    });

    apiai.end();
});
