import React from 'react';

interface TableOfContentsProps {
  content: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  // 简单的实现，提取所有的 h2 和 h3 标题
  const headings = content.match(/^##\s.+$|^###\s.+$/gm) || [];

  return (
    <nav className="table-of-contents">
      <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
      <ul className="space-y-2">
        {headings.map((heading, index) => {
          const level = heading.startsWith('###') ? 3 : 2;
          const title = heading.replace(/^#+\s/, '');
          return (
            <li key={index} className={`pl-${(level - 2) * 4}`}>
              <a href={`#${title.toLowerCase().replace(/\s/g, '-')}`} className="hover:underline">
                {title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default TableOfContents;
