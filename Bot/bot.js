const { Telegraf } = require('telegraf');

const BOT_TOKEN = "7125399435:AAE_Z0cpNa6jzkT-onjuy1ZLXh4UhBWpO3Q";

const bot = new Telegraf(BOT_TOKEN);
const web_link = "https://saphirestreamapp.com/";

bot.start((ctx) =>
ctx.reply("Welcome ", {
        reply_markup: {
        keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
        },
    })
);

bot.launch();