"use client";

import queryString from "query-string";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Filter() {
  const [active, setActive] = useState("");
  const router = useRouter();

  const handleFilter = (filter: string) => {
    if (active === filter) {
      setActive("");
    } else {
      setActive(filter);
    }

    const currentQuery = queryString.parse(window.location.search);
    const updatedQuery = {
      ...currentQuery,
      filter: active === filter ? "" : filter,
    };

    const url = queryString.stringifyUrl(
      {
        url: window.location.pathname,
        query: updatedQuery,
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  };
  return (
    <div className="flex gap-2 items-center mt-2">
      <button
        onClick={() => handleFilter("React")}
        className={` text-white px-3 py-1 rounded-md cursor-pointer ${
          active === "React" ? "bg-sky-400" : "bg-slate-700"
        }`}
      >
        React
      </button>
      <button
        onClick={() => handleFilter("Vue")}
        className={` text-white px-3 py-1 rounded-md cursor-pointer ${
          active === "Vue" ? "bg-sky-400" : "bg-slate-700"
        }`}
      >
        Vue
      </button>
    </div>
  );
}

export default Filter;
