"use client";
import { ALL_GENERATOR } from "@/config/generator";
import { Button, Input, Select, Radio, Textarea, RadioGroup } from "@nextui-org/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { generateHeadcanonPrompt, generateImagePrompt } from "./promptUtils";
import styles from "@/styles/components/Generator.module.css"; // Import custom CSS module

export default function Generator({
  id,
  locale,
  langName,
}: {
  id: string;
  locale: any;
  langName: string;
}) {
  console.log("locale: ", locale);

  const allPresetCharacters = locale.allPresetCharacters || [];
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
  const [imageStyle, setImageStyle] = useState("anime");

  const languageMap = {
    zh: "Chinese",
    en: "English",
    ja: "Japanese",
    ar: "Arabic",
    es: "Spanish",
    ru: "Russian",
    hi: "Hindi"
  };

  useEffect(() => {
    shufflePresetCharacters();
  }, []);

  const shufflePresetCharacters = () => {
    const shuffled = [...allPresetCharacters].sort(() => 0.5 - Math.random());
    setPresetCharacters(shuffled.slice(0, 5));
  };

  async function handleGenerateHeadcanon() {
    if (!character.trim()) {
      toast.error(locale.errorEnterCharacterName);
      return;
    }

    setIsGeneratingHeadcanon(true);
    try {
      const languageName = languageMap[langName as keyof typeof languageMap] || langName;

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
      toast.error(`${locale.errorGenerateHeadcanon}: ${error.message}`);
      console.error("Failed to generate headcanon:", error);
    } finally {
      setIsGeneratingHeadcanon(false);
    }
  }

  async function handleGenerateImage() {
    if (!generatedHeadcanon.trim()) {
      toast.error(locale.errorGenerateHeadcanonFirst);
      return;
    }

    setIsGeneratingImage(true);
    try {
      const prompt = generateImagePrompt(generatedHeadcanon, imageStyle);
      const response = await fetch("/api/generateImage", {
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
      
      if (data.id) {
        setGeneratedImageId(data.id);
        await fetchGeneratedImage(data.id);
      } else {
        throw new Error(locale.errorNoImageId);
      }
    } catch (error: any) {
      toast.error(`${locale.errorGenerateImage}: ${error.message}`);
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
        throw new Error(`${locale.errorNoImageUrl}: ${JSON.stringify(pictureData)}`);
      }
    } catch (error: any) {
      const errorMessage = `${locale.errorFetchImage}: ${error.message}`;
      toast.error(errorMessage);
      console.error(errorMessage);
    }
  }

  return (
    <section className={`lg:max-w-4xl md:max-w-3xl w-[95%] px-4 sm:px-6 lg:px-8 pb-8 pt-8 md:pt-12 space-y-6 ${styles.generatorSection}`}>
      <h2 className="text-3xl font-bold text-center mb-6">{locale.title}</h2>
      
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">{locale.characterName}</h3>
          <input
            type="text"
            placeholder={locale.characterNamePlaceholder}
            value={character}
            onChange={(e) => setCharacter(e.target.value)}
            className={`p-2 border rounded w-full ${styles.inputField}`}
          />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">{locale.presetCharacters}</h3>
          <div className="flex flex-wrap gap-2 mb-2">
            {presetCharacters.map((char) => (
              <Button
                key={char}
                onClick={() => setCharacter(char)}
                className={`${styles.presetButton} ${character === char ? styles.activePresetButton : ""}`}
              >
                {char}
              </Button>
            ))}
          </div>
          <Button
            onClick={shufflePresetCharacters}
            className={`mt-2 p-2 ${styles.shuffleButton}`}
            aria-label={locale.shuffleCharacters}
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
          <h3 className="text-lg font-semibold mb-2">{locale.headcanonType}</h3>
          <select
            value={headcanonType}
            onChange={(e) => setHeadcanonType(e.target.value)}
            className={`p-2 border rounded w-full ${styles.selectField}`}
          >
            <option value="personality">{locale.headcanonTypes.personality}</option>
            <option value="background">{locale.headcanonTypes.background}</option>
            <option value="relationships">{locale.headcanonTypes.relationships}</option>
            <option value="hobbies">{locale.headcanonTypes.hobbies}</option>
            <option value="secrets">{locale.headcanonTypes.secrets}</option>
          </select>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">{locale.style}</h3>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="normal"
                checked={style === "normal"}
                onChange={(e) => setStyle(e.target.value)}
                className={`mr-2 ${styles.radioButton}`}
              /> {locale.styles.normal}
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="funny"
                checked={style === "funny"}
                onChange={(e) => setStyle(e.target.value)}
                className={`mr-2 ${styles.radioButton}`}
              /> {locale.styles.funny}
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="dark"
                checked={style === "dark"}
                onChange={(e) => setStyle(e.target.value)}
                className={`mr-2 ${styles.radioButton}`}
              /> {locale.styles.dark}
            </label>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">{locale.length}</h3>
          <select
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className={`p-2 border rounded w-full ${styles.selectField}`}
          >
            <option value="very_short">{locale.lengths.very_short}</option>
            <option value="short">{locale.lengths.short}</option>
            <option value="medium">{locale.lengths.medium}</option>
            <option value="long">{locale.lengths.long}</option>
          </select>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-2">{locale.description}</h3>
          <textarea
            placeholder={locale.descriptionPlaceholder}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full p-2 border rounded ${styles.textareaField}`}
          />
        </div>

        <button
          onClick={handleGenerateHeadcanon}
          disabled={isGeneratingHeadcanon}
          className={`p-2 text-white rounded transition-colors mt-4 ${isGeneratingHeadcanon ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"} ${styles.generateButton}`}
        >
          {isGeneratingHeadcanon ? locale.generatingHeadcanon : locale.generateHeadcanon}
        </button>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">{locale.generatedHeadcanon}</h3>
          <Textarea
            value={generatedHeadcanon}
            readOnly
            rows={5}
            className={`w-full p-2 border rounded ${styles.textareaField}`}
          />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">{locale.imageStyle}</h3>
        <select
          value={imageStyle}
          onChange={(e) => setImageStyle(e.target.value)}
          className={`p-2 border rounded w-full ${styles.selectField}`}
        >
          <option value="anime">{locale.imageStyles.anime}</option>
          <option value="realistic">{locale.imageStyles.realistic}</option>
          <option value="cartoon">{locale.imageStyles.cartoon}</option>
        </select>

        <button
          onClick={handleGenerateImage}
          disabled={!generatedHeadcanon || isGeneratingImage}
          className={`p-2 text-white rounded transition-colors mt-4 ${!generatedHeadcanon ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"} ${styles.generateButton}`}
        >
          {isGeneratingImage ? locale.generatingImage : locale.generateImage}
        </button>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">{locale.generatedImage}</h3>
          {generatedImageUrl ? (
            <img src={generatedImageUrl} alt="Generated" className={`w-full border rounded ${styles.generatedImage}`} />
          ) : (
            <div className={`w-full h-64 border rounded flex items-center justify-center ${styles.noImageGenerated}`}>
              <span className="text-gray-500">{locale.noImageGenerated}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

