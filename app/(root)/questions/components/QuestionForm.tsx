"use client";
import Button from "@/app/components/Button";
import Editor from "@/app/components/Editor";
import Input from "@/app/components/input";
import TagCard from "@/app/components/TagCard";
import React, { useState } from "react";

function QuestionForm() {
  const [value, setValue] = useState("");
  const [tags, setTags] = useState<string[]>(["react", "vue"]);
  const [newTags, setNewTags] = useState("");
  const handleEnterPress = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !tags.includes(newTags)) {
      setTags([...tags, newTags]);
      setNewTags("");
    } else if (e.key === "Enter") {
      alert("Tag already exists");
      setNewTags("");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3 m-3 p-2">
        <h1 className="text-lg font-bold">Ask A New Question</h1>
        <Input
          type="text"
          label="Title"
          text="Describe your question title in short way"
        />

        <Editor
          label="Any Question?"
          value={value}
          onChange={(v) => setValue(v)}
        />
        <Input
          value={newTags}
          onChange={(e) => setNewTags(e.target.value)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            handleEnterPress(e as unknown as KeyboardEvent)
          }
          type="text"
          label="Tags"
          text="Please press enter to add a new tag"
        />
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <TagCard key={i} href="#">
              {tag}
            </TagCard>
          ))}
        </div>

        <Button variant="normal">Create</Button>
      </div>
    </>
  );
}

export default QuestionForm;
