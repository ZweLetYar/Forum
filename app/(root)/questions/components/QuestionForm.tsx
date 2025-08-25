"use client";
import Editor from "@/app/components/Editor";
import React, { useState } from "react";

function QuestionForm() {
  const [value, setValue] = useState("");
  return (
    <>
      {value}
      <Editor
        label="Any Question?"
        value={value}
        onChange={(v) => setValue(v)}
      />
    </>
  );
}

export default QuestionForm;
