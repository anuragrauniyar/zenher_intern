import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function StartDiscussionButton({ onClick }: { onClick: () => void }) {
  return (
    <Button 
      onClick={onClick} 
      className="group h-11 rounded-full bg-gradient-primary px-6 text-primary-foreground shadow-glow transition-all hover:-translate-y-0.5 hover:shadow-lg"
    >
      <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" /> 
      Start Discussion
    </Button>
  );
}