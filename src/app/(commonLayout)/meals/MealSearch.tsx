"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { Search, X } from "lucide-react";

export default function MealSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Use a local state that initializes from URL but isn't strictly bound to it for every render
  const termInUrl = searchParams.get("searchTerm") || "";
  const [searchTerm, setSearchTerm] = useState(termInUrl);
  const lastSearchedTerm = useRef(termInUrl);

  // Sync state with URL using a safe async update to avoid all React warnings and errors
  useEffect(() => {
    const termInUrl = searchParams.get("searchTerm") || "";
    if (termInUrl !== lastSearchedTerm.current) {
      const timeoutId = setTimeout(() => {
        setSearchTerm(termInUrl);
        lastSearchedTerm.current = termInUrl;
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [searchParams]);

  const performSearch = useCallback((term: string) => {
    if (term === lastSearchedTerm.current) return;
    
    lastSearchedTerm.current = term;
    const params = new URLSearchParams(searchParams.toString());
    
    if (term) {
      params.set("searchTerm", term);
    } else {
      params.delete("searchTerm");
    }
    params.set("page", "1");
    router.push(`/meals?${params.toString()}`);
  }, [searchParams, router]);

  // Handle typing with a debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm !== lastSearchedTerm.current) {
        performSearch(searchTerm);
      }
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, performSearch]);

  const handleClear = () => {
    setSearchTerm("");
    performSearch("");
  };

  return (
    <div className="max-w-2xl mx-auto w-full mb-12">
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors">
          <Search size={20} />
        </div>
        <input
          type="text"
          placeholder="Search your favorite meals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") performSearch(searchTerm);
          }}
          className="w-full pl-12 pr-32 py-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all text-lg"
        />
        
        <div className="absolute right-3 top-2 bottom-2 flex items-center gap-2">
          {searchTerm && (
            <button 
              onClick={handleClear}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Clear search"
            >
              <X size={20} />
            </button>
          )}
          <button
            onClick={() => performSearch(searchTerm)}
            className="px-6 h-full bg-orange-500 text-white font-bold rounded-xl hover:bg-gray-900 transition-colors"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
