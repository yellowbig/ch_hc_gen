"use client";
import { ALL_GENERATOR } from "@/config/generator";
import { Button, Input, Select, Radio, Textarea, RadioGroup } from "@nextui-org/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { generateHeadcanonPrompt, generateImagePrompt } from "./promptUtils";
import styles from "@/styles/components/Generator.module.css"; // Import custom CSS module
import Tooltip from '@/components/common/Tooltip';

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
    <section className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">{locale.title}</h2>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className={`${styles.leftColumn} w-full md:w-5/12 md:flex-shrink-0`}>
          <div>
            <input
              type="text"
              placeholder={locale.characterNamePlaceholder || "Enter Character Name here..."}
              value={character}
              onChange={(e) => setCharacter(e.target.value)}
              className={`w-full p-2 border rounded ${styles.inputField}`}
            />
          </div>
          
          <div className={styles.presetButtonsContainer}>
            <div className={styles.presetButtonsGrid}>
              {presetCharacters.slice(0, 5).map((char) => (
                <button
                  key={char}
                  onClick={() => setCharacter(char)}
                  className={`${styles.presetButton} ${
                    character === char ? styles.activePresetButton : ""
                  }`}
                >
                  {char}
                </button>
              ))}
              <button
                onClick={shufflePresetCharacters}
                className={styles.shuffleButton}
                aria-label={locale.shuffleCharacters}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 3 21 3 21 8"></polyline>
                  <line x1="4" y1="20" x2="21" y2="3"></line>
                  <polyline points="21 16 21 21 16 21"></polyline>
                  <line x1="15" y1="15" x2="21" y2="21"></line>
                  <line x1="4" y1="4" x2="9" y2="9"></line>
                </svg>
              </button>
            </div>
            <div className={styles.divider}></div>
          </div>
          
          <div className={styles.formSection}>
            <label className={styles.formLabel}>
              <Tooltip text={locale.writingStyleTooltip}>
                <span className={styles.infoIcon}>i</span>
              </Tooltip>
              {locale.writingStyle}
            </label>
            <div className={styles.buttonGroup}>
              <button
                onClick={() => setStyle("normal")}
                className={`${styles.styleButton} ${style === "normal" ? styles.activeStyleButton : ""}`}
              >
                {locale.styles.normal}
              </button>
              <button
                onClick={() => setStyle("funny")}
                className={`${styles.styleButton} ${style === "funny" ? styles.activeStyleButton : ""}`}
              >
                {locale.styles.funny}
              </button>
              <button
                onClick={() => setStyle("dark")}
                className={`${styles.styleButton} ${style === "dark" ? styles.activeStyleButton : ""}`}
              >
                {locale.styles.dark}
              </button>
            </div>
          </div>
          
          <div className={styles.formSection}>
            <label className={styles.formLabel}>
              <Tooltip text={locale.headcanonTypeTooltip}>
                <span className={styles.infoIcon}>i</span>
              </Tooltip>
              {locale.headcanonType}
            </label>
            <select
              value={headcanonType}
              onChange={(e) => setHeadcanonType(e.target.value)}
              className={styles.selectField}
            >
              <option value="personality">{locale.headcanonTypes.personality}</option>
              <option value="background">{locale.headcanonTypes.background}</option>
              <option value="relationships">{locale.headcanonTypes.relationships}</option>
              <option value="hobbies">{locale.headcanonTypes.hobbies}</option>
              <option value="secrets">{locale.headcanonTypes.secrets}</option>
            </select>
          </div>
          
          <div className={styles.formSection}>
            <label className={styles.formLabel}>
              <Tooltip text={locale.lengthTooltip}>
                <span className={styles.infoIcon}>i</span>
              </Tooltip>
              {locale.length}
            </label>
            <select
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className={styles.selectField}
            >
              <option value="very_short">{locale.lengths.very_short}</option>
              <option value="short">{locale.lengths.short}</option>
              <option value="medium">{locale.lengths.medium}</option>
              <option value="long">{locale.lengths.long}</option>
            </select>
          </div>
          
          <div>
            <textarea
              placeholder={locale.descriptionPlaceholder}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full p-2 border rounded ${styles.textareaField}`}
            />
            <div className={styles.divider}></div>
          </div>

          <div className="flex justify-center"> {/* 新增的容器 div */}
            <button
              onClick={handleGenerateHeadcanon}
              disabled={isGeneratingHeadcanon}
              className={`w-auto px-4 p-2 text-white rounded ${styles.generateButton} ${
                isGeneratingHeadcanon ? "bg-gray-400" : ""
              }`}
            >
              {isGeneratingHeadcanon ? locale.generatingHeadcanon : locale.generateHeadcanon}
            </button>
          </div>

        </div>

        <div className="w-full md:flex-grow flex flex-col">
          <textarea
            value={generatedHeadcanon}
            readOnly
            placeholder={locale.generatedHeadcanonPlaceholder}
            className={`w-full p-2 border rounded ${styles.textareaField} flex-grow`}
            rows={20}
          />
        </div>
      </div>

      <div className="mt-8">
        <div className="flex items-center mb-4">
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <div className={styles.formSection}>
              <label className={styles.formLabel}>
                <Tooltip text={locale.imageStyleTooltip}>
                  <span className={styles.infoIcon}>i</span>
                </Tooltip>
                {locale.imageStyle}
              </label>
              <div className={styles.buttonGroup}>
                <button
                  onClick={() => setImageStyle("anime")}
                  className={`${styles.styleButton} ${imageStyle === "anime" ? styles.activeStyleButton : ""}`}
                >
                  {locale.imageStyles.anime}
                </button>
                <button
                  onClick={() => setImageStyle("realistic")}
                  className={`${styles.styleButton} ${imageStyle === "realistic" ? styles.activeStyleButton : ""}`}
                >
                  {locale.imageStyles.realistic}
                </button>
                <button
                  onClick={() => setImageStyle("cartoon")}
                  className={`${styles.styleButton} ${imageStyle === "cartoon" ? styles.activeStyleButton : ""}`}
                >
                  {locale.imageStyles.cartoon}
                </button>
              </div>
            </div>

            <button
              onClick={handleGenerateImage}
              disabled={!generatedHeadcanon || isGeneratingImage}
              className={`w-full mt-4 px-4 p-2 text-white rounded ${styles.generateButton} ${
                !generatedHeadcanon || isGeneratingImage ? "bg-gray-400" : ""
              }`}
            >
              {isGeneratingImage ? locale.generatingImage : locale.generateImage}
            </button>
          </div>

          <div className="w-full md:w-1/2">
            <div className="border rounded p-4 h-full flex items-center justify-center">
              {generatedImageUrl ? (
                <img src={generatedImageUrl} alt="Generated Image" className="max-w-full max-h-full object-contain" />
              ) : (
                <div className="text-center text-gray-500">{locale.generatedImagePlaceholder}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

