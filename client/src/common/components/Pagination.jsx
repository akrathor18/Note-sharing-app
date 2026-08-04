import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Reusable pagination component.
 *
 * @param {object}   props
 * @param {number}   props.currentPage  - The active page (1-indexed).
 * @param {number}   props.totalPages   - Total number of pages.
 * @param {function} props.onPageChange - Callback invoked with the new page number.
 */
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  // Build the array of page numbers / ellipsis markers to render.
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5; // max numbered buttons (excluding prev/next)

    if (totalPages <= maxVisible + 2) {
      // Few enough pages to show every number.
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always include first page.
      pages.push(1);

      const leftBound = Math.max(2, currentPage - 1);
      const rightBound = Math.min(totalPages - 1, currentPage + 1);

      if (leftBound > 2) pages.push('...');

      for (let i = leftBound; i <= rightBound; i++) pages.push(i);

      if (rightBound < totalPages - 1) pages.push('...');

      // Always include last page.
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1.5 pt-6 pb-2 select-none">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
          disabled:opacity-30 disabled:cursor-not-allowed
          text-white/60 hover:text-white hover:bg-white/[0.06]"
      >
        <ChevronLeft size={16} />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {/* Page numbers */}
      {pageNumbers.map((page, idx) =>
        page === '...' ? (
          <span
            key={`ellipsis-${idx}`}
            className="px-2 py-2 text-sm text-white/30 pointer-events-none"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? 'page' : undefined}
            className={`min-w-[36px] h-9 rounded-lg text-sm font-medium transition-all duration-200
              ${page === currentPage
                ? 'bg-[#FF007F] text-white shadow-lg shadow-[#FF007F]/25'
                : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
              }`}
          >
            {page}
          </button>
        )
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
          disabled:opacity-30 disabled:cursor-not-allowed
          text-white/60 hover:text-white hover:bg-white/[0.06]"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
