import { Link } from 'react-router-dom';
import { Post } from '@/types/blog';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
      {post.featuredImage && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <time>{formatDate(post.createdAt)}</time>
          {post.category && (
            <Badge variant="secondary">{post.category.name}</Badge>
          )}
        </div>
        <Link to={`/post/${post._id}`}>
          <h3 className="text-xl font-semibold transition-colors hover:text-primary">
            {post.title}
          </h3>
        </Link>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-muted-foreground">
          {post.content}
        </p>
      </CardContent>
      <CardFooter>
        <Link
          to={`/post/${post._id}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          Read more →
        </Link>
      </CardFooter>
    </Card>
  );
};
