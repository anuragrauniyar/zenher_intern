import { Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/features/community/types/post";

export function PostCard({ post }: { post: Post }) {
  // Convert the string from the API into a Date object
  const dateObj = new Date(post.createdAt);
  
  // Safely format, falling back to "Just now" if the date is missing or invalid
  const formattedDate = isNaN(dateObj.getTime()) 
    ? "Just now" 
    : new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
      }).format(dateObj);

  return (
    <Link 
      to="/community/$postId" 
      params={{ postId: post.id }} 
      className="block outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 rounded-[1.25rem]"
    >
      <Card className="overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-md border-slate-200/80 bg-white rounded-[1.25rem]">
        <CardHeader className="space-y-2 p-5 pb-2">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="bg-violet-50 text-violet-600 rounded-full font-normal px-2.5 py-0.5 text-xs">
              {post.category}
            </Badge>
            <span className="text-xs text-muted-foreground">{formattedDate}</span>
          </div>
          <CardTitle className="font-display text-xl font-medium tracking-tight text-slate-950 group-hover:text-violet-600 transition-colors">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5 pt-0 space-y-4">
          <p className="text-sm leading-relaxed text-slate-600 line-clamp-3">
            {post.content}
          </p>
          <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-100 text-[10px] font-bold text-violet-600">
                {post.author?.[0] || "?"}
              </div>
              <span className="font-medium text-slate-700">{post.author || "Anonymous"}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}