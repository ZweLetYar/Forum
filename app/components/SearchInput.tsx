"use client";
import React, { useEffect, useState } from "react";
import Input from "./input";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useDebounce } from "use-debounce";

function SearchInput() {
  const searchParam = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState(searchParam.get("search") || "");
  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
    const currentQuery = queryString.parse(window.location.search);
    const updatedQuery = {
      ...currentQuery,
      search: debouncedSearch,
    };

    const url = queryString.stringifyUrl(
      {
        url: window.location.pathname,
        query: updatedQuery,
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  }, [debouncedSearch, router]);

  return (
    <>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search anything globally"
        type="text"
      />
    </>
  );
}

export default SearchInput;
