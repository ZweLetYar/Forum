"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Heading from "@tiptap/extension-heading";

const Editor = () => {
  const editor = useEditor({
    editorProps: {
      //the heading is actually changed . but doesn't change in UI
      attributes: {
        // because I don't have tailwind.config file
        class: "prose prose-invert",
      },
    },
    extensions: [
      StarterKit.configure({
        heading: false, // 🚨 disable built-in heading
      }),
      Bold,
      Italic,
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content: "<p>Hello World! 🌎️</p>",
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  });

  return (
    <>
      <div className="flex items-start  gap-2">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`border border-sky-400 px-3 py-1 rounded-lg ${
            editor?.isActive("bold") ? "text-sky-400" : ""
          }`}
        >
          B
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`border border-sky-400 px-3 py-1 rounded-lg ${
            editor?.isActive("italic") ? "text-sky-400" : ""
          }`}
        >
          <i>I</i>
        </button>
        <button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`border border-sky-400 px-3 py-1 rounded-lg ${
            editor?.isActive("heading", { level: 1 }) ? "text-sky-400" : ""
          }`}
        >
          H1
        </button>
        <button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`border border-sky-400 px-3 py-1 rounded-lg ${
            editor?.isActive("heading", { level: 2 }) ? "text-sky-400" : ""
          }`}
        >
          H2
        </button>
        <button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`border border-sky-400 px-3 py-1 rounded-lg ${
            editor?.isActive("heading", { level: 3 }) ? "text-sky-400" : ""
          }`}
        >
          H3
        </button>
      </div>
      <EditorContent editor={editor} />
    </>
  );
};

export default Editor;
