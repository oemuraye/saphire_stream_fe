const { Telegraf } = require('telegraf');



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