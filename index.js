const qrcode = require("qrcode-terminal");

const { Client } = require("whatsapp-web.js");
const client = new Client();

new Client({
  puppeteer: {
    args: ["--no-sandbox"],
  },
});

Client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

Client.on("ready", () => {
  console.log("Client is ready!");
});

Client.on("message", (message) => {
  console.log(message);
  if (message.body === "!ping") {
    message.reply("pong");
  }
});

Client.initialize();
