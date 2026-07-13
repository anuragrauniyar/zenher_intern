# ZenHer Backend — High-Availability Domain-Aware Search

A robust Node.js backend powering a women's health community platform[cite: 4]. This project heavily focuses on high-availability system design, demonstrating a complete zero-downtime migration from a basic relational database query to a CQRS-inspired, domain-aware search engine architecture[cite: 4].

## ⚡ The Engineering Problem
Standard text-matching (`ILIKE` or basic tokenization) fails in specialized medical and health domains due to severe vocabulary mismatches (e.g., users searching for "childbirth" when the database contains "postpartum")[cite: 4]. Furthermore, relying on complex Vector Databases or LLMs for a localized problem introduces unnecessary latency, financial cost, and infrastructure bloat[cite: 4]. 

This architecture solves the domain-mismatch problem using a lightweight, statically injected medical dictionary, achieving vector-search-level accuracy with purely lexical speed[cite: 4].

## 🏗️ Architecture Overview

The search infrastructure is designed for fault tolerance and sub-15ms read latency[cite: 4].

*   **Source of Truth (Write Path):** PostgreSQL handles all relational data, foreign keys, and ACID transactions[cite: 4].
*   **Read Model (Search Path):** Meilisearch serves as a dedicated, highly optimized search index[cite: 4].
*   **Asynchronous Dual-Write Pipeline:** When a post is created/updated, the transaction commits to PostgreSQL first[cite: 4]. Upon success, an asynchronous event pushes the document to Meilisearch, decoupling index updates from the critical API response path[cite: 4].
*   **Resilience & V2 Fallback:** If the Meilisearch container crashes, the backend automatically intercepts the connection failure and routes the read query to a custom PostgreSQL lexical search fallback, ensuring zero downtime[cite: 4].

## 📈 Evaluation & Optimization Progression

The system evolved through four strict, mathematically evaluated phases[cite: 4]:

| Version | Architecture | Top-3 Success Rate | Zero-Result Rate | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **V1** | PostgreSQL `ILIKE` | Baseline | Baseline | Intolerant of typos; slow on large datasets[cite: 4]. |
| **V2** | PostgreSQL Lexical | Baseline | Baseline | Custom tokenization; currently maintained as the high-availability fallback[cite: 4]. |
| **V3** | Raw Meilisearch | 33.3% | 33.3% | Solved typo tolerance but failed completely on vocabulary mismatches[cite: 4]. |
| **V4** | Domain-Aware Meilisearch | **77.8%** | **11.1%** | Injected domain synonyms and stop-words doubled accuracy without AI overhead[cite: 4]. |

## 🛠️ Disaster Recovery & Idempotency

The entire search state is reproducible from version-controlled configuration[cite: 4]. If the search infrastructure is completely lost[cite: 4]:

1.  **Re-Initialize Engine:** Spin up a fresh Meilisearch instance[cite: 4].
2.  **Configure:** Run `npm run search:configure` to idempotently validate and apply searchable attributes, stop-words, and the domain synonym dictionary[cite: 4].
3.  **Backfill:** Run `npm run search:backfill` to safely stream and re-index all historical data from PostgreSQL[cite: 4].

## 🚀 Local Development Setup

### Prerequisites
*   Node.js (v18+)[cite: 4]
*   PostgreSQL[cite: 4]
*   Docker (for Meilisearch)[cite: 4]

### Installation
1.  Clone the repository and install dependencies[cite: 4]:
    ```bash
    npm install
    ```
2.  Start the Meilisearch container[cite: 4]:
    ```bash
    docker compose up -d
    ```
3.  Set your `.env` variables[cite: 4]:
    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/zenher"
    MEILISEARCH_HOST="http://localhost:7700"
    MEILISEARCH_MASTER_KEY="your_master_key"
    ```

### Critical Scripts
*   `npm run dev`: Starts the local development server[cite: 4].
*   `npm run search:configure`: Validates and pushes static domain configuration to the index[cite: 4].
*   `npm run search:backfill`: Synchronizes existing database rows to the search engine[cite: 4].
*   `npm run search:evaluate`: Runs the mathematical evaluation against the frozen V4 test dataset[cite: 4].

## ⚠️ Known Limitations
*   **Stale Documents:** Documents deleted directly via the database (bypassing the API) will leave orphaned records in the search index until a manual sync is run[cite: 4].
*   **Manual Vocabulary Maintenance:** The static synonym dictionary is highly precise but requires manual updates[cite: 4]. It does not automatically discover emerging user slang or terminology[cite: 4].