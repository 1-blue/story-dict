"use client";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

const convertMarkdownToHtml = (mdText: string) => {
  return unified()
    .use(remarkParse) // Convert into markdown AST
    .use(remarkRehype) // Transform to HTML AST
    .use(rehypeSanitize) // Sanitize HTML input
    .use(rehypeStringify) // Convert AST into serialized HTML
    .processSync(mdText);
};

interface IProps {
  mdText: string;
}

const MarkdownViewer: React.FC<IProps> = ({ mdText }) => {
  return (
    <section
      className="markdown-body rounded-md border p-4"
      dangerouslySetInnerHTML={{
        __html: convertMarkdownToHtml(mdText),
      }}
    />
  );
};

export default MarkdownViewer;
