const express = require("express");
const { Telegraf, Markup } = require("telegraf");
const qrcode = require("qrcode");

const app = express();

const BOT_TOKEN = "7108200581:AAEYRrLV8WFmEoa8iZoN-33sfNLxZ0NlmaE";
const PORT = process.env.PORT || 3000;
const bot = new Telegraf(BOT_TOKEN);

bot.start(ctx => ctx.reply("Send me the link"));

bot.on('text', async(ctx) => {
    const text = ctx.message.text;
    if(text.startsWith('http')) {
        try {
            const qrText = await qrcode.toBuffer(text);
            await ctx.replyWithPhoto({source: qrText});
        } catch(error) {
            console.error(error);
            ctx.reply('Failed');
        }
    }
});

bot.launch();

app.listen(PORT, () => {
    console.log('Server is running')
});