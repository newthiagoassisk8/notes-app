// SimplePagination.tsx
import React from "react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function SimplePagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  const prevPage = () => onPageChange(Math.max(1, currentPage - 1));
  const nextPage = () => onPageChange(Math.min(totalPages, currentPage + 1));

  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className="rounded-md border px-3 py-1 text-sm disabled:opacity-50 hover:bg-neutral-100 dark:hover:bg-neutral-800"
      >
        ←
      </button>

      <span className="text-sm text-neutral-700 dark:text-neutral-300">
        Página <span className="font-medium">{currentPage}</span> de{" "}
        <span className="font-medium">{totalPages}</span>
      </span>

      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className="rounded-md border px-3 py-1 text-sm disabled:opacity-50 hover:bg-neutral-100 dark:hover:bg-neutral-800"
      >
        →
      </button>
    </div>
  );
}
