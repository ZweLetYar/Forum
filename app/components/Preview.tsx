import "./editorStyle.css";

// import { highlightHTML } from "@/lib/highlightHTML";

// export default function Preview({ content }: { content: string }) {
//   const highlighted = highlightHTML(content);

//   return (
//     <div
//       className="tiptap prose prose-invert max-w-none"
//       dangerouslySetInnerHTML={{ __html: highlighted }}
//     />
//   );
// }

import React from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css"; // Syntax highlighting theme

interface PreviewProps {
  content: string;
}

function decodeEntities(input: string) {
  return input
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

export default function Preview({ content }: PreviewProps) {
  // First decode HTML entities so tags like <ul>/<ol> render correctly
  const decoded = decodeEntities(content);

  // Then highlight any <pre><code> blocks
  const highlightedContent = decoded.replace(
    /<pre><code(?: class="language-(.*?)")?>([\s\S]*?)<\/code><\/pre>/gi,
    (_, lang, code) => {
      const raw = decodeEntities(code);
      let highlighted = "";
      try {
        if (lang) {
          // safe check if language exists in hljs
          if ((hljs as any).getLanguage && (hljs as any).getLanguage(lang)) {
            highlighted = hljs.highlight(raw, { language: lang }).value;
          } else {
            highlighted = hljs.highlightAuto(raw).value;
          }
        } else {
          highlighted = hljs.highlightAuto(raw).value;
        }
      } catch (e) {
        highlighted = raw;
      }
      return `<pre class="hljs"><code>${highlighted}</code></pre>`;
    }
  );

  return (
    <div
      className="tiptap prose prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: highlightedContent }}
    />
  );
}
