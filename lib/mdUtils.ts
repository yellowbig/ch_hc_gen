import fs from 'fs';
import path from 'path';

export function getMarkdownContent(slug: string): string {
  const filePath = path.join(process.cwd(), 'data', 'md', `${slug}.md`);
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return fileContent;
  } catch (error) {
    console.error(`Error reading markdown file for slug ${slug}:`, error);
    return '';
  }
}
