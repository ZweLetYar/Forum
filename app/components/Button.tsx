import React, { ReactNode } from "react";

function Button({
  icon,
  children,
  type,
}: {
  icon?: ReactNode;
  children?: ReactNode;
  type?: "normal" | "outline";
}) {
  return (
    <button
      className={` w-full py-3  rounded-lg  cursor-pointer hover:bg-sky-700 ${
        icon ? "flex items-center justify-center space-x-3" : ""
      } ${type == "normal" ? "bg-sky-600" : "border border-sky-600"}`}
    >
      {icon && icon}
      <p>{children}</p>
    </button>
  );
}

export default Button;
