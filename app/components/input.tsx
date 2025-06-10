import React from "react";

function input({
  placeholder,
  label,
  type,
}: {
  placeholder?: string;
  label?: string;
  type: string;
}) {
  return (
    <>
      {label && <label htmlFor="">{label}</label>}
      <input
        type={type}
        name=""
        id=""
        className="bg-[#393E46] rounded-lg block w-full py-2 placeholder:text-white px-4 text-white"
        placeholder={placeholder}
      />
    </>
  );
}

export default input;
