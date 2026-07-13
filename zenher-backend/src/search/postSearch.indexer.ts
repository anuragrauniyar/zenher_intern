import { Post } from "@prisma/client";
import { meilisearchClient } from "../config/meilisearch.js";
import { POST_INDEX_NAME } from "./postSearch.types.js";
import { toPostSearchDocument } from "./postSearch.mapper.js";

export const indexPost = async (post: Post): Promise<void> => {
  const document = toPostSearchDocument(post);
  const index = meilisearchClient.index(POST_INDEX_NAME);

  const task = await index.addDocuments([document], { primaryKey: "id" });

  // Polling REST API to bypass SDK version mismatches
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
    throw new Error(`Failed to index post ${post.id}. Status: ${status}`);
  }
};