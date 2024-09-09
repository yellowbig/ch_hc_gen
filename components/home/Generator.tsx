"use client";
import { ALL_GENERATOR } from "@/config/generator";
import { WAITLIST_FORM_LINK } from "@/config/tiers";
import { Button, Textarea } from "@nextui-org/react";
import { Tag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialTags: string[] = [];

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

  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleGenerateImage() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: content }),
      });

      if (!response.ok) {
        const errmsg = await response.text();
        throw new Error(errmsg || response.statusText);
      }

      const data = await response.json();
      router.push(`/picture/${data.id}`);
    } catch (error: any) {
      toast.error(`Failed to generate image: ${error.message}`);
      console.error("Failed to generate image:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="lg:max-w-4xl md:max-w-3xl w-[95%] px-4 sm:px-6 lg:px-8 pb-8 pt-8 md:pt-12 space-y-6 text-center">
      {/* <h2 className="text-5xl">{GENERATOR.title}</h2> */}
      <div className="flex justify-center w-full">
        <Button
          type="button"
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2"
          onClick={handleGenerateImage}
          disabled={isLoading}
        >
          <Tag />
          {isLoading
            ? GENERATOR.buttonTextGenerating
            : GENERATOR.buttonTextGenerate}
        </Button>
      </div>
      {/* <p>{GENERATOR.textFullFeature}</p> */}
      {/* {visible && (
        <p className="text-red-500">
          Coming soon! Please join our{" "}
          <a href={WAITLIST_FORM_LINK} className="underline">
            waitlist
          </a>
          !
        </p>
      )} */}
    </section>
  );
}

