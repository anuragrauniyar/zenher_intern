// Removed the broken mock import

const CATEGORIES = [
  "All",
  "Hormones",
  "Maternal_Health",
  "Period_Health",
  "Nutrition",
  "Mental_Health",
  "General"
];

export function CategoryFilters() {
  return (
    <div 
      className="flex flex-wrap items-center gap-2"
      role="group" 
      aria-label="Filter discussions by category"
    >
      {CATEGORIES.map((category) => {
        const isSelected = category === "All";
        // Clean up the underscores for the UI (e.g., "Mental_Health" -> "Mental Health")
        const displayName = category.replace("_", " "); 
        
        return (
          <button
            key={category}
            aria-pressed={isSelected}
            disabled // Kept disabled until we actually implement filtering
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 ${
              isSelected
                ? "bg-violet-600 text-white shadow-soft"
                : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            {displayName}
          </button>
        );
      })}
    </div>
  );
}