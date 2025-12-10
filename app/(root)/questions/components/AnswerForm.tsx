"use client";
import Button from "@/app/components/Button";
import Editor from "@/app/components/Editor";
import AnswerCreate from "@/lib/actions/AnswerCreate.action";
import GenerateAiAnswerAction from "@/lib/actions/GenerateAiAnswerAction.action";
import ROUTES from "@/routes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Bounce, toast } from "react-toastify";

function AnswerForm({
  questionId,
  questionTitle,
  questionContent,
}: {
  questionId: string;
  questionTitle: string | undefined;
  questionContent: string | undefined;
}) {
  let [content, setContent] = useState("");
  let [loading, setLoading] = useState(false);
  const router = useRouter();

  const GenerateAiAnswer = async () => {
    setLoading(true);
    const { success, data } = await GenerateAiAnswerAction({
      title: questionTitle,
      content: questionContent,
      userAnswer: content,
    });

    if (success && data) {
      let { aiAnswer = "" } = data || {};
      setContent(aiAnswer);
    }
    setLoading(false);
  };

  const submitAnswer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { success, data, message } = await AnswerCreate({
      questionId,
      answerContent: content,
    });

    if (success && data) {
      setContent("");
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
      <div className="flex justify-end mt-2 ">
        <div className="flex justify-end max-w-[400px] w-full gap-2">
          {content.replace(/<[^>]*>/g, "").trim().length >= 10 && (
            <Button
              variant="outline"
              type="button"
              className="mr-2 w-[50%]"
              onClick={GenerateAiAnswer}
            >
              {loading ? "Loading ..." : "Generate AI Answer"}
            </Button>
          )}
          <Button variant="normal" type="submit" className="w-[50%] ">
            Answer Question
          </Button>
        </div>
      </div>
    </form>
  );
}

export default AnswerForm;
