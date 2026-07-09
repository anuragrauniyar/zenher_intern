import { motion } from "framer-motion";
import { PostCard } from "./PostCard";
import { Post } from "../types";

export function PostList({ posts }: { posts: Post[] }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-[1.25rem] border border-dashed border-slate-300 bg-slate-50 py-16 text-center">
        <p className="text-sm font-medium text-slate-900">No discussions found.</p>
        <p className="mt-1 text-sm text-slate-500">Try adjusting your search or start a new discussion.</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial="hidden" 
      animate="show" 
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.05 } }
      }}
      className="grid gap-4 sm:grid-cols-1"
    >
      {posts.map((post) => (
        <motion.div 
          key={post.id} 
          variants={{
            hidden: { opacity: 0, y: 15 },
            show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
          }}
        >
          <PostCard post={post} />
        </motion.div>
      ))}
    </motion.div>
  );
}