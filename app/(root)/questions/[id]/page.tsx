import { GetQuestion } from "@/lib/actions/GetQuestion.action";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { success, data } = await GetQuestion({ questionId: id });

  return (
    <div>
      {id}
      <h1>{data?.title}</h1>
      <p>{data?.content}</p>
    </div>
  );
}

export default page;
