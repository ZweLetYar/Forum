"use client";
import Button from "@/app/components/Button";
import Editor from "@/app/components/Editor";
import Input from "@/app/components/input";
import RemovableTagCard from "@/app/components/RemovableTagCard";
import TagCard from "@/app/components/TagCard";
import { IQuestion } from "@/database/question.model";
import { QuestionCreate } from "@/lib/actions/QuestionCreate.action";
import { QuestionEdit } from "@/lib/actions/QuestionEdit.action";
import ROUTES from "@/routes";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { Bounce, toast } from "react-toastify";

function QuestionForm({
  question,
  isEdit = false,
}: {
  question: IQuestion;
  isEdit: boolean;
}) {
  const [title, setTitle] = useState(question?.title ?? "");
  const [content, setContent] = useState(question?.content ?? "");
  const [tags, setTags] = useState<string[]>(
    question?.tags.map((tag) => tag.name) ?? []
  );
  const [newTags, setNewTags] = useState("");

  let router = useRouter();

  //---------------for tags input----------------
  const handleEnterPress = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !tags.includes(newTags)) {
      setTags([...tags, newTags]);
      setNewTags("");
    } else if (e.key === "Enter") {
      alert("Tag already exists");
      setNewTags("");
    }
  };

  //----------------for question create----------------
  const handleQuestionCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isEdit && question) {
        const result = await QuestionEdit({
          id: question._id as string,
          title,
          content,
          tags,
        });

        if (result.success && result.data) {
          toast.success("Question edited successfully", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });

          router.push(ROUTES.QUESTION_DETAILS(result.data?._id));
        }
        return;
      }

      const result = await QuestionCreate({
        title,
        content,
        tags,
      });

      if (result.success && result.data) {
        toast.success("Question created successfully", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });

        router.push(ROUTES.QUESTION_DETAILS(result.data?._id));
      }

      // throw new Error("Failed to create question");
    } catch (e: any) {
      toast.error(e.message || "Failed to create question", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  //------------------------------
  let removeTag = (tag: string) => {
    setTags((prevTags) => {
      return prevTags.filter((eachTag) => eachTag != tag);
    });
  };

  return (
    <>
      <form
        className="flex flex-col gap-3 m-3 p-2"
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
        onSubmit={handleQuestionCreate}
      >
        <h1 className="text-lg font-bold">Ask A New Question</h1>
        <Input
          type="text"
          label="Title"
          text="Describe your question title in short way"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Editor
          label="Any Question?"
          value={content}
          onChange={(v) => setContent(v)}
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
            <RemovableTagCard key={i} onRemove={() => removeTag(tag)}>
              {tag}
            </RemovableTagCard>
          ))}
        </div>

        <Button variant="normal" type="submit">
          {isEdit ? "Update" : "Create"}
        </Button>
      </form>
    </>
  );
}

export default QuestionForm;
