# Search System Performance Review

## 1. Read Latency (Local Benchmarking)
A benchmarking script was run against the Meilisearch instance to measure minimum, maximum, and average response times[cite: 6].
- **Min Response Time:** 9.06ms[cite: 6]
- **Max Response Time:** 29.03ms[cite: 6]
- **Average Response Time:** 14.89ms[cite: 6]

*Note: These benchmarks were run in a local development environment[cite: 6]. They do not represent production-scale performance or account for network latency, but they confirm the highly efficient retrieval capabilities of the engine.*[cite: 6]

## 2. Write Latency & Synchronous Overhead
When a post is created in PostgreSQL, it is immediately dispatched to Meilisearch[cite: 6]. Meilisearch's write operations are asynchronous by design. Our backend pushes the document and immediately returns a response to the client, avoiding any synchronous indexing overhead on the critical API path[cite: 6].

## 3. Query Optimization
To prevent unnecessary database queries[cite: 6], when the backend receives search results from Meilisearch, it retrieves any required relational data (e.g., author information) using batch `IN` queries rather than sequential lookups, avoiding the N+1 query bottleneck.