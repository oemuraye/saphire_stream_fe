const { Telegraf } = require('telegraf');
const path = require('path');

const BOT_TOKEN = "";

const bot = new Telegraf(BOT_TOKEN);
const web_link = "https://saphirestreamapp.com/";

const imagePath = path.join(__dirname, './sapphire coin.png');

bot.start((ctx) => {
    const user = ctx.from;
    const username = user.username;
    // console.log(user);

    ctx.replyWithPhoto(
        { source: imagePath }, 
        { caption: `<b>Welcome ${username}! to Saphire Stream!</b>\n\nExplore our web app for more features.`, parse_mode: 'HTML' }
    ).then(() => {
        // Send the text message with buttons after the image
        ctx.replyWithHTML(
            "<b>SaphireStream is a Decentralised Exchange on the Solana Blockchain. The biggest part of SaphireStream Token (SAST) distribution will occur among the players here</b>\n\nClick the buttons below to get started:",
            {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "Open Web App", web_app: { url: web_link } }],
                        [{ text: "Join Our Community", url: 'https://saphirestreamapp.com/contact' }],
                        [{ text: "Help", callback_data: 'help' }]
                    ]
                }
            }
        );
    });
});


// Handle the 'Help' button callback
bot.action('help', (ctx) => {
    ctx.reply('Here is some help text...');
});

bot.launch();


// cpanel terminal path
// source /home/saphqspe/nodevenv/bot.saphirestreamapp.com/20/bin/activate && cd /home/saphqspe/bot.saphirestreamapp.com 