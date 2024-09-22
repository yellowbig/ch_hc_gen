import { getDictionary } from "@/lib/i18n";
import ArticleList from "@/components/blog/ArticleList";

export default async function BlogPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white">{dict.Articles?.title || "Articles"}</h1>
      <div className="max-w-3xl mx-auto">
        <ArticleList locale={dict.Articles || {}} lang={lang} />
      </div>
    </div>
  );
}