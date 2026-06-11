import Link from "next/link";
import React, { ReactNode } from "react";

function TagCard({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className=" px-3 py-1 rounded-md cursor-pointer  bg-[#1A2330] border border-[#2F3A4D] text-[#AEB8C8] hover:bg-[#253044] hover:text-[#E8EDF4]"
    >
      {children}
    </Link>
  );
}

export default TagCard;
