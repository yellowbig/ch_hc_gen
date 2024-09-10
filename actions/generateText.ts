
import Replicate from "replicate";

export async function generateText(userId: string, userPrompt: string) {
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  const prompt = `Generate a headcanon for the character with the following details:
  ${userPrompt}`;

  const input = {
    top_p: 0.9,
    prompt: prompt,
    min_tokens: 0,
    temperature: 0.6,
    prompt_template: "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\nYou are a helpful assistant<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
    presence_penalty: 1.15
  };
  let output = "";
  for await (const event of replicate.stream("meta/meta-llama-3-8b-instruct", { input })) {
    output += event;
  }

  return output;
}