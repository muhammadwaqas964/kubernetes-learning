import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Topic } from "@shared/schema";

export default function useSearch(query: string) {
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const { data: searchResults = [], isLoading } = useQuery<Topic[]>({
    queryKey: [`/api/topics/search?q=${debouncedQuery}`],
    enabled: debouncedQuery.length >= 2,
  });

  return {
    searchResults,
    isLoading: isLoading && debouncedQuery.length >= 2,
  };
}
