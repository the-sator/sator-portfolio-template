"use client";
import React, { createContext, useContext } from "react";
import { useUpdateQuery as useInternalUpdateQuery } from "@/hooks/use-update-query";

const QueryParamsContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateQuery: (filters: Record<string, string | undefined>) => {},
  clearQuery: () => {},
  isPending: false,
});

export const QueryParamsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { updateQuery, clearQuery, isPending } = useInternalUpdateQuery();

  return (
    <QueryParamsContext.Provider value={{ updateQuery, clearQuery, isPending }}>
      {children}
    </QueryParamsContext.Provider>
  );
};

export const useQueryParamsContext = () => useContext(QueryParamsContext);
