import { meilisearchClient } from '../config/meilisearch.js';
import { POST_INDEX_NAME } from '../search/postSearch.types.js';
import { POST_SEARCHABLE_ATTRIBUTES, POST_SEARCH_STOP_WORDS } from '../search/postSearch.settings.js';
import { POST_SEARCH_SYNONYMS } from '../search/domain/postSearch.synonyms.js';
import { validateSynonymConfiguration } from '../search/domain/postSearch.synonyms.validator.js';

async function waitForSuccessfulTask(taskUid: number, operation: string) {
  const host = process.env.MEILISEARCH_HOST || 'http://localhost:7700';
  const apiKey = process.env.MEILISEARCH_MASTER_KEY || '';
  let status = 'enqueued';

  while (status === 'enqueued' || status === 'processing') {
    await new Promise(resolve => setTimeout(resolve, 500));
    const res = await fetch(`${host}/tasks/${taskUid}`, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    status = (await res.json()).status;
  }

  if (status !== 'succeeded') {
    throw new Error(`${operation} failed with status: ${status}`);
  }
}

async function configurePostSearch() {
  try {
    // 1. Validate domain configuration before doing anything
    validateSynonymConfiguration(POST_SEARCH_SYNONYMS);

    console.log('Post search configuration summary:');
    console.log({
      searchableAttributes: POST_SEARCHABLE_ATTRIBUTES.length,
      synonymTerms: Object.keys(POST_SEARCH_SYNONYMS).length,
      stopWords: POST_SEARCH_STOP_WORDS.length
    });

    const index = meilisearchClient.index(POST_INDEX_NAME);

    // 2. Apply settings
    const attributesTask = await index.updateSearchableAttributes([...POST_SEARCHABLE_ATTRIBUTES]);
    await waitForSuccessfulTask(attributesTask.taskUid, 'Searchable attributes configuration');

    const synonymsTask = await index.updateSynonyms(POST_SEARCH_SYNONYMS);
    await waitForSuccessfulTask(synonymsTask.taskUid, 'Synonym configuration');

    const stopWordsTask = await index.updateStopWords([...POST_SEARCH_STOP_WORDS]);
    await waitForSuccessfulTask(stopWordsTask.taskUid, 'Stop words configuration');

    console.log('Post search configured successfully.');
  } catch (error) {
    console.error('Failed to configure post search:', error);
    process.exitCode = 1;
  }
}

configurePostSearch();