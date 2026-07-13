# Search Version Comparison

## Versions
* **V1:** PostgreSQL entire-query substring search.
* **V2:** Custom improved lexical search with tokenization and relevance ranking.
* **V3.1:** Meilisearch with explicit searchable attributes (title, content, category).

## Overall Metrics (V3.1)
| Metric | Result |
|---|---|
| Retrieval Success Rate | 33.3% |
| Top-3 Success Rate | 33.3% |
| Zero-Result Rate | 33.3% |

## Failure Analysis
* **Direct Keyword Queries:** Strong performance. Handled exact matches and typos natively.
* **Vocabulary Mismatch Queries:** 0% success. Meilisearch completely failed to map colloquial terms to medical terms (e.g., "childbirth" vs "postpartum", "period" vs "menstrual").
* **Conversational Queries:** 0% success. High noise from stop words ("what", "why", "I") combined with vocabulary mismatch resulted in irrelevant or zero results.

## Strategic Decision for Week 7
The data clearly shows that retrieval infrastructure is no longer the bottleneck; **domain understanding is.** 

Instead of aggressively tweaking Meilisearch's internal ranking weights or blindly adding generic stop words, Week 7 will focus exclusively on building a **Domain-Aware Query Understanding Layer**. We will inject medical and colloquial synonyms (e.g., mapping period ↔ menstruation) into the pipeline to solve the 0% success rate in vocabulary mismatches.