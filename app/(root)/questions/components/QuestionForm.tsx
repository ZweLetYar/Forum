"use client";
import Button from "@/app/components/Button";
import Editor from "@/app/components/Editor";
import Input from "@/app/components/input";
import React, { useState } from "react";

function QuestionForm() {
  const [value, setValue] = useState("");
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
          type="text"
          label="Tags"
          text="Please press enter to add a new tag"
        />
        <Button variant="normal">Create</Button>
      </div>
    </>
  );
}

export default QuestionForm;
