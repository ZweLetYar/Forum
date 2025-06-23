import Filter from "../components/Filter";
import Button from "../components/Button";

import ThreadCard from "../components/ThreadCard";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ search: string | undefined }>;
}) {
  const { search } = await searchParams;

  return (
    <div className="px-5 flex flex-col gap-3">
      <div className=" flex items-center n">
        <h1 className="text-2xl font-extrabold text-sky-500 mr-auto">
          All Threads
        </h1>
        <Button variant="normal" className="ml-auto w-[20%]">
          Create Thread
        </Button>
      </div>
      {!!search && (
        <>
          <h1>Here is &quot;{search}&quot;</h1>
        </>
      )}
      <Filter />
      <ThreadCard />
    </div>
  );
}
