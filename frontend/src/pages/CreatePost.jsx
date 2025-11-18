import { postsAPI } from '@/services/api';
import { PostForm } from '@/components/PostForm';
import { toast } from '@/hooks/use-toast';

export default function CreatePost() {
  const handleSubmit = async (formData) => {
    try {
      await postsAPI.createPost(formData);
      toast({
        title: 'Success',
        description: 'Post created successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create post',
        variant: 'destructive',
      });
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <PostForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
