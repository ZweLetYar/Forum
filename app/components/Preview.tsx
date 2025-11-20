import "./editorStyle.css";
export default function Preview({ content }: { content: string }) {
  return (
    <div
      className=" tiptap
        prose prose-invert max-w-none
        
      "
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
