import { createFileRoute, Link } from '@tanstack/react-router';
import { usePost } from '@/features/community/hooks/usePost';

export const Route = createFileRoute('/community/$postId')({
  component: PostDetailPage,
});

function PostDetailPage() {
  const { postId } = Route.useParams();
  if (!postId) return <div className="p-8 text-center text-red-500">Invalid Post ID</div>;
  const { data: post, isLoading, error } = usePost(postId);

  if (isLoading) return <div className="p-8 text-center">Loading post...</div>;
  
  if (error) {
    const is404 = error.message === "404";
    return (
      <div className="p-8 text-center text-red-500">
        {is404 ? "Post not found." : "Something went wrong loading this post."}
        <br />
        <Link to="/community" className="text-violet-600 underline mt-4 block">Return to Community</Link>
      </div>
    );
  }

  if (!post) return null;

  return (
    <main className="mx-auto max-w-3xl p-6 sm:p-12 space-y-8">
      <Link to="/community" className="text-sm font-medium text-slate-500 hover:text-slate-900">
        ← Back to Community
      </Link>
      
      <article className="space-y-6 rounded-2xl bg-white p-8 shadow-sm border border-slate-200">
        <div className="space-y-4 border-b border-slate-100 pb-6">
          <span className="inline-flex items-center rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-600">
            {post.category}
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">{post.title}</h1>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="font-medium text-slate-900">{post.author}</span>
            <span>•</span>
            <time>{new Date(post.createdAt).toLocaleDateString()}</time>
          </div>
        </div>
        
        <div className="prose prose-slate max-w-none">
          <p className="whitespace-pre-wrap leading-relaxed text-slate-700">{post.content}</p>
        </div>
      </article>
    </main>
  );
}