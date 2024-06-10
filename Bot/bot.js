const { Telegraf } = require('telegraf');
const path = require('path');

const BOT_TOKEN = "";

const bot = new Telegraf(BOT_TOKEN);
const web_link = "https://saphirestreamapp.com/";

const logoImagePath = path.join(__dirname, './sapphire coin.png');
const helpImagePath = path.join(__dirname, './helpImage.jpg');


const setMenuButton = async (personalizedWebLink) => {

    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setChatMenuButton`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            menu_button: {
                type: "web_app",
                text: "👋 Play",
                web_app: {
                    url: personalizedWebLink
                }
            }
        })
    });
    const data = await response.json();
    console.log(data);
};



bot.start(async (ctx) => {
    const user = ctx.from;
    const ref = ctx.startPayload || '';

    const personalizedWebLink = `${web_link}?user=${encodeURIComponent(JSON.stringify(user))}&start_param=${encodeURIComponent(ref)}`;
    
    await setMenuButton(personalizedWebLink);

    const welcomeMessage = 
        `Welcome <b>${username}! </b>to Saphire Stream!\n\n` +
        "Tap on the coin and see your balance rise.\n\n" +
        "<b>SaphireStream</b> is a Decentralized Exchange on the Solana Blockchain. The biggest part of SaphireStream Token SAST distribution will occur among the players here.\n\n" +
        `Got friends, relatives, co-workers?\nBring them all into the game.\nMore buddies, more coins.`;

    ctx.replyWithPhoto(
        { source: logoImagePath },
        {
            caption: welcomeMessage,
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [
                    [{ text: "👋 Play App", web_app: { url: personalizedWebLink } }],
                    [{ text: "💪 Join Our Community", url: 'https://t.me/SapphireStream' }],
                    [{ text: "🗒️ Help", callback_data: 'help' }]
                ],
            }
        }
    );
});


// Handle the 'Help' button callback
bot.action('help', (ctx) => {
    ctx.replyWithPhoto(
        { source: helpImagePath }
    ).then(() => {
        ctx.replyWithHTML(
            `Tap to Earn:\nSaphireStream is an addictive clicker game where you accumulate Shares by tapping the screen.\n\n` +
            `Leagues:\nClimb the ranks by earning more Shares and outperforming others in the leagues.\n\n` +
            `Boosts:\nUnlock boosts and complete tasks to maximize your Shares earnings.\n\n` +
            `Friends:\nInvite others and both of you will receive bonuses. Assist your friends in advancing to higher leagues for bigger Shares rewards.\n\n` +
            `The Purpose:\nCollect as many Shares as possible and exchange them for SAST, SaphireStream Token on Solana Blockchain.`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "🤝 Join Channel", url: 'https://t.me/SapphireStream' }],
                        [{ text: "SaphireStream on X", url: 'https://twitter.com/sapphirestream_' }]
                    ]
                }
            }
        );
    });
});

bot.launch();


// cpanel terminal path
// source /home/saphqspe/nodevenv/bot.saphirestreamapp.com/20/bin/activate && cd /home/saphqspe/bot.saphirestreamapp.com 