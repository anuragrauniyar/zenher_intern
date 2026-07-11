import { useState, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { Sparkles } from "lucide-react";
import { useQueryClient } from '@tanstack/react-query';

import { SearchBar } from '@/features/community/components/SearchBar';
import { CategoryFilters } from '@/features/community/components/CategoryFilters';
import { StartDiscussionButton } from '@/features/community/components/StartDiscussionButton';
import { PostList } from '@/features/community/components/PostList';
import { CreatePostModal } from '@/features/community/components/CreatePostModal';
import { usePosts } from '@/features/community/hooks/usePosts';
import { useDebounce } from '@/hooks/useDebounce';

// 1. Define the expected URL search parameters
const communitySearchSchema = z.object({
  query: z.string().optional().catch(""),
});

export const Route = createFileRoute('/community/')({
  validateSearch: communitySearchSchema,
  component: CommunityPage,
});

function CommunityPage() {
  const navigate = Route.useNavigate();
  const { query = "" } = Route.useSearch(); // The committed URL state
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(query); // Local input state initialized from URL
  
  const debouncedQuery = useDebounce(searchInput, 400); // 400ms delay
  const queryClient = useQueryClient();

  // Fetch posts using the URL query, NOT the local input
  const { data: posts = [], isLoading, isError } = usePosts(query);

  // Sync external URL changes back to local input (e.g., user presses browser Back button)
  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  // Sync debounced input to the URL
  useEffect(() => {
    if (debouncedQuery !== query && debouncedQuery === searchInput) {
      navigate({
        search: (prev) => ({ ...prev, query: debouncedQuery || undefined }), 
        replace: true, 
      });
    }
  }, [debouncedQuery, query, searchInput, navigate]);

  const handleClearSearch = () => {
    setSearchInput("");
    navigate({ 
      search: (prev) => ({ ...prev, query: undefined }), 
      replace: true 
    }); 
  };

  const handleCreatePost = () => {
    queryClient.invalidateQueries({ queryKey: ['posts'] });
  };

  return (
    <main className="relative min-h-screen bg-slate-50/50 pb-20">
      <div className="pointer-events-none absolute right-1/4 top-0 h-[350px] w-[350px] rounded-full bg-violet-500/5 blur-3xl" />
      <div className="pointer-events-none absolute left-1/4 top-20 h-[250px] w-[250px] rounded-full bg-fuchsia-400/5 blur-3xl" />

      <div className="mx-auto max-w-4xl space-y-8 px-4 pt-12 sm:px-6 relative z-10">
        
        <div className="space-y-3">
          <h1 className="font-display text-3xl font-medium tracking-tight text-slate-950 sm:text-4xl">
            Zenher Community
          </h1>
          <p className="max-w-xl text-sm text-slate-500">
            Share openly, post anonymously, and explore trusted insights from women and verified healthcare professionals.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <SearchBar 
              value={searchInput}
              onChange={setSearchInput}
              onClear={handleClearSearch}
            />
            <StartDiscussionButton onClick={() => setIsModalOpen(true)} />
          </div>
          <CategoryFilters />
        </div>

        {isLoading && <div className="text-center py-10">Loading posts...</div>}
        {isError && <div className="text-center py-10 text-red-500">Error loading posts.</div>}
        
        {!isLoading && !isError && posts.length === 0 ? (
          query.trim() ? (
            <div className="text-center py-10 text-slate-500">
              <p>No results found for "{query}".</p>
              <p>Try using different keywords.</p>
            </div>
          ) : (
            <div className="text-center py-10 text-slate-500">
              <p>No posts found. Start a discussion!</p>
            </div>
          )
        ) : (
          !isLoading && !isError && <PostList posts={posts} />
        )}
      </div>

      <CreatePostModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        onSubmit={handleCreatePost} 
      />
    </main>
  );
}