import { useState, useEffect } from 'react';
import { Post, PaginationData } from '@/types/blog';
import { postsAPI } from '@/services/api';
import { useApi } from '@/hooks/useApi';
import { usePagination } from '@/hooks/usePagination';
import { PostCard } from '@/components/PostCard';
import { SearchBar } from '@/components/SearchBar';
import { CategoryFilter } from '@/components/CategoryFilter';
import { Pagination } from '@/components/Pagination';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';

export default function Home() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const { page, updatePagination, goToPage } = usePagination();
  const { data, loading, error, execute } = useApi();

  useEffect(() => {
    execute(() => postsAPI.getPosts(page, 10, search, category));
  }, [page, search, category, execute]);

  useEffect(() => {
    if (data?.pagination) {
      updatePagination(data.pagination.total, data.pagination.pages);
    }
  }, [data, updatePagination]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-4">
          <h1 className="text-4xl font-bold">Blog Posts</h1>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1 md:max-w-md">
              <SearchBar value={search} onChange={setSearch} />
            </div>
            <CategoryFilter
              selectedCategory={category}
              onSelectCategory={setCategory}
            />
          </div>
        </div>

        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}

        {data?.posts && (
          <>
            <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            {data.posts.length === 0 && !loading && (
              <div className="py-12 text-center">
                <p className="text-lg text-muted-foreground">
                  No posts found. Try adjusting your search or filters.
                </p>
              </div>
            )}

            {data.pagination && (
              <div className="mt-8">
                <Pagination
                  currentPage={page}
                  totalPages={data.pagination.pages}
                  onPageChange={goToPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
