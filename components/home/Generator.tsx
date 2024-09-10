"use client";
import { ALL_GENERATOR } from "@/config/generator";
import { Button, Input, Select, Radio, Textarea, RadioGroup } from "@nextui-org/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";

const allPresetCharacters = [
  "Harry Potter", "Sherlock Holmes", "Hermione Granger", "Tony Stark", "Katniss Everdeen",
  "Luke Skywalker", "Elsa", "Batman", "Wonder Woman", "Frodo Baggins",
  "Daenerys Targaryen", "Spider-Man", "Lara Croft", "Indiana Jones", "Darth Vader"
];

export default function Generator({
  id,
  locale,
  langName,
}: {
  id: string;
  locale: any;
  langName: string;
}) {
  const GENERATOR = ALL_GENERATOR[`GENERATOR_${langName.toUpperCase()}`];

  const [character, setCharacter] = useState("");
  const [headcanonType, setHeadcanonType] = useState("personality");
  const [style, setStyle] = useState("normal");
  const [length, setLength] = useState("very_short");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedHeadcanon, setGeneratedHeadcanon] = useState("");
  const [presetCharacters, setPresetCharacters] = useState<string[]>([]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    shufflePresetCharacters();
  }, []);

  const shufflePresetCharacters = () => {
    const shuffled = [...allPresetCharacters].sort(() => 0.5 - Math.random());
    setPresetCharacters(shuffled.slice(0, 5));
  };

  async function handleGenerateHeadcanon() {
    if (!character.trim()) {
      toast.error("Please enter a character name or select one from the list.");
      return;
    }

    setIsLoading(true);
    try {
      const languageMap: { [key: string]: string } = {
        zh: "Chinese",
        en: "English",
        ja: "Japanese",
        ar: "Arabic",
        es: "Spanish",
        ru: "Russian",
        hi: "Hindi",
        // 其他语言代码和名称的映射
      };

      const languageName = languageMap[langName] || langName;

      const prompt = `
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

      const response = await fetch("/api/generateText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errmsg = await response.text();
        throw new Error(errmsg || response.statusText);
      }

      const data = await response.json();
      setGeneratedHeadcanon(data.output);
    } catch (error: any) {
      toast.error(`Failed to generate headcanon: ${error.message}`);
      console.error("Failed to generate headcanon:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="lg:max-w-4xl md:max-w-3xl w-[95%] px-4 sm:px-6 lg:px-8 pb-8 pt-8 md:pt-12 space-y-6">
      <h2 className="text-3xl font-bold text-center mb-6">Character Headcanon Generator</h2>
      
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Character Name</h3>
          <input
            type="text"
            placeholder="Enter a character name"
            value={character}
            onChange={(e) => setCharacter(e.target.value)}
            className="p-2 border rounded w-full"
          />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Preset Characters</h3>
          <div className="flex flex-wrap gap-2 mb-2">
            {presetCharacters.map((char) => (
              <Button
                key={char}
                auto
                onClick={() => setCharacter(char)}
                className={character === char ? "bg-blue-500 text-white" : "bg-gray-200"}
              >
                {char}
              </Button>
            ))}
          </div>
          <Button
            auto
            onClick={shufflePresetCharacters}
            className="mt-2 p-2"
            aria-label="Shuffle Characters"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 3 21 3 21 8"></polyline>
              <line x1="4" y1="20" x2="21" y2="3"></line>
              <polyline points="21 16 21 21 16 21"></polyline>
              <line x1="15" y1="15" x2="21" y2="21"></line>
              <line x1="4" y1="4" x2="9" y2="9"></line>
            </svg>
          </Button>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Headcanon Type</h3>
          <select
            value={headcanonType}
            onChange={(e) => setHeadcanonType(e.target.value)}
            className="p-2 border rounded w-full"
          >
            <option value="personality">Personality Traits</option>
            <option value="background">Background Story</option>
            <option value="relationships">Relationships</option>
            <option value="hobbies">Hobbies & Interests</option>
            <option value="secrets">Secrets</option>
          </select>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Style</h3>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="normal"
                checked={style === "normal"}
                onChange={(e) => setStyle(e.target.value)}
                className="mr-2"
              /> Normal
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="funny"
                checked={style === "funny"}
                onChange={(e) => setStyle(e.target.value)}
                className="mr-2"
              /> Funny
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="dark"
                checked={style === "dark"}
                onChange={(e) => setStyle(e.target.value)}
                className="mr-2"
              /> Dark
            </label>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Length</h3>
          <select
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="p-2 border rounded w-full"
          >
            <option value="very_short">Very Short</option>
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Description</h3>
          <textarea
            placeholder="Describe your ideas for the headcanon"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border rounded w-full"
            rows={3}
          />
        </div>
        
        <button
          onClick={handleGenerateHeadcanon}
          disabled={isLoading}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {isLoading ? "Generating..." : "Generate Headcanon"}
        </button>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Generated Headcanon</h3>
        <textarea
          value={generatedHeadcanon}
          readOnly
          rows={5}
          className="w-full p-2 border rounded"
        />
      </div>
    </section>
  );
}

