"use client";
import { ALL_GENERATOR } from "@/config/generator";
import { Button, Input, Select, Radio, Textarea, RadioGroup } from "@nextui-org/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { generateHeadcanonPrompt } from "./promptUtils";

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
  const [isGeneratingHeadcanon, setIsGeneratingHeadcanon] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedHeadcanon, setGeneratedHeadcanon] = useState("");
  const [presetCharacters, setPresetCharacters] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [generatedImageId, setGeneratedImageId] = useState("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");

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

    setIsGeneratingHeadcanon(true);
    try {
      // Replace this hardcoded headcanon with the actual generated headcanon
      // setGeneratedHeadcanon("Darth Vader secretly enjoys stargazing on quiet nights.");

      // Original code for generating headcanon
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

      const prompt = generateHeadcanonPrompt(character, headcanonType, style, length, description, languageName);

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
      setIsGeneratingHeadcanon(false);
    }
  }

  async function handleGenerateImage() {
    if (!generatedHeadcanon.trim()) {
      toast.error("Please generate a headcanon first.");
      return;
    }

    setIsGeneratingImage(true);
    try {
      const response = await fetch("/api/generateImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: generatedHeadcanon }),
      });

      if (!response.ok) {
        const errmsg = await response.text();
        throw new Error(errmsg || response.statusText);
      }

      const data = await response.json();
      
      if (data.id) {
        setGeneratedImageId(data.id);
        await fetchGeneratedImage(data.id);
      } else {
        throw new Error('No image ID received');
      }
    } catch (error: any) {
      toast.error(`Failed to generate image: ${error.message}`);
      console.error("Failed to generate image:", error);
    } finally {
      setIsGeneratingImage(false);
    }
  }

  async function fetchGeneratedImage(imageId: string) {
    try {
      console.log("Fetching image with ID:", imageId);
      const response = await fetch(`/api/picture?id=${imageId}`);
      console.log("Fetch response status:", response.status);
      
      const responseText = await response.text();
      console.log("Raw response:", responseText);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, body: ${responseText}`);
      }

      let pictureData;
      try {
        pictureData = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Failed to parse JSON:", parseError);
        throw new Error(`Invalid JSON in response: ${responseText}`);
      }

      console.log("Parsed picture data:", pictureData);

      if (pictureData.url) {
        setGeneratedImageUrl(pictureData.url);
      } else {
        throw new Error(`No image URL in the response: ${JSON.stringify(pictureData)}`);
      }
    } catch (error: any) {
      const errorMessage = `Failed to fetch generated image: ${error.message}`;
      toast.error(errorMessage);
      console.error(errorMessage);
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
                onClick={() => setCharacter(char)}
                className={character === char ? "bg-blue-500 text-white" : "bg-gray-200"}
              >
                {char}
              </Button>
            ))}
          </div>
          <Button
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
          disabled={isGeneratingHeadcanon}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {isGeneratingHeadcanon ? "Generating Headcanon..." : "Generate Headcanon"}
        </button>
        
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Generated Headcanon</h3>
          <textarea
            value={generatedHeadcanon}
            readOnly
            rows={5}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          onClick={handleGenerateImage}
          disabled={!generatedHeadcanon || isGeneratingImage}
          className={`p-2 text-white rounded transition-colors mt-4 ${!generatedHeadcanon ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"}`}
        >
          {isGeneratingImage ? "Generating Image..." : "Generate Image"}
        </button>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Generated Image</h3>
          {generatedImageUrl ? (
            <img src={generatedImageUrl} alt="Generated" className="w-full border rounded" />
          ) : (
            <div className="w-full h-64 border rounded flex items-center justify-center">
              <span className="text-gray-500">No image generated yet</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

