
// import Replicate from "replicate";

// export async function generateText(userId: string, userPrompt: string) {
//   const replicate = new Replicate({
//     auth: process.env.REPLICATE_API_TOKEN,
//   });

//   const prompt = `Generate a headcanon for the character with the following details:
//   ${userPrompt}`;

//   const input = {
//     top_p: 0.9,
//     prompt: prompt,
//     min_tokens: 0,
//     temperature: 0.6,
//     prompt_template: "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\nYou are a helpful assistant<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
//     presence_penalty: 1.15
//   };
//   let output = "";
//   for await (const event of replicate.stream("meta/meta-llama-3-8b-instruct", { input })) {
//     output += event;
//   }

//   return output;
// }

import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.YOUR_SITE_URL, // Optional, for including your app on openrouter.ai rankings.
    "X-Title": process.env.YOUR_SITE_NAME, // Optional. Shows in rankings on openrouter.ai.
  }
});

export async function generateText(userId: string, userPrompt: string) {
  const prompt = `Generate a headcanon for the character with the following details:
  ${userPrompt}`;

  const completion = await openai.chat.completions.create({
    model: "google/gemini-pro-1.5-exp",
    messages: [
      { role: "user", content: prompt }
    ],
  });

  const output = completion.choices[0].message.content;
  return output;
}