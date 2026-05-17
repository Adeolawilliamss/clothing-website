"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

type SearchProps = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export default function Search({
  setSearch,
}: SearchProps) {
  const searchParams = useSearchParams();

  const search = searchParams.get("search") || "";

  useEffect(() => {
    setSearch(search);
  }, [search, setSearch]);

  return null;
}