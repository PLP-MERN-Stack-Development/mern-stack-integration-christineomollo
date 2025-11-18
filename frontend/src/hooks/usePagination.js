import { useState, useCallback } from 'react';

export function usePagination({ initialPage = 1, initialLimit = 10 } = {}) {
  const [page, setPage] = useState(initialPage);
  const [limit] = useState(initialLimit);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);

  const updatePagination = useCallback((newTotal, newPages) => {
    setTotal(newTotal);
    setPages(newPages);
  }, []);

  const goToPage = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const nextPage = useCallback(() => {
    setPage((prev) => Math.min(prev + 1, pages));
  }, [pages]);

  const prevPage = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 1));
  }, []);

  return {
    page,
    limit,
    total,
    pages,
    updatePagination,
    goToPage,
    nextPage,
    prevPage,
  };
}
