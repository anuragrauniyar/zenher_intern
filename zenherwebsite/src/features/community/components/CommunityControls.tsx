import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { MOCK_CATEGORIES } from "../utils/mockData";

export function CommunityControls() {
  return (
    <div className="space-y-6">
      {/* Search and Action Button Layout */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search discussions, symptoms, or experts..." 
            className="pl-9 rounded-full bg-white border-slate-200"
            disabled
          />
        </div>
        <Button className="rounded-full bg-gradient-primary text-primary-foreground shadow-glow gap-2 px-5 py-2.5 font-medium transition hover:scale-[1.01]">
          <Plus className="h-4 w-4" /> Create Post
        </Button>
      </div>

      {/* Category Chips Layout */}
      <div className="flex flex-wrap gap-2 items-center">
        {MOCK_CATEGORIES.map((category) => (
          <button
            key={category}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              category === "All"
                ? "bg-violet-600 text-white shadow-soft"
                : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"
            }`}
            disabled
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}