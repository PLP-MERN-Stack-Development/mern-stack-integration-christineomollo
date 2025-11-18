import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { postsAPI } from '@/services/api';
import { useApi } from '@/hooks/useApi';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { CommentList } from '@/components/CommentList';
import { CommentForm } from '@/components/CommentForm';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Calendar, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: post, loading, error, execute } = useApi();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (id) {
      execute(() => postsAPI.getPost(id));
    }
  }, [id, execute]);

  useEffect(() => {
    if (post?.comments) {
      setComments(post.comments);
    }
  }, [post]);

  const handleDelete = async () => {
    if (!id || !window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await postsAPI.deletePost(id);
      toast({
        title: 'Success',
        description: 'Post deleted successfully',
      });
      navigate('/');
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to delete post',
        variant: 'destructive',
      });
    }
  };

  const handleAddComment = async (content) => {
    if (!id) return;

    try {
      const response = await postsAPI.addComment(id, content);
      setComments([...(comments || []), response.data]);
      toast({
        title: 'Success',
        description: 'Comment posted successfully',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to post comment',
        variant: 'destructive',
      });
      throw err;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!post) return <ErrorMessage message="Post not found" />;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to posts
        </Button>

        <article>
          {post.featuredImage && (
            <div className="mb-8 aspect-video w-full overflow-hidden rounded-lg">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="mb-6">
            <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time>{formatDate(post.createdAt)}</time>
              </div>
              {post.category && (
                <Badge variant="secondary">{post.category.name}</Badge>
              )}
              <span>By {post.author}</span>
            </div>

            {user && (
              <div className="mt-4 flex gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link to={`/edit/${post._id}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </Button>
                <Button variant="destructive" size="sm" onClick={handleDelete}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            )}
          </div>

          <Card className="mb-8">
            <CardContent className="prose prose-slate max-w-none pt-6 dark:prose-invert">
              <div className="whitespace-pre-wrap">{post.content}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-2xl font-bold">
                Comments ({comments?.length || 0})
              </h2>
            </CardHeader>
            <CardContent className="space-y-6">
              {user ? (
                <CommentForm onSubmit={handleAddComment} />
              ) : (
                <p className="text-muted-foreground">
                  Please <Link to="/login" className="text-primary hover:underline">login</Link> to comment.
                </p>
              )}
              
              <CommentList comments={comments || []} />
            </CardContent>
          </Card>
        </article>
      </div>
    </div>
  );
}
