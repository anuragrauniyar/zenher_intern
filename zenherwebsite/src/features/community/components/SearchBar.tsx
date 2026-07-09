import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <Input 
        placeholder="Search articles, topics, or community discussions..." 
        className="h-11 w-full rounded-full border-slate-200 bg-white pl-11 pr-4 text-sm shadow-sm transition-colors focus-visible:border-violet-500 focus-visible:ring-1 focus-visible:ring-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
        disabled
      />
    </div>
  );
}