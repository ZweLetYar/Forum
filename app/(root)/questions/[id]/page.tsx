import Image from "next/image";
import Link from "next/link";
import TagCard from "@/app/components/TagCard";
import { GetQuestion } from "@/lib/actions/GetQuestion.action";
import Preview from "@/app/components/Preview";
import IncreaseViewCount from "@/lib/actions/IncreaseViewCount";
import { after } from "next/server";

function formatDate(iso?: string) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  //option 1 => sequential
  // await IncreaseViewCount({ questionId: id });
  // const { success, data: question } = await GetQuestion({ questionId: id });
  //-------------------------------

  //option 2 => parallel
  // const [response1, { success, data: question }] =await Promise.all([
  //   await IncreaseViewCount({ questionId: id }),
  //   await GetQuestion({ questionId: id }),
  // ]);
  //-------------------------------

  //option 3 => use after
  const { success, data: question } = await GetQuestion({ questionId: id });
  after(async () => {
    await IncreaseViewCount({ questionId: id });
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="text-sm text-gray-400 mb-4">
        <Link href="/" className="hover:text-gray-200">
          Home
        </Link>
        <span className="px-2">/</span>
        <Link href="/questions" className="hover:text-gray-200">
          Questions
        </Link>
      </nav>

      <header className="bg-[#0f1724] rounded-xl p-6 mb-6 border border-[#243041]">
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0 hidden sm:flex flex-col items-center text-center">
            <div className="text-2xl font-bold text-sky-500">
              {question?.upvotes ?? 0}
            </div>
            <div className="text-sm text-gray-400">votes</div>
            <div className="h-4" />

            <div className="text-2xl font-bold text-gray-100">
              {question?.views ?? 0}
            </div>
            <div className="text-sm text-gray-400">views</div>
          </div>

          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {question?.title ?? "Untitled question"}
            </h1>

            <div className="mt-3 flex items-center gap-3 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Image
                  src={question?.author?.image || "/default-avatar.png"}
                  width={36}
                  height={36}
                  alt={question?.author?.name || "author"}
                  className="rounded-full"
                />
                <div>
                  <div className="font-medium text-gray-100">
                    {question?.author?.name || "Unknown"}
                  </div>
                  <div className="text-xs text-gray-400">
                    asked {formatDate(question?.createdAt as any)}
                  </div>
                </div>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <button className="px-3 py-1 text-sm bg-sky-500 hover:bg-sky-600 text-white rounded">
                  Share
                </button>
                <button className="px-3 py-1 text-sm border border-gray-700 text-gray-200 rounded">
                  Follow
                </button>
              </div>
            </div>

            <div className="mt-4 flex gap-2 items-center">
              {question?.tags?.map((tag: any) => (
                <TagCard
                  key={(tag && (tag._id ?? tag)) || Math.random()}
                  href={`/?filter=${tag?.name || tag}`}
                >
                  {tag?.name || tag}
                </TagCard>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* <aside className="lg:col-span-3 hidden lg:block">
          <div className="rounded-xl border border-[#243041] p-4 bg-[#0b1117]">
            <div className="text-sm text-gray-300">Stats</div>
            <div className="mt-3 text-gray-100">
              <div>Views: {question?.views ?? 0}</div>
              <div>Upvotes: {question?.upvotes ?? 0}</div>
              <div>Downvotes: {question?.downvotes ?? 0}</div>
            </div>
          </div>
        </aside> */}

        <section className="lg:col-span-12">
          <article className="max-w-none bg-[#0b1117] rounded-xl p-6 border border-[#243041]">
            {/* If content is saved as HTML, render it. Otherwise show plain text */}
            {question?.content ? (
              <Preview content={question.content} />
            ) : (
              <p className="text-gray-300">No content available.</p>
            )}
          </article>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-white mb-3">Answers</h2>
            <div className="text-gray-400">
              {question?.answers ?? 0} answers
            </div>
            {/* TODO: render answers list here */}
          </div>
        </section>
      </main>
    </div>
  );
}

export default page;
