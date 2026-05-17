"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

type Props = {
  setSearchQuery: React.Dispatch<
    React.SetStateAction<string>
  >;
};

export default function SearchQuery({
  setSearchQuery,
}: Props) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const query =
      searchParams.get("search")?.toLowerCase() || "";

    setSearchQuery(query);
  }, [searchParams, setSearchQuery]);

  return null;
}