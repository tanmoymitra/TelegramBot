require('dotenv').config()
const apiaiApp = require('apiai')(process.env.API_AI_KEY)


const TOKEN = process.env.TELEGRAM_TOKEN || 'YOUR_TELEGRAM_BOT_TOKEN';
const TelegramBot = require('node-telegram-bot-api');
const url = process.env.APP_URL || 'https://<app-name>.herokuapp.com:443';
const bot = new TelegramBot(TOKEN, {polling: true});

bot.setWebHook(`${url}/bot${TOKEN}`);

bot.on('message', function onMessage(msg) {
    console.log("User: "+msg.text);
    let apiai = apiaiApp.textRequest(msg.text, {
        sessionId: 'tabby_cat' // use any arbitrary id
    });
    apiai.on('response', (response) => {
        let aiText = response.result.fulfillment.speech || "Sorry! Can you please say it again";
        console.log("Bot: "+aiText);
        //bot.sendMessage(msg.chat.id, aiText);
        bot.sendMessage(msg.chat.id,"<a href=\"http://www.zoodel.com/en\">Zoodel</a>",{parse_mode : "HTML"} );
    });
    apiai.on('error', (error) => {
        console.log(error);
    });

    apiai.end();
});
