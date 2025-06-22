import { auth } from "@/auth";
import Filter from "../components/Filter";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ search: string | undefined }>;
}) {
  const { search } = await searchParams;

  const session = await auth();

  return (
    <div className="px-5">
      <div className="flex gap-3 items-center text-xl font-bold ">
        Hi
        <span className="text-sky-400 ">{session?.user?.name}</span>
      </div>
      {!!search && (
        <>
          <h1>Here is &quot;{search}&quot;</h1>
        </>
      )}
      <Filter />
    </div>
  );
}
