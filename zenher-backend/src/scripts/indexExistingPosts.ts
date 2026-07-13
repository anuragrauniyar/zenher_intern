import { prisma } from '../config/database.js'; // Adjust path if necessary
import { meilisearchClient } from '../config/meilisearch.js';
import { POST_INDEX_NAME } from '../search/postSearch.types.js';
import { toPostSearchDocument } from '../search/postSearch.mapper.js';

const indexExistingPosts = async () => {
  try {
    console.log("Reading posts from PostgreSQL...");
    const posts = await prisma.post.findMany();

    if (posts.length === 0) {
      console.log("No posts found to index.");
      return;
    }

    console.log(`Found ${posts.length} posts. Mapping to search documents...`);
    const documents = posts.map(toPostSearchDocument);
    const index = meilisearchClient.index(POST_INDEX_NAME);

    console.log("Sending documents to Meilisearch...");
    const task = await index.addDocuments(documents, { primaryKey: "id" });

    console.log(`Waiting for Meilisearch task (UID: ${task.taskUid}) to complete...`);
    
    const host = process.env.MEILISEARCH_HOST || 'http://localhost:7700';
    const apiKey = process.env.MEILISEARCH_MASTER_KEY || '';
    
    let status = 'enqueued';
    while (status === 'enqueued' || status === 'processing') {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const response = await fetch(`${host}/tasks/${task.taskUid}`, {
        headers: { 'Authorization': `Bearer ${apiKey}` }
      });
      
      const taskData = await response.json();
      status = taskData.status;
    }

    if (status !== 'succeeded') {
      throw new Error(`Indexing failed with status: ${status}`);
    }

    console.log(`Successfully indexed ${documents.length} posts.`);
    
    const stats = await index.getStats();
    console.log(`Verification: ${stats.numberOfDocuments} documents currently in '${POST_INDEX_NAME}' index.`);

  } catch (error) {
    console.error("Failed to index posts:", error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
};

indexExistingPosts();