"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams, useRouter } from "next/navigation";

import { defaultLocale, localeNames } from "@/lib/i18n";

export const LangSwitcher = () => {
  const params = useParams();
  const lang = Array.isArray(params.lang) ? params.lang[0] : params.lang;
  const langName = lang !== "" ? lang : defaultLocale;
  const router = useRouter();

  const handleSwitchLanguage = (value: string) => {
    if (value === defaultLocale) {
      console.log("defaultLocale, router.push /");
      router.push("/");
      return;
    }
    router.push(value);
  };

  return (
    <Select value={langName} onValueChange={handleSwitchLanguage}>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(localeNames).map((key: string) => {
          const name = localeNames[key];
          return (
            <SelectItem className="cursor-pointer" key={key} value={key}>
              {name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

