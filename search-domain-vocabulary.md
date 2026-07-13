# Search Domain Vocabulary[cite: 6]

## Purpose
Document domain synonym relationships introduced to improve recurring vocabulary mismatches identified during search evaluation[cite: 6].

## Inclusion Criteria
A synonym relationship is added only when:
- Evaluation demonstrates a recurring vocabulary mismatch[cite: 6].
- Terms represent sufficiently equivalent search intent[cite: 6].
- The mapping improves relevant retrieval[cite: 6].
- Existing successful queries do not significantly regress[cite: 6].

## Current Synonyms[cite: 6]
| Term | Synonym | Evidence |
|---|---|---|
| childbirth | postpartum | Failed evaluation query: "anxiety after childbirth" |
| period / periods | menstruation / menstrual | Failed evaluation query: "food during periods" |
| food / foods | nutrition | Failed evaluation query: "food during periods" |
| monthly | menstrual | Failed evaluation query: "irregular monthly cycle" |

## Rejected Relationships[cite: 6]
- `period` ↔ `cramps` (Rejected: Related, but not equivalent. Searching for a period tracker should not heavily weight cramp medication)[cite: 6].

## Limitations
- Manually maintained[cite: 6].
- Incomplete vocabulary coverage[cite: 6].
- Domain terminology evolves[cite: 6].
- Incorrect expansion may reduce precision[cite: 6].