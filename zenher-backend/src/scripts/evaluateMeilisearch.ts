import { searchPosts } from '../search/postSearch.service.js';

type SearchEvaluationCategory = 'direct-keyword' | 'vocabulary-mismatch' | 'conversational';

type SearchEvaluationCase = {
  query: string;
  expectedPostId: string;
  category: SearchEvaluationCategory;
};

const SEARCH_EVALUATION_CASES: SearchEvaluationCase[] = [
  // 1. Direct Keyword Queries
  { query: "PCOS", expectedPostId: "f94b0f3c-0400-4d20-9379-79ff7073ffb2", category: "direct-keyword" }, // Understanding PCOS
  { query: "nutrition", expectedPostId: "05100d65-ccc0-4e16-9f6f-cbc7d22f0757", category: "direct-keyword" }, // Menstrual Nutrition Guide
  { query: "anxiety", expectedPostId: "d3a3343c-cdcc-46ba-8d8c-53889176ebcb", category: "direct-keyword" }, // Postpartum Mental Health
  { query: "hormonal imbalance", expectedPostId: "33bfd9f7-cc5d-4464-866d-2237cdffa6d4", category: "direct-keyword" }, // Understanding Hormones Imbalances

  // 2. Vocabulary Mismatch Queries
  { query: "anxiety after childbirth", expectedPostId: "d3a3343c-cdcc-46ba-8d8c-53889176ebcb", category: "vocabulary-mismatch" }, // Postpartum Mental Health
  { query: "food during periods", expectedPostId: "05100d65-ccc0-4e16-9f6f-cbc7d22f0757", category: "vocabulary-mismatch" }, // Menstrual Nutrition Guide
  { query: "irregular monthly cycle", expectedPostId: "f3985436-d75f-4458-99e0-ecd0ae0b9a26", category: "vocabulary-mismatch" }, // Simple Ways to Manage Your Cycle

  // 3. Conversational Queries
  { query: "why am I tired before my period", expectedPostId: "0ddc5fd1-b904-4a06-942b-d3ccc9f87abb", category: "conversational" }, // Insomnia and Hormonal Shifts
  { query: "what foods should I eat when I have painful periods", expectedPostId: "05100d65-ccc0-4e16-9f6f-cbc7d22f0757", category: "conversational" } // Menstrual Nutrition Guide
];

async function runEvaluation() {
  try {
    const results = [];
    let retrievedCount = 0;
    let top3Count = 0;
    let zeroResultCount = 0;

    for (const testCase of SEARCH_EVALUATION_CASES) {
      // Direct call to Meilisearch, bypassing the V2 fallback
      const posts = await searchPosts(testCase.query);
      
      const rankIndex = posts.findIndex((post) => post.id === testCase.expectedPostId);
      const retrieved = rankIndex !== -1;
      const rank = retrieved ? rankIndex + 1 : null;
      
      if (retrieved) retrievedCount++;
      if (rank && rank <= 3) top3Count++;
      if (posts.length === 0) zeroResultCount++;

      results.push({
        query: testCase.query,
        category: testCase.category,
        retrieved,
        rank,
        totalResults: posts.length,
      });
    }

    console.table(results);
    
    const total = SEARCH_EVALUATION_CASES.length;
    console.log('\n--- V3 Evaluation Metrics ---');
    console.table({
      'Retrieval Success Rate': `${((retrievedCount / total) * 100).toFixed(1)}%`,
      'Top-3 Success Rate': `${((top3Count / total) * 100).toFixed(1)}%`,
      'Zero-Result Rate': `${((zeroResultCount / total) * 100).toFixed(1)}%`,
    });
  } catch (error) {
    console.error('Failed to evaluate Meilisearch:', error);
    process.exitCode = 1;
  }
}

runEvaluation();