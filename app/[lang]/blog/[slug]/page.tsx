import { getDictionary } from "@/lib/i18n";
import articlesData from "@/data/articles.json";
import { getMarkdownContent } from "@/lib/mdUtils";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import TableOfContents from '@/components/TableOfContents';

export default async function ArticleDetailPage({
  params: { lang, slug },
}: {
  params: { lang: string; slug: string };
}) {
  const dict = await getDictionary(lang);
  const article = articlesData.find(article => article.slug === slug);

  if (!article) {
    return <div>文章未找到</div>;
  }

  const content = getMarkdownContent(article.slug);
  const readingTime = Math.ceil(content.split(' ').length / 200); // 估算阅读时间

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <div className="text-gray-600">
          <span>{new Date(article.date).toLocaleDateString()}</span>
          <span className="mx-2">•</span>
          <span>{readingTime} minutes read</span>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-1/4">
          <TableOfContents content={content} />
        </aside>
        
        <div className="md:w-3/4">
          <div className="prose prose-lg dark:prose-invert">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({node, ...props}) => <h2 id={props.children?.toString().toLowerCase().replace(/\s/g, '-') || undefined} {...props} />,
                h3: ({node, ...props}) => <h3 id={props.children?.toString().toLowerCase().replace(/\s/g, '-') || undefined} {...props} />,
                code({node, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '')
                  return match ? (
                    <SyntaxHighlighter
                      {...(props as any)}
                      style={tomorrow as any}
                      language={match[1]}
                      PreTag="div"
                      className="rounded-md"
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                }
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}