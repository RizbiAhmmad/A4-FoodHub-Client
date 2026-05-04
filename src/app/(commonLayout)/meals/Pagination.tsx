import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams: Record<string, string | string[] | undefined>;
}

export default function Pagination({ currentPage, totalPages, searchParams }: PaginationProps) {
  if (totalPages <= 1) return null;

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams();
    
    // Copy existing search params
    Object.entries(searchParams).forEach(([key, value]) => {
      if (typeof value === "string") {
        params.set(key, value);
      }
    });

    params.set("page", pageNumber.toString());
    return `/meals?${params.toString()}`;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      <Link
        href={createPageUrl(Math.max(1, currentPage - 1))}
        className={`px-4 py-2 border rounded-lg transition ${
          currentPage <= 1
            ? "opacity-50 pointer-events-none bg-gray-50 text-gray-400"
            : "hover:bg-gray-50 text-gray-700 hover:text-black"
        }`}
      >
        Previous
      </Link>
      
      <div className="flex gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={createPageUrl(page)}
            className={`w-10 h-10 flex items-center justify-center rounded-lg border transition ${
              currentPage === page
                ? "bg-black text-white border-black"
                : "hover:bg-gray-50 text-gray-700 hover:text-black"
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      <Link
        href={createPageUrl(Math.min(totalPages, currentPage + 1))}
        className={`px-4 py-2 border rounded-lg transition ${
          currentPage >= totalPages
            ? "opacity-50 pointer-events-none bg-gray-50 text-gray-400"
            : "hover:bg-gray-50 text-gray-700 hover:text-black"
        }`}
      >
        Next
      </Link>
    </div>
  );
}
