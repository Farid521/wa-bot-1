const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const client = new Client();
const openai = new OpenAIApi(
  new Configuration({
    apiKey: "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",
  })
);

new Client({
  puppeteer: {
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", (message) => {
  console.log(message);
  if (message.body === "!ping") {
    message.reply("pong");
  }
});

client.initialize();
