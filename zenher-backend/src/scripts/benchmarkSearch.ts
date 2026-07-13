import { meilisearchClient } from '../config/meilisearch.js';
import { POST_INDEX_NAME } from '../search/postSearch.types.js';

async function runBenchmark() {
  const index = meilisearchClient.index(POST_INDEX_NAME);
  const queries = ['nutrition', 'PCOS', 'anxiety after childbirth', 'food during periods', 'what foods should I eat'];
  
  console.log('--- Meilisearch Read Latency Benchmark ---');
  
  let totalTime = 0;
  let minTime = Infinity;
  let maxTime = 0;

  for (const query of queries) {
    // Warmup query (not timed)
    await index.search(query, { limit: 1 });
    
    // Timed query
    const start = performance.now();
    await index.search(query, { limit: 10 });
    const end = performance.now();
    
    const duration = end - start;
    totalTime += duration;
    if (duration < minTime) minTime = duration;
    if (duration > maxTime) maxTime = duration;
    
    console.log(`Query: "${query}" - ${duration.toFixed(2)}ms`);
  }

  const avgTime = totalTime / queries.length;
  console.log('------------------------------------------');
  console.log(`Min Response Time: ${minTime.toFixed(2)}ms`);
  console.log(`Max Response Time: ${maxTime.toFixed(2)}ms`);
  console.log(`Avg Response Time: ${avgTime.toFixed(2)}ms`);
}

runBenchmark().catch(console.error);