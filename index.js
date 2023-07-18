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

// Menghasilkan dan menampilkan QR code untuk menghubungkan WhatsApp Web
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client siap!");
});

client.on("message", async (message) => {
  if (message.body.includes("/ask")) {
    const pesan = message.body.replace("/ask", "").trim();
    const chatResponse = await getChatCompletion(pesan);
    await message.reply(chatResponse);
  } else {
    message.reply("masukkan /ask sebelum pertanayaan");
  }
});

client.initialize();

const getChatCompletion = async (pesan) => {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: pesan }],
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
};
