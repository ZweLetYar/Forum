import TagInfoCard from "@/app/components/TagInfoCard";
import DataRenderer from "../../components/DataRenderer";
import { GetTags } from "@/lib/actions/GetTags.action";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const { page, pageSize, search, filter } = await searchParams;

  const { success, data, message } = await GetTags({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    search: search || "",
    filter: filter || "",
  });

  const { tags = [] } = data || {};

  return (
    <div className="px-5 flex flex-col gap-3">
      <div className=" flex items-center n">
        <h1 className="text-2xl font-extrabold text-sky-500 mr-auto">
          All Tags
        </h1>
      </div>

      <DataRenderer
        success={success}
        data={tags}
        errorMessage={message}
        render={(tags) => {
          return (
            <div className="grid grid-cols-4 gap-4">
              {tags.map((tag, i) => (
                <TagInfoCard name={tag.name} key={i} />
              ))}
            </div>
          );
        }}
      />
    </div>
  );
}
