import { meilisearchClient } from '../config/meilisearch.js';
import { POST_INDEX_NAME } from '../search/postSearch.types.js';

export const POST_SEARCHABLE_ATTRIBUTES = [
  'title',
  'content',
  'category',
] as const;

async function configurePostSearch() {
  try {
    const index = meilisearchClient.index(POST_INDEX_NAME);
    console.log('Updating post search settings...');

    const task = await index.updateSearchableAttributes([...POST_SEARCHABLE_ATTRIBUTES]);

    // Polling REST API (using the bulletproof method from Task 2/3)
    const host = process.env.MEILISEARCH_HOST || 'http://localhost:7700';
    const apiKey = process.env.MEILISEARCH_MASTER_KEY || '';
    let status = 'enqueued';
    while (status === 'enqueued' || status === 'processing') {
      await new Promise(resolve => setTimeout(resolve, 500));
      const res = await fetch(`${host}/tasks/${task.taskUid}`, {
        headers: { 'Authorization': `Bearer ${apiKey}` }
      });
      status = (await res.json()).status;
    }

    if (status !== 'succeeded') throw new Error(`Task failed: ${status}`);
    console.log('Searchable attributes configured successfully.');
  } catch (error) {
    console.error('Failed to configure settings:', error);
    process.exitCode = 1;
  }
}

configurePostSearch();