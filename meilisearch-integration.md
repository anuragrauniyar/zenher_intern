# ADR-006: Introduce Meilisearch for Community Post Search

## Status
Accepted

## Context
The existing PostgreSQL-based search (Search V2) evolved from simple substring matching to a custom Node.js pipeline handling query normalization, candidate retrieval, token scoring, and deterministic ranking.

While Search V2 successfully solved multi-term conversational queries, expanding it to handle typo tolerance, intelligent synonyms, prefix matching, and scalable ranking would require building complex search infrastructure from scratch. 

## Decision
We will introduce Meilisearch as a dedicated search engine. 
- **PostgreSQL** will remain the authoritative Source of Truth.
- **Meilisearch** will act as a derived, denormalized search index optimized purely for discovery.

## Alternatives Considered
1. **Continue extending custom PostgreSQL search:** Rejected due to scaling limitations and the engineering cost of building typo-tolerance manually.
2. **Elasticsearch / OpenSearch:** Rejected as overly complex for the current startup phase. The overhead of managing analyzers, index lifecycle, and BM25 configuration is too high compared to our immediate needs.

## Consequences
- **Positive:** Out-of-the-box typo tolerance, fast prefix search, scalable ranking, and a foundation for the upcoming Domain-Aware Query Layer.
- **Negative:** Introduces eventual consistency (indexing delays), requires data synchronization pipelines, and adds infrastructure deployment complexity.