const { Telegraf } = require('telegraf');

const BOT_TOKEN = "";

const bot = new Telegraf(BOT_TOKEN);
const web_link = "https://saphirestreamapp.com/";

bot.start((ctx) =>
ctx.reply("Hello ", {
        reply_markup: {
        keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
        },
    })
);

bot.launch();