const { Telegraf } = require('telegraf');
const path = require('path');

const BOT_TOKEN = "";

const bot = new Telegraf(BOT_TOKEN);
const web_link = "https://saphirestreamapp.com/";

const imagePath = path.join(__dirname, './sapphire coin.png');

bot.start((ctx) => {
    const user = ctx.from;
    const username = user.username;

    ctx.replyWithPhoto(
        { source: imagePath }
    ).then(() => {
        ctx.replyWithHTML(
            `Welcome <b>${username}! </b>to Saphire Stream!\n\n` +
            "Tap on the coin and see your balance rise.\n\n" +
            "<b>SaphireStream</b> is a Decentralized Exchange on the Solana Blockchain. The biggest part of SaphireStream Token SAST distribution will occur among the players here.\n\n" +
            `Got friends, relatives, co-workers?
Bring them all into the game.
More buddies, more coins.`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "👋 Open Web App", web_app: { url: web_link } }],
                        [{ text: "💪 Join Our Community", url: 'https://saphirestreamapp.com/' }],
                        [{ text: "🗒️ Help", callback_data: 'help' }]
                    ]
                }
            }
        );
    });
});


// Handle the 'Help' button callback
bot.action('help', (ctx) => {
    ctx.replyWithPhoto(
        { source: imagePath }
    ).then(() => {
        ctx.replyWithHTML(
            `Tap to Earn:
SaphireStream is an addictive clicker game where you accumulate Shares by tapping the screen.
    
Leagues:
Climb the ranks by earning more Shares and outperforming others in the leagues.
    
Boosts:
Unlock boosts and complete tasks to maximize your Shares earnings.
    
Friends:
Invite others and both of you will receive bonuses. Assist your friends in advancing to higher leagues for bigger Shares rewards.
    
The Purpose:
Collect as many Shares as possible and exchange them for SAST, SaphireStream Token on Solana Blockchain.`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "🤝 Join Channel", url: 'https://saphirestreamapp.com/contact' }],
                        [{ text: "SaphireStream on X", url: 'https://saphirestreamapp.com/contact' }]
                    ]
                }
            }
        );
    });
});

bot.launch();


// cpanel terminal path
// source /home/saphqspe/nodevenv/bot.saphirestreamapp.com/20/bin/activate && cd /home/saphqspe/bot.saphirestreamapp.com 