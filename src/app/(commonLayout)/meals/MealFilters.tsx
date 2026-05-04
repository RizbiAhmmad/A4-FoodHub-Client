"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Category } from "@/services/category.service";
import { ChevronRight, Filter, SortAsc, X } from "lucide-react";

export default function MealFilters({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCuisine = searchParams.get("cuisine") || "";
  const currentSort = searchParams.get("sort") || "";

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    router.push(`/meals?${params.toString()}`);
  };

  const handleClear = () => {
    router.push("/meals");
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Active Filters Summary (Mobile/Top) */}
      {(currentCuisine || currentSort) && (
        <div className="flex flex-wrap gap-2 mb-2 lg:hidden">
           {currentCuisine && (
             <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">
               {currentCuisine}
               <X size={14} className="cursor-pointer" onClick={() => updateParams("cuisine", "")} />
             </span>
           )}
           <button onClick={handleClear} className="text-xs text-gray-500 underline">Clear All</button>
        </div>
      )}

      {/* Categories List */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <Filter size={18} className="text-orange-500" />
          <h3 className="font-bold text-lg">Cuisines</h3>
        </div>
        
        <div className="space-y-1">
          <button
            onClick={() => updateParams("cuisine", "")}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 ${
              !currentCuisine 
                ? "bg-orange-500 text-white font-bold shadow-lg shadow-orange-200 dark:shadow-none" 
                : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
            }`}
          >
            <span>All Cuisines</span>
            <ChevronRight size={16} className={!currentCuisine ? "opacity-100" : "opacity-0"} />
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => updateParams("cuisine", category.name)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 ${
                currentCuisine === category.name 
                  ? "bg-orange-500 text-white font-bold shadow-lg shadow-orange-200 dark:shadow-none" 
                  : "hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
              }`}
            >
              <span>{category.name}</span>
              <ChevronRight size={16} className={currentCuisine === category.name ? "opacity-100" : "opacity-0"} />
            </button>
          ))}
        </div>
      </div>

      {/* Sorting Options */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <SortAsc size={18} className="text-orange-500" />
          <h3 className="font-bold text-lg">Sort By</h3>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="radio" 
              name="sort" 
              checked={!currentSort} 
              onChange={() => updateParams("sort", "")}
              className="w-4 h-4 accent-orange-500" 
            />
            <span className={`text-sm ${!currentSort ? "font-bold text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}>Default</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="radio" 
              name="sort" 
              checked={currentSort === "low"} 
              onChange={() => updateParams("sort", "low")}
              className="w-4 h-4 accent-orange-500" 
            />
            <span className={`text-sm ${currentSort === "low" ? "font-bold text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}>Price: Low to High</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer group">
            <input 
              type="radio" 
              name="sort" 
              checked={currentSort === "high"} 
              onChange={() => updateParams("sort", "high")}
              className="w-4 h-4 accent-orange-500" 
            />
            <span className={`text-sm ${currentSort === "high" ? "font-bold text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}>Price: High to Low</span>
          </label>
        </div>
      </div>
      
      {/* Clear Button */}
      <button
        onClick={handleClear}
        className="w-full py-4 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-bold rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );
}
