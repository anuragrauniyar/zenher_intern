# Final Search Evaluation Protocol

## 1. Frozen Evaluation Dataset
The evaluation dataset is strictly frozen to the exact user queries and expected database rows defined during Week 4. No data has been modified to artificially inflate Meilisearch's performance.

## 2. Frozen Query Categories
All queries are divided strictly into three categories to isolate failure types:
- **Direct Keyword** (e.g., "PCOS", "nutrition")
- **Vocabulary Mismatch** (e.g., "anxiety after childbirth")
- **Conversational Queries** (e.g., "why am I tired before my period")

## 3. Frozen Evaluation Metrics
Every search version will be judged against three rigid mathematical metrics[cite: 6]:
- **Retrieval Success Rate:** Percentage of queries where the expected document was returned anywhere in the results.
- **Top-3 Success Rate:** Percentage of queries where the expected document ranked in positions 1, 2, or 3.
- **Zero-Result Rate:** Percentage of queries returning an empty array.

## 4. Defined Versions for Comparison
The final evaluation will run a strict comparison across the four architectural phases of the internship[cite: 6]:
- **Search V1:** PostgreSQL basic `ILIKE` substring matching.
- **Search V2:** Custom PostgreSQL lexical search (tokenization + relevance scoring).
- **Search V3:** Raw Meilisearch integration (baseline infrastructure).
- **Search V4:** Domain-Aware Meilisearch (custom synonyms + conversational stop words).

## 5. Protocol Integrity
To maintain engineering integrity, no synonym mappings, stop words, or database rows will be altered after viewing the final V4 evaluation results[cite: 6]. The final metrics are immutable.