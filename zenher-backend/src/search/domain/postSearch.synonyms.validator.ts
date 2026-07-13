type SynonymConfiguration = Record<string, readonly string[]>;

export function validateSynonymConfiguration(configuration: SynonymConfiguration) {
  for (const [term, synonyms] of Object.entries(configuration)) {
    if (!term.trim()) {
      throw new Error('Synonym term cannot be empty');
    }

    if (synonyms.length === 0) {
      throw new Error(`Synonym list cannot be empty for: ${term}`);
    }

    const normalizedTerm = term.trim().toLowerCase();
    const normalizedSynonyms = synonyms.map((synonym) => synonym.trim().toLowerCase());

    if (normalizedSynonyms.includes(normalizedTerm)) {
      throw new Error(`Self-referencing synonym detected: ${term}`);
    }

    if (new Set(normalizedSynonyms).size !== normalizedSynonyms.length) {
      throw new Error(`Duplicate synonyms detected for: ${term}`);
    }
  }
}