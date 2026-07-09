import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Sparkles } from "lucide-react";
import { useQueryClient } from '@tanstack/react-query'; // NEW

import { SearchBar } from '@/features/community/components/SearchBar';
import { CategoryFilters } from '@/features/community/components/CategoryFilters';
import { StartDiscussionButton } from '@/features/community/components/StartDiscussionButton';
import { PostList } from '@/features/community/components/PostList';
import { CreatePostModal } from '@/features/community/components/CreatePostModal';
import { Post } from '@/features/community/types/post';
import { usePosts } from '@/features/community/hooks/usePosts'; // NEW

export const Route = createFileRoute('/community/')({
  component: CommunityPage,
});

function CommunityPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Replace local state with server state via TanStack Query
  const { data: posts = [], isLoading, isError } = usePosts();
  const queryClient = useQueryClient();

  const handleCreatePost = () => {
    // Invalidate cache to trigger a fresh GET request
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  };

  return (
    <main className="relative min-h-screen bg-slate-50/50 pb-20">
      <div className="pointer-events-none absolute right-1/4 top-0 h-[350px] w-[350px] rounded-full bg-violet-500/5 blur-3xl" />
      <div className="pointer-events-none absolute left-1/4 top-20 h-[250px] w-[250px] rounded-full bg-fuchsia-400/5 blur-3xl" />

      <div className="mx-auto max-w-4xl space-y-8 px-4 pt-12 sm:px-6 relative z-10">
        
        <div className="space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-white px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-violet-600 shadow-sm">
            <Sparkles className="h-3 w-3" /> Safe Space Feed
          </span>
          <h1 className="font-display text-3xl font-medium tracking-tight text-slate-950 sm:text-4xl">
            Zenher Community
          </h1>
          <p className="max-w-xl text-sm text-slate-500">
            Share openly, post anonymously, and explore trusted insights from women and verified healthcare professionals.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <SearchBar />
            <StartDiscussionButton onClick={() => setIsModalOpen(true)} />
          </div>
          <CategoryFilters />
        </div>

        {/* UI States Handled */}
        {isLoading && <div className="text-center py-10">Loading posts...</div>}
        {isError && <div className="text-center py-10 text-red-500">Error loading posts.</div>}
        {!isLoading && !isError && posts.length === 0 && (
          <div className="text-center py-10 text-slate-500">No posts found. Start a discussion!</div>
        )}
        {!isLoading && !isError && posts.length > 0 && <PostList posts={posts} />}

      </div>

      <CreatePostModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        onSubmit={handleCreatePost} 
      />
    </main>
  );
}