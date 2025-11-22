"use client";
import Button from "@/app/components/Button";
import Editor from "@/app/components/Editor";
import AnswerCreate from "@/lib/actions/AnswerCreate.action";
import ROUTES from "@/routes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Bounce, toast } from "react-toastify";

function AnswerForm({ questionId }: { questionId: string }) {
  const [content, setContent] = useState("");
  const router = useRouter();
  const submitAnswer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { success, data, message } = await AnswerCreate({
      questionId,
      answerContent: content,
    });

    if (success && data) {
      toast.success("Answer submitted successfully", {
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

      router.push(ROUTES.QUESTION_DETAILS(questionId));
    } else {
      toast.error(message || "Failed to submit answer", {
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

  return (
    <form onSubmit={submitAnswer}>
      <Editor
        label="Any Question?"
        value={content}
        onChange={(v) => setContent(v)}
      />
      <div className="flex justify-end mt-2">
        <div className="max-w-55">
          <Button variant="normal" type="submit">
            Answer Question
          </Button>
        </div>
      </div>
    </form>
  );
}

export default AnswerForm;
