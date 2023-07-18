const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const openai = new OpenAIApi(
  new Configuration({
    apiKey: "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"
  })
);

openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: "Hello chat gpt"}]    
}).then(res => {
    console.log(res.data.choices[0].message.content)
})
