# Week 7 — Domain-Aware Search Improvement Plan

## Problem
Search V3.1 (Meilisearch) improved generic lexical retrieval and typo handling, but evaluation revealed recurring failures caused by differences between user vocabulary and terminology used in community posts.

## Evidence
Our V3.1 evaluation yielded a 33.3% overall success rate, completely failing on the following queries:
| Query | Expected Post | Failure Type | Likely Cause |
|---|---|---|---|
| anxiety after childbirth | Postpartum Mental Health | Retrieval (0 results) | Vocabulary mismatch (childbirth ↔ postpartum) |
| food during periods | Menstrual Nutrition Guide | Retrieval (0 results) | Vocabulary mismatch (food ↔ nutrition, periods ↔ menstrual) |
| irregular monthly cycle | Simple Ways to Manage Your Cycle | Retrieval (0 results) | Vocabulary mismatch (monthly ↔ cycle) |
| why am I tired before my period | Insomnia and Hormonal Shifts | Retrieval (0 results) | Conversational Noise / Vocabulary Mismatch |
| what foods should I eat when I have painful periods | Menstrual Nutrition Guide | Retrieval (0 results) | Conversational Noise / Vocabulary Mismatch |

## Dominant Failure Pattern
The dominant failure pattern is **Vocabulary Mismatch**. The search engine fails to map colloquial user terminology to the medical/formal terminology used by the authors of the posts.

## Decision
Introduce controlled domain vocabulary expansion using Meilisearch synonym configuration. 

## Goals
- Improve vocabulary mismatch queries[cite: 7].
- Preserve direct keyword performance[cite: 7].
- Avoid unnecessary custom search infrastructure[cite: 7].
- Prevent broad synonym expansion from reducing precision[cite: 7].
- Evaluate improvements using the preserved dataset[cite: 7].

## Non-Goals
We are explicitly avoiding:
- Semantic search[cite: 7].
- Embeddings and vector databases[cite: 7].
- LLM query understanding[cite: 7].
- Custom ontology or knowledge graphs[cite: 7].

## Success Criteria
Compare the new search version (V3.2) against V3.1 using:
- Retrieval success rate[cite: 7].
- Top-3 success rate[cite: 7].
- Zero-result rate[cite: 7].
- Query-level regression analysis[cite: 7].

## Search V4 — Domain-Aware Vocabulary Expansion[cite: 6]

**Pipeline:**
User Query → Meilisearch → Domain Synonym Matching → Candidate Retrieval → Built-In Ranking → Results[cite: 6]

**Characteristics:**
- Dedicated search infrastructure[cite: 6]
- Built-in typo tolerance[cite: 6]
- Explicit searchable attributes[cite: 6]
- Controlled domain vocabulary expansion[cite: 6]
- Evaluation-driven synonym configuration[cite: 6]

**Purpose:**
Improve recurring vocabulary mismatch failures identified during Search V3 evaluation[cite: 6].

**Limitations:**
- Synonym relationships require manual maintenance[cite: 6]
- Vocabulary coverage remains limited[cite: 6]
- Incorrect synonym mappings may reduce precision[cite: 6]
- This is not semantic search[cite: 6]