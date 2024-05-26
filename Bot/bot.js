import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN);
const web_link = "";

bot.start((ctx) => ctx.reply('Welcome'));
bot.launch();