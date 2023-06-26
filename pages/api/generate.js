import axios from 'axios';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
  try {
    const input = req.body.userInput;
    const basePromptPrefix = '';
    const data = {
      model: "gpt-3.5-turbo",
      prompt: `${basePromptPrefix}${input}`,
      temperature: 0.1,
      max_tokens: 2048
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      proxy: {
        host: "127.0.0.1",
        port: 15732, //here
        protocol: "http" // e.g., "http" or "https"
      }
    };
    //set http_proxy=http://127.0.0.1:15732&& set https_proxy=http://127.0.0.1:15732

    const response = await axios.post('https://api.openai.com/v1/chat/completions', data, config);
    const completion = response.data.choices.pop();

    res.status(200).json({ output: completion });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

export default generateAction;
