import React from "react";
import QuestionForm from "../../components/QuestionForm";
import { GetQuestion } from "@/lib/actions/GetQuestion.action";
import { notFound } from "next/navigation";

async function page({ params }: { params: Promise<{ id: string }> }) {
  let { id } = await params;
  let { data: question, success } = await GetQuestion({ questionId: id });

  if (!success) {
    return notFound();
  }

  return <QuestionForm question={question} isEdit={true} />;
}

export default page;
