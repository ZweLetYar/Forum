// "use client";

import Filter from "../components/Filter";

import ThreadCard from "../components/ThreadCard";
import ButtonLink from "../components/ButtonLink";
import ROUTES from "@/routes";

import { api } from "@/lib/api";
import Button from "../components/Button";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ search: string | undefined }>;
}) {
  // const id = "68f0bbefa3c122d5d98497aa";
  const { search } = await searchParams;
  const { data } = await api.users.getByEmail("zly@gmail.com");

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

      {data && <p>{data.username}</p>}
      {/* <Button onClick={() => api.users.delete(id)}>Delete User</Button> */}
    </div>
  );
}
