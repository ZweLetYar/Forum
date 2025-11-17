// "use client";

import Filter from "../components/Filter";

import ThreadCard from "../components/ThreadCard";
import ButtonLink from "../components/ButtonLink";
import ROUTES from "@/routes";

import { auth } from "@/auth";
import { GetQuestions } from "@/lib/actions/GetQuestions.action";
import DataRenderer from "../components/DataRenderer";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const session = await auth();
  console.log(session);
  const { page, pageSize, search, filter } = await searchParams;

  const { success, data, message } = await GetQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    search: search || "",
    filter: filter || "",
  });

  const { questions = [] } = data || {};

  return (
    <div className="px-5 flex flex-col gap-3">
      <div className=" flex items-center n">
        <h1 className="text-2xl font-extrabold text-sky-500 mr-auto">
          All Threads
        </h1>
        <ButtonLink variant="normal" href={ROUTES.QUESTIONS_CREATE}>
          Create Thread
        </ButtonLink>
      </div>

      <Filter />
      <DataRenderer
        success={success}
        data={questions}
        errorMessage={message}
        render={(questions) =>
          questions.map((q, i) => <ThreadCard question={q} key={i} />)
        }
      />

      {session && <p>{session?.user?.name}</p>}
      {/* <Button onClick={() => api.users.delete(id)}>Delete User</Button> */}
    </div>
  );
}
