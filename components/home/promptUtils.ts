export function generatePrompt(
  character: string,
  headcanonType: string,
  style: string,
  length: string,
  description: string,
  languageName: string
): string {
  return `
Generate a character headcanon based on the following details:

Character: ${character}
Headcanon Type: ${headcanonType}
Style: ${style}
Length: ${length}
Description: ${description}
LanguageName: ${languageName}

Please ensure the headcanon is engaging and aligns with the provided details. The headcanon should be creative and provide new insights or perspectives about the character. If the description provides specific ideas or themes, incorporate them effectively into the headcanon. The tone and style should match the specified style (e.g., normal, funny, dark), and the length should be appropriate as per the given length. 

Length requirements:
- Very Short: A single complete sentence not exceeding 10 words.
- Short: Approximately 50 words.
- Medium: Approximately 100 words.
- Long: Approximately 200 words.

If the LanguageName is not English, please translate the entire content into ${languageName}.

Absolutely do not generate any content unrelated to the headcanon. The output should only contain the headcanon itself, without any additional information.

Example:
Given the character is Harry Potter, the headcanon type is Personality Traits, the style is Funny, the length is very short, and the description is "Imagine Harry having a quirky habit of talking to his owl, Hedwig, as if she were a human friend, sharing his daily thoughts and seeking advice.",the generated headcanon should be:
Harry often talks to Hedwig as if she were his therapist.

if the LanguageName is Chinese, you should translate the entire content into Chinese like this:
哈利经常像对待他的治疗师一样与海德薇交谈。

Use this format to generate a unique and satisfying headcanon for the user.
  `;
}
