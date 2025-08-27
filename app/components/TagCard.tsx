import Link from "next/link";
import React, { ReactNode } from "react";

function TagCard({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="text-white px-3 py-1 rounded-md cursor-pointer  bg-slate-700"
    >
      {children}
    </Link>
  );
}

export default TagCard;
