import React, { ReactNode } from "react";

function Button({
  icon,
  children,
  variant,
  ...props
}: {
  icon?: ReactNode;
  children?: ReactNode;
  variant?: "normal" | "outline";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={` w-full py-3  rounded-lg  cursor-pointer hover:bg-sky-700 ${
        icon ? "flex items-center justify-center space-x-3" : ""
      } ${variant == "normal" ? "bg-sky-600" : "border border-sky-600"}`}
    >
      {icon && icon}
      <p>{children}</p>
    </button>
  );
}

export default Button;
