import GoogleAdBanner from "@/components/GoogleAdBanner";
import CTA from "@/components/home/CTA";
import FAQ from "@/components/home/FAQ";
import Feature from "@/components/home/Feature";
import Generator from "@/components/home/Generator";
import Hero from "@/components/home/Hero";
import ImageCarousel from "@/components/home/ImageCarousel";
import Pricing from "@/components/home/Pricing";
import ScrollingLogos from "@/components/home/ScrollingLogos";
import SocialProof from "@/components/home/SocialProof";
import { defaultLocale, getDictionary } from "@/lib/i18n";

export default async function LangHome({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const langName = lang !== "" ? lang : defaultLocale;

  console.log("lang: ", lang);
  console.log("langName: ", langName);

  const dict = await getDictionary(langName);

  return (
    <>
      {/* Hero Section */}
      <Hero locale={dict.Hero} CTALocale={dict.CTAButton} />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <Generator id="Generator" locale={dict.Generator} langName={langName} />
      </div>

      <section className="px-4 sm:px-2 lg:px-4 pb-8 pt-8 md:pt-12 space-y-6">
        <div className="flex justify-between items-center p-2">
          <div className="min-w-[200px] p-2">
            <GoogleAdBanner
              dataAdSlot="8169648646"
              dataAdFormat="auto"
              dataFullWidthResponsive={true}
            />
          </div>
          {/* <ImageCarousel />*/}{/*暂时注释*/}
          <div className="min-w-[200px] p-2">
            <GoogleAdBanner
              dataAdSlot="5833096089"
              dataAdFormat="auto"
              dataFullWidthResponsive={true}
            />
          </div>
        </div>
      </section>

      {/* <SocialProof locale={dict.SocialProof} />*/}{/*暂时注释*/}
      {/* display technology stack, partners, project honors, etc. */}
      {/* <ScrollingLogos />*/}{/*暂时注释*/}

      {/* USP (Unique Selling Proposition) */}
      <Feature id="Features" locale={dict.Feature} langName={langName} />

      {/* Testimonials / Wall of Love */}
      {/* <WallOfLove id="WallOfLove" locale={dict.WallOfLove} /> */}

      {/* Pricing */}
      {/* <Pricing id="Pricing" locale={dict.Pricing} langName={langName} />*/}{/*暂时注释*/}

      {/* FAQ (Frequently Asked Questions) */}
      <FAQ id="FAQ" locale={dict.FAQ} langName={langName} />

      {/* CTA (Call to Action) */}
      <CTA locale={dict.CTA} CTALocale={dict.CTAButton} />
    </>
  );
}

