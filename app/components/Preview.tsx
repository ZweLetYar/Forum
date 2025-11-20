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

export default function Preview({ content }: PreviewProps) {
  // Parse <pre><code> blocks and highlight them
  const highlightedContent = content.replace(
    /<pre><code(?: class="language-(.*?)")?>([\s\S]*?)<\/code><\/pre>/gi,
    (_, lang, code) => {
      const decoded = code
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&");
      const highlighted = lang
        ? hljs.highlight(decoded, { language: lang }).value
        : hljs.highlightAuto(decoded).value;
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
