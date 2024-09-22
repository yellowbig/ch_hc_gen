import Link from "next/link";
import articlesData from "@/data/articles.json";

interface ArticleListProps {
  locale: any;
  lang: string;
}

export default function ArticleList({ locale, lang }: ArticleListProps) {
  return (
    <div className="space-y-8">
      {articlesData.map((article) => (
        <article key={article.id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105">
          <Link href={`/${lang}/blog/${article.slug}`}>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">{article.title}</h2>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <span>{new Date(article.date).toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span className="mx-2">•</span>
                <span>{locale.readMore || "Read more"}</span>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}