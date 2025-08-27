import Link from "next/link";
import React, { ReactNode } from "react";

function ButtonLink({
  icon,
  children,
  href,
  variant,
  ...props
}: {
  icon?: ReactNode;
  children?: ReactNode;
  href: string;
  variant?: "normal" | "outline";
}) {
  return (
    <Link
      href={href}
      {...props}
      className={` 
         "w-full"
       py-3 px-4 rounded-lg  cursor-pointer hover:bg-sky-700 ${
         icon ? "flex items-center justify-center space-x-3" : ""
       } ${variant == "normal" ? "bg-sky-600" : "border border-sky-600"}`}
    >
      {icon && icon}
      <p>{children}</p>
    </Link>
  );
}

export default ButtonLink;
