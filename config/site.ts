import { SiteConfig } from "@/types/siteConfig";
import { BsGithub, BsTwitterX } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

const OPEN_SOURCE_URL = "https://github.com/yellowbig/ai-anime-art-generator";

const baseSiteConfig = {
  name: "AI Character Headcanon Generator",
  description:
    "Use our AI-powered Character Headcanon Generator to create unique and engaging character backstories. Perfect for fanfiction writers, roleplayers, and character enthusiasts.",
  url: "https://aianimeartgenerator.com",
  ogImage: "",
  metadataBase: "/",
  keywords: [
  ],
  authors: [
    {
      name: "yellowbig",
      url: "https://github.com/yellowbig",
      twitter: "https://twitter.com/yellowbig1",
    },
  ],
  creator: "@yellowbig",
  openSourceURL: OPEN_SOURCE_URL,
  themeColors: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  nextThemeColor: "light", // next-theme option: system | dark | light
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
  headerLinks: [
    // { name: "repo", href: OPEN_SOURCE_URL, icon: BsGithub },
    // {
    //   name: "twitter",
    //   href: "https://twitter.com/yellowbig",
    //   icon: BsTwitterX,
    // },
  ],
  footerLinks: [
    { name: "email", href: "mailto:yellowbigdev@outlook.com", icon: MdEmail },
    // {
    //   name: "twitter",
    //   href: "https://twitter.com/yellowbig1",
    //   icon: BsTwitterX,
    // },
    // { name: "github", href: "https://github.com/yellowbig/", icon: BsGithub },
  ],
  footerProducts: [],
};

export const siteConfig: SiteConfig = {
  ...baseSiteConfig,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseSiteConfig.url,
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    siteName: baseSiteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    images: [`${baseSiteConfig.url}/og.png`],
    creator: baseSiteConfig.creator,
  },
};

