import React from "react";

function input({
  placeholder,
  label,
  type,
  text,
  ...props
}: {
  placeholder?: string;
  label?: string;
  type: string;
  text?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      {label && <label htmlFor="">{label}</label>}
      <input
        {...props}
        type={type}
        name=""
        id=""
        className="bg-slate-800 rounded-lg block w-full py-2 mb-0 placeholder:text-white px-4 text-white"
        placeholder={placeholder}
      />
      {text && <p className="text-gray-400 mb-2 text-xs mt-0">{text}</p>}
    </>
  );
}

export default input;
