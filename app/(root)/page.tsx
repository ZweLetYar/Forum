// "use client";

import Filter from "../components/Filter";

import ThreadCard from "../components/ThreadCard";
import ButtonLink from "../components/ButtonLink";
import ROUTES from "@/routes";

import { auth } from "@/auth";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ search: string | undefined }>;
}) {
  const session = await auth();
  console.log(session);
  const { search } = await searchParams;

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
      {!!search && (
        <>
          <h1>Here is &quot;{search}&quot;</h1>
        </>
      )}
      <Filter />
      <ThreadCard />
      <ThreadCard />
      <ThreadCard />

      {session && <p>{session?.user?.name}</p>}
      {/* <Button onClick={() => api.users.delete(id)}>Delete User</Button> */}
    </div>
  );
}
