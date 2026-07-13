# Search System Architecture & Handover Guide

## 1. System Flow & Responsibilities
This application utilizes a CQRS-inspired approach for search, separating the write path (source of truth) from the read path (search index).
- **PostgreSQL (Source of Truth):** Handles all relational data, foreign keys, user associations, and ACID transactions.
- **Meilisearch (Read Model):** A dedicated search index optimized for sub-15ms lexical retrieval, typo tolerance, and domain-specific query expansion.

## 2. Search Synchronization Strategy
Data consistency between PostgreSQL and Meilisearch is maintained via an asynchronous dual-write pipeline[cite: 6].
1. **Write Path:** When a post is created or updated, the transaction commits to PostgreSQL first. Upon success, an asynchronous task is dispatched to Meilisearch to update the index[cite: 6]. 
2. **Failure Handling:** If the Meilisearch write fails, PostgreSQL remains unaffected, preventing data corruption[cite: 6].
3. **Historical Backfill:** A dedicated backfill script (`npm run search:backfill`) exists to restore or initially populate the Meilisearch index directly from PostgreSQL, acting as our primary disaster recovery tool[cite: 6].

## 3. Search Evolution (V1 to V4)
The architecture evolved through four measured phases to solve specific search bottlenecks[cite: 6]:
- **V1 (Baseline):** PostgreSQL `ILIKE` substring matching. Slow and intolerant of typos[cite: 6].
- **V2 (Lexical Fallback):** Custom PostgreSQL tokenization. Currently serves as our high-availability fallback if Meilisearch goes down[cite: 6].
- **V3 (Infrastructure):** Raw Meilisearch integration. Solved typo tolerance but failed on domain-specific vocabulary mismatches[cite: 6].
- **V4 (Domain-Aware - Final):** Meilisearch augmented with a static medical dictionary and stop-words, doubling search accuracy without the overhead of an LLM or Vector DB[cite: 6].

## 4. Disaster Recovery & Configuration
The search infrastructure is entirely reproducible[cite: 6]. If the Meilisearch container is destroyed:
1. Start a fresh Meilisearch instance[cite: 6].
2. Run `npm run search:configure` to idempotently restore searchable attributes, stop-words, and domain synonyms[cite: 6].
3. Run `npm run search:backfill` to re-index all PostgreSQL data[cite: 6].

## 5. Local Development Setup
**Required Environment Variables:**
- `MEILISEARCH_HOST` (default: `http://localhost:7700`)
- `MEILISEARCH_MASTER_KEY`

**Important Scripts:**
- `npm run search:configure` - Validates and applies domain synonyms and index settings[cite: 6].
- `npm run search:backfill` - Syncs database to search engine[cite: 6].
- `npm run search:evaluate` - Runs the mathematical evaluation against the frozen V4 dataset[cite: 6].