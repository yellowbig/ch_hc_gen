"use client";
import { ALL_GENERATOR } from "@/config/generator";
import { Button, Input, Select, Radio, Textarea, RadioGroup } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [length, setLength] = useState("medium");
  const [quantity, setQuantity] = useState("3");
  const [isLoading, setIsLoading] = useState(false);
  const [generatedHeadcanon, setGeneratedHeadcanon] = useState("");
  const [presetCharacters, setPresetCharacters] = useState<string[]>([]);

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
      // 这里应该是调用后端API的逻辑
      // 暂时用模拟数据代替
      await new Promise(resolve => setTimeout(resolve, 1000));
      setGeneratedHeadcanon(`Generated headcanon for ${character}:\n1. They secretly love pineapple on pizza.\n2. They have a hidden talent for yodeling.\n3. They once accidentally dyed their hair neon green and pretended it was intentional.`);
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
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">Number of Headcanons</h3>
          <select
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="p-2 border rounded w-full"
          >
            <option value="1">1</option>
            <option value="3">3</option>
            <option value="5">5</option>
          </select>
        </div>
        
        <button
          onClick={handleGenerateHeadcanon}
          disabled={isLoading}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {isLoading ? "Generating..." : "Generate Headcanon"}
        </button>
      </div>
      
      {generatedHeadcanon && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Generated Headcanon</h3>
          <textarea
            value={generatedHeadcanon}
            readOnly
            rows={5}
            className="w-full p-2 border rounded"
          />
        </div>
      )}
    </section>
  );
}

