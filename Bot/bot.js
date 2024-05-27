const { Telegraf } = require('telegraf');

const BOT_TOKEN = "";

const bot = new Telegraf(BOT_TOKEN);
const web_link = "https://saphirestreamapp.com/";

bot.start((ctx) => {
    ctx.replyWithHTML(
        "<b>Welcome to Saphire Stream!</b>\n\n" +
        "Explore our <a href='https://saphirestreamapp.com/'>web app</a> for more features.\n" +
        "Click the buttons below to get started:",
        {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Open Web App", web_app: { url: web_link } }],
                    [{ text: "Help", callback_data: 'help' }],
                    [{ text: "Contact Us", url: 'https://saphirestreamapp.com/contact' }]
                ]
            }
        }
    );
});

// Handle the 'Help' button callback
bot.action('help', (ctx) => {
    ctx.reply('Here is some help text...');
});

bot.launch();