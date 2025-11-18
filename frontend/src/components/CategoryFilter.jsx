import { useEffect } from 'react';
import { Category } from '@/types/blog';
import { categoriesAPI } from '@/services/api';
import { useApi } from '@/hooks/useApi';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from './LoadingSpinner';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
}

export const CategoryFilter = ({ selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  const { data: categories, loading, execute } = useApi<Category[]>();

  useEffect(() => {
    execute(() => categoriesAPI.getCategories());
  }, [execute]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selectedCategory === '' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onSelectCategory('')}
      >
        All
      </Button>
      {categories?.map((category) => (
        <Button
          key={category._id}
          variant={selectedCategory === category.slug ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSelectCategory(category.slug)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};
