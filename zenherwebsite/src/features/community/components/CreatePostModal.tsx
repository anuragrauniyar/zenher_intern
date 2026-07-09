import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { CreatePostFormSchema } from "../types/post";
import * as z from "zod";

// 1. Re-define categories here since mock data is deleted
const CATEGORIES = [
  "Hormones",
  "Maternal_Health",
  "Period_Health",
  "Nutrition",
  "Mental_Health",
  "General"
];

interface CreatePostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void; // 2. No longer expects a Post object
}

type FormData = z.infer<typeof CreatePostFormSchema>;

export function CreatePostModal({ open, onOpenChange, onSubmit }: CreatePostModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(CreatePostFormSchema),
    defaultValues: { title: "", category: undefined, content: "" },
  });

  if (!open) return null;

  const handleValidSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      // 3. Actually send the data to your backend
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          category: data.category,
          content: data.content,
          author: "Anonymous User", // Temporary until auth is added
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      // 4. Tell CommunityPage to refresh the feed
      onSubmit(); 
      reset(); 
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Is your backend running?");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-[525px] rounded-[1.5rem] bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        <button 
          onClick={() => { reset(); onOpenChange(false); }}
          className="absolute right-6 top-6 rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-5">
          <h2 className="font-display text-2xl font-semibold text-slate-950">Share your experience</h2>
          <p className="mt-1 text-sm text-slate-500">Ask a question or share insights with the Zenher community.</p>
        </div>

        <form onSubmit={handleSubmit(handleValidSubmit)} className="space-y-5">
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Title <span className="text-red-500">*</span></label>
            <input 
              {...register("title")}
              placeholder="e.g., Understanding Hormonal Imbalances..." 
              className={`flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 ${errors.title ? "border-red-500" : "border-slate-200"}`}
            />
            {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Category <span className="text-red-500">*</span></label>
            <select 
              {...register("category")}
              className={`flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 ${errors.category ? "border-red-500" : "border-slate-200"}`}
            >
              <option value="">Select a topic...</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat.replace("_", " ")}</option>
              ))}
            </select>
            {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Your Experience <span className="text-red-500">*</span></label>
            <textarea 
              {...register("content")}
              placeholder="Share your thoughts, symptoms, or questions in detail..." 
              className={`flex min-h-[150px] w-full resize-none rounded-md border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 ${errors.content ? "border-red-500" : "border-slate-200"}`}
            />
            {errors.content && <p className="text-xs text-red-500">{errors.content.message}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button 
              type="button" 
              onClick={() => { reset(); onOpenChange(false); }}
              disabled={isSubmitting}
              className="h-10 rounded-full border border-slate-200 px-6 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="h-10 rounded-full bg-violet-600 px-6 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
            >
              {isSubmitting ? "Posting..." : "Post to Community"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}