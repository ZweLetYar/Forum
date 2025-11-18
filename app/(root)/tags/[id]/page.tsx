import DataRenderer from "@/app/components/DataRenderer";
import ThreadCard from "@/app/components/ThreadCard";
import TagInfoCard from "@/app/components/TagInfoCard";
import GetTagQuestions from "@/lib/actions/GetTagQuestions";

async function page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const { id } = await params;
  const { page, pageSize, search } = await searchParams;
  const { success, message, details, data } = await GetTagQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    search: search || "",
    tagId: id,
  });

  const { questions = [], tag, isNext } = data || {};

  return (
    <div className="px-5 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-extrabold text-sky-600">
            {tag?.name ?? "Tag"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Questions related to this tag
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/questions/create"
            className="inline-flex items-center px-3 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600"
          >
            Ask Question
          </a>

          <div className="hidden sm:block">
            <TagInfoCard
              id={id}
              name={tag?.name.toString()}
              questionCount={tag?.questions}
            />
          </div>
        </div>
      </div>

      <DataRenderer
        success={success}
        data={questions}
        errorMessage={message}
        render={(questions) =>
          questions.map((q, i) => (
            <ThreadCard question={q} key={(q as any)._id ?? i} />
          ))
        }
      />
    </div>
  );
}

export default page;
