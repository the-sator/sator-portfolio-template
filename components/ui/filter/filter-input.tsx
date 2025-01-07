"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../input";
import { useDebouncedCallback } from "use-debounce";
import { useQueryParamsContext } from "@/context/query-params-provider";
import { useSearchParams } from "next/navigation";
type Props = {
  filterKey: string;
  debounce?: boolean;
  page?: boolean;
};
type FilterInputProps = React.ComponentProps<typeof Input> & Props;

export default function FilterInput({
  debounce = true,
  filterKey,
  page = true,
  ...props
}: FilterInputProps) {
  const params = useSearchParams();
  const [mount, setMount] = useState(false);
  const { updateQuery } = useQueryParamsContext();
  const [query, setQuery] = useState(params.get(filterKey) || "");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
  };
  const debounceSearch = useDebouncedCallback(async () => {
    handleOnFilter();
  }, 500);

  const handleOnFilter = () => {
    if (page) {
      updateQuery({ [filterKey]: query, page: "1" });
    } else {
      updateQuery({ [filterKey]: query });
    }
  };

  useEffect(() => {
    if (!mount) return;
    if (debounce) {
      // if (!query) return;
      debounceSearch();
    }
  }, [query, debounce, debounceSearch]);

  useEffect(() => {
    setMount(true);
  }, []);

  useEffect(() => {
    setQuery(params.get(filterKey) || "");
  }, [params, filterKey]);

  return (
    <Input {...props} value={query} variant="outline" onChange={handleChange} />
  );
}
