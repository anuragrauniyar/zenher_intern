# Search Baseline & Requirements

## Search Requirement
The system must allow users to find relevant posts. The search will evolve from basic keyword matching (Stage 1) to multi-field weighted ranking (Stage 2), and finally to semantic similarity (Stage 3).

## Searchable Fields & Target Weights
1. **Title:** Highest Importance (Weight: 3)[cite: 3]
2. **Category:** Medium Importance (Weight: 2)[cite: 3]
3. **Content:** Lower Importance (Weight: 1)[cite: 3]

## Expected Behavior
* **Case Insensitivity:** "PCOS", "pcos", and "Pcos" must behave consistently[cite: 3].
* **Partial Matching:** "hormon" must match "Hormones" and "Hormonal"[cite: 3].
* **Multi-field Matching:** Queries should scan title, content, and category[cite: 3].
* **Tie-Breaking:** If relevance is equal, newer posts rank higher[cite: 3].
* **Empty Query:** `query=""` must return the standard community feed, not an error[cite: 3].

## API Contract
`GET /api/posts?query=value`[cite: 3]

## Baseline Test Dataset & Queries

### Group A: Easy Keyword Matches (Expected to pass)[cite: 3]
1. `PCOS`
2. `nutrition`
3. `anxiety`
4. `fatigue`
5. `hormones`

### Group B: Vocabulary Mismatch (Expected to fail/struggle in baseline)[cite: 3]
1. `anxiety after childbirth` (Target: Postpartum mental health)[cite: 3]
2. `food during periods` (Target: Menstrual nutrition)[cite: 3]
3. `can't sleep at night` (Target: Insomnia and hormonal shifts)
4. `sadness and baby` (Target: Maternal health depression)
5. `stomach pain` (Target: Endometriosis / Cramps)

### Group C: Conversational Queries (Expected to fail until semantic search)[cite: 3]
1. `why am I feeling tired all the time before my period`[cite: 3]
2. `what should I eat when I have painful periods`[cite: 3]
3. `how to deal with mood swings after pregnancy`
4. `is it normal to feel exhausted during ovulation`
5. `natural remedies for heavy bleeding and cramps`

## Known Limitations of Current Baseline
* Vocabulary mismatch causes zero results[cite: 3].
* Synonyms are not understood[cite: 3].
* No meaning-based matching[cite: 3].
* Weak relevance ranking (all hits treated equally)[cite: 3].
* Longer conversational queries will likely fail completely[cite: 3].


## Baseline Test Results (Task 2)

| Query                           | Expected Relevant Post      | Returned? | Observation           |
| ------------------------------- | --------------------------- | --------- | --------------------- |
| PCOS                            | Understanding PCOS          | Yes       | Direct keyword match  |
| anxiety                         | Managing Postpartum Anxiety | Yes       | Direct content match  |
| anxiety after childbirth        | Postpartum Mental Health    | No        | Vocabulary mismatch   |
| food during periods             | Menstrual Nutrition Guide   | No        | Different terminology |
| why am I tired before my period | Insomnia/PMS Meditation     | No        | Conversational query  |