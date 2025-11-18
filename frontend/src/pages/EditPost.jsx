import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { postsAPI } from '@/services/api';
import { useApi } from '@/hooks/useApi';
import { PostForm } from '@/components/PostForm';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { toast } from '@/hooks/use-toast';

export default function EditPost() {
  const { id } = useParams();
  const { data: post, loading, error, execute } = useApi();

  useEffect(() => {
    if (id) {
      execute(() => postsAPI.getPost(id));
    }
  }, [id, execute]);

  const handleSubmit = async (formData) => {
    if (!id) return;

    try {
      await postsAPI.updatePost(id, formData);
      toast({
        title: 'Success',
        description: 'Post updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update post',
        variant: 'destructive',
      });
      throw error;
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!post) return <ErrorMessage message="Post not found" />;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <PostForm initialData={post} onSubmit={handleSubmit} isEditing />
      </div>
    </div>
  );
}
