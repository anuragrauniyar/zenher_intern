# Search Baseline Evaluation

## 1. Objective
To evaluate the current keyword search baseline, identify concrete failure patterns, measure its effectiveness, and use these findings to justify architectural improvements for the next iteration[cite: 6].

## 2. Baseline Implementation
The current system executes a case-insensitive substring match against the PostgreSQL database[cite: 6]. 
Backend logic: `title ILIKE '%query%' OR content ILIKE '%query%'`[cite: 6].

## 3. Dataset
15 community posts seeded in the database covering topics like PCOS, endometriosis, maternal health, nutrition, and mental health.

## 4. Query Categories
*   **Direct Keyword:** Single terms likely to exist exactly in the text (e.g., "PCOS").
*   **Vocabulary Mismatch:** Synonyms or related terms not explicitly used in the text (e.g., "food during periods").
*   **Conversational:** Natural language queries (e.g., "why am I tired before my period").

## 5. Evaluation Methodology
15 queries were executed manually against the `/api/posts?query=` endpoint. Both retrieval (did it find the right post?) and ranking (was it at the top?) were measured[cite: 6].

## 6. Results

| ID | Query | Expected Post | Returned? | Rank | Observation |
|---|---|---|---|---|---|
| Q1 | PCOS | Understanding PCOS | Yes | 1 | Exact keyword match. |
| Q2 | endometriosis | Managing Endometriosis | Yes | 1 | Exact keyword match. |
| Q3 | menopause | Navigating Menopause Symptoms | Yes | 1 | Exact keyword match. |
| Q4 | sleep quality | Insomnia and Hormonal Shifts | Yes | 1 | Exact phrase substring match. |
| Q5 | pregnancy | Pregnancy and Iron Deficiency | Yes | 1 | Exact keyword match. |
| Q6 | hormonal | Insomnia and Hormonal Shifts | Yes | 2 | Exact substring match. |
| Q7 | meditation | Meditation for Premenstrual Syndrome| Yes | 1 | Exact keyword match. |
| Q8 | irregular cycle | Understanding PCOS | No | — | Exact Substring Dependency ("cycles" vs "cycle"). |
| Q9 | iron foods | Menstrual Nutrition Guide | No | — | Exact Substring Dependency ("iron-rich foods"). |
| Q10 | anxiety after childbirth | Postpartum Mental Health | No | — | Vocabulary mismatch[cite: 6]. |
| Q11 | food during periods | Menstrual Nutrition Guide | No | — | Synonym mismatch[cite: 6]. |
| Q12 | workout phases | Cycle Syncing Your Workouts | No | — | Vocabulary mismatch[cite: 6]. |
| Q13 | tired before my period | Hydration Benefits / PMS | No | — | Conversational query[cite: 6]. |
| Q14 | why am I tired before my period | Hormonal Imbalance | No | — | Long query failure[cite: 6]. |
| Q15 | foods for painful periods | Menstrual Nutrition Guide | No | — | Entire-query substring failure[cite: 6]. |

## 7. Retrieval Success Rate
*   Relevant expected post retrieved: 7
*   Total queries: 15
*   **Success Rate: 46.6%**[cite: 6]

## 8. Top-3 Success Rate
*   Expected post appears in top 3: 7
*   Total queries: 15
*   **Success Rate: 46.6%**[cite: 6] (Because ranking is purely `createdAt DESC`, retrieval essentially equals ranking in a small dataset).

## 9. Zero Result Rate
*   Queries returning no results: 8
*   Total queries: 15
*   **Zero Result Rate: 53.3%**[cite: 6]

## 10. Results by Query Type

| Query Type | Total | Successful | Success Rate |
|---|---|---|---|
| Direct Keyword / Phrase | 7 | 7 | 100% |
| Vocabulary / Synonym Mismatch | 4 | 0 | 0% |
| Exact Substring Dependency | 2 | 0 | 0% |
| Conversational / Long Query | 2 | 0 | 0% |

## 11. Failure Analysis

### Vocabulary Mismatch
Users search for concepts (e.g., "childbirth") while the database stores specific medical or professional terminology (e.g., "postpartum")[cite: 6]. Keyword search fundamentally fails here.

### Synonym Mismatch
Queries like "food during periods" fail because the content uses "Dietary habits" or "menstrual"[cite: 6]. The engine lacks semantic understanding.

### Conversational Queries
Queries formatted as questions ("why am I tired before my period") fail entirely because the specific string of characters does not exist in any post[cite: 6].

### Weak Ranking
Currently, results are ordered strictly by `createdAt DESC`[cite: 6]. A post containing the keyword once in the content will rank higher than a post with the keyword in the title if it is newer.

### Exact Substring Dependency
The system treats the entire query as a single strict string. A search for "iron foods" fails because the text says "iron-rich foods"[cite: 6]. The engine does not evaluate tokens independently.

### Long Query Failure
Multi-word queries are guaranteed to fail unless the author wrote that exact sentence verbatim[cite: 6].

## 12. Performance Limitation
The current query relies on `ILIKE '%query%'`[cite: 6]. Because of the leading wildcard `%`, PostgreSQL cannot effectively utilize standard B-tree indexes[cite: 6]. This requires a full table scan, which will aggressively degrade database performance as the community feed scales[cite: 6].

## 13. Proposed Improvements
To address the >50% failure rate caused largely by exact substring dependencies and lack of tokenization, the next iteration (Week 5) must implement an Improved Keyword Search involving:
1. Query Normalization[cite: 6]
2. Tokenization (breaking queries into individual words)[cite: 6]
3. Multi-token Matching (searching terms independently)[cite: 6]
4. Field Weighting (prioritizing Title matches over Content matches)[cite: 6]
5. Relevance Scoring[cite: 6]

## 14. Conclusion
The baseline keyword search operates reliably only for exact, single-term queries. It is completely ineffective for natural human behavior, including conversational phrasing, synonyms, and multi-word conceptual searches. An immediate architectural shift to a tokenized, weighted search mechanism is required before attempting semantic or vector-based embeddings.