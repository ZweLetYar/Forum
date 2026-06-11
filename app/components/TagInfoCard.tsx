import Image from "next/image";
import Link from "next/link";

async function iconExists(url: string) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
}

export default async function DevIcon({
  id,
  name,
  questionCount,
}: {
  id: string;
  name?: string;
  questionCount?: number;
}) {
  const slug = name?.toLowerCase();

  const originalUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-original.svg`;
  const plainUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/devicon/devicon-original.svg`;

  // Try original
  const originalExists = await iconExists(originalUrl);

  const finalUrl = originalExists ? originalUrl : plainUrl;

  return (
    <div>
      <Link
        href={`/tags/${id}`}
        className="flex flex-col gap-1 justify-center items-center bg-[#222831] p-4 rounded-xl"
      >
        <Image
          src={finalUrl}
          width={100}
          height={100}
          alt={name || "devicon"}
        />
        <p>
          {name}-({questionCount})
        </p>
      </Link>
    </div>
  );
}
