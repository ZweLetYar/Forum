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
        className="border-b-1 border-b-cyan-500 block w-full py-2 mb-2 placeholder:text-grey-900 px-4 text-white focus:outline-none focus:border-gray-300 focus:placeholder-transparent "
        placeholder={placeholder}
      />
      {text && <p className="text-gray-400 mb-2 text-xs mt-0">{text}</p>}
    </>
  );
}

export default input;
