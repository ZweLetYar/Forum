import React from "react";
import QuestionForm from "../../components/QuestionForm";
import { GetQuestion } from "@/lib/actions/GetQuestion.action";
import { notFound } from "next/navigation";

async function page({ params }: { params: Promise<{ id: string }> }) {
  let { id } = await params;
  let { data, success } = await GetQuestion({ questionId: id });

  if (!success || !data) {
    return notFound();
  }

  return <QuestionForm question={data} isEdit={true} />;
}

export default page;
