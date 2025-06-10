import Image from "next/image";
import React from "react";

function navbar() {
  return (
    <div className="flex items-center h-25">
      <div className="w-1/5 flex justify-center space-x-5 items-center">
        <Image src="/logo.png" width={50} height={50} alt="logo" />
        <h1 className="text-xl font-bold text-white">
          Dev <span className="text-sky-400">Talk</span>
        </h1>
      </div>

      <div className="w-3/5 flex justify-center">
        <input
          type="text"
          className="bg-slate-700 rounded-md w-3/5 h-10 px-5 placeholder:text-white"
          placeholder="Search Anything Globally ..."
        />
      </div>
      <div className="w-1/5 flex justify-center">
        <Image
          src="/user.jpg"
          className="rounded-full"
          width={50}
          height={50}
          alt="logo"
        />
      </div>
    </div>
  );
}

export default navbar;
