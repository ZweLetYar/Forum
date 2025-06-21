export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ search: string | undefined }>;
}) {
  const { search } = await searchParams;

  return <div className="flex w-full text-white">pages... {search}</div>;
}
