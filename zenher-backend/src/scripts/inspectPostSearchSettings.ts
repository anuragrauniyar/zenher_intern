import { meilisearchClient } from '../config/meilisearch.js';
import { POST_INDEX_NAME } from '../search/postSearch.types.js';

async function inspectPostSearchSettings() {
  try {
    const index = meilisearchClient.index(POST_INDEX_NAME);
    const settings = await index.getSettings();
    console.log('Current Meilisearch settings:');
    console.dir(settings, { depth: null });
  } catch (error) {
    console.error('Failed to inspect Meilisearch settings:', error);
    process.exitCode = 1;
  }
}

inspectPostSearchSettings();