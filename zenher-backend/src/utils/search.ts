const STOP_WORDS = new Set([
  "a", "an", "the", "is", "are", "am", "i", "me", "my",
  "what", "why", "how", "should", "can", "could", "during",
  "to", "for", "of", "in", "on", "and", "or"
]);

export const normalizeQuery = (query: string): string => {
  return query
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, " ") // Strips punctuation
    .replace(/\s+/g, " "); // Collapses multiple spaces
};

export const tokenizeQuery = (normalizedQuery: string): string[] => {
  return normalizedQuery.split(" ").filter(Boolean);
};

export const processSearchQuery = (query: string): string[] => {
  const normalized = normalizeQuery(query);
  const tokens = tokenizeQuery(normalized);

  const meaningfulTokens = tokens.filter(
    (token) => token.length > 1 && !STOP_WORDS.has(token)
  );

  const deduplicated = [...new Set(meaningfulTokens)];

  if (deduplicated.length === 0 && normalized) {
    return [normalized];
  }

  const MAX_SEARCH_TERMS = 8;
  return deduplicated.slice(0, MAX_SEARCH_TERMS);
};


export const SEARCH_WEIGHTS = {
  EXACT_TITLE: 10,
  EXACT_CONTENT: 5,
  CATEGORY: 4,
  TITLE_TOKEN: 3,
  CONTENT_TOKEN: 1,
} as const;

export type SearchablePost = {
  title: string;
  content: string;
  category?: string;
};

export const calculateRelevanceScore = (
  post: SearchablePost,
  normalizedQuery: string,
  terms: string[]
): number => {
  let score = 0;

  const normalizedTitle = normalizeQuery(post.title);
  const normalizedContent = normalizeQuery(post.content);
  
  // Replace underscores with spaces for enums like MATERNAL_HEALTH
  const normalizedCategory = post.category 
    ? normalizeQuery(post.category.replace(/_/g, " ")) 
    : "";

  // 1. Exact Phrase Matches
  if (normalizedQuery && normalizedTitle.includes(normalizedQuery)) {
    score += SEARCH_WEIGHTS.EXACT_TITLE;
  }
  if (normalizedQuery && normalizedContent.includes(normalizedQuery)) {
    score += SEARCH_WEIGHTS.EXACT_CONTENT;
  }
  if (normalizedQuery && normalizedCategory && normalizedCategory.includes(normalizedQuery)) {
    score += SEARCH_WEIGHTS.CATEGORY;
  }

  // 2. Individual Token Matches
  for (const term of terms) {
    if (normalizedTitle.includes(term)) {
      score += SEARCH_WEIGHTS.TITLE_TOKEN;
    }
    if (normalizedContent.includes(term)) {
      score += SEARCH_WEIGHTS.CONTENT_TOKEN;
    }
  }

  return score;
};


export type ScoredPost<T> = {
  post: T;
  score: number;
};

export const rankPosts = <T extends { id: string; createdAt: Date }>(
  scoredPosts: ScoredPost<T>[]
): ScoredPost<T>[] => {
  return [...scoredPosts].sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }

    const timeDifference = b.post.createdAt.getTime() - a.post.createdAt.getTime();
    if (timeDifference !== 0) {
      return timeDifference;
    }

    return a.post.id.localeCompare(b.post.id);
  });
};