import { Meilisearch } from 'meilisearch';
import dotenv from 'dotenv';

dotenv.config();

const host = process.env.MEILISEARCH_HOST;
const apiKey = process.env.MEILISEARCH_MASTER_KEY;

if (!host || !apiKey) {
  throw new Error("Missing Meilisearch environment variables. Check MEILISEARCH_HOST and MEILISEARCH_MASTER_KEY.");
}

export const meilisearchClient = new Meilisearch({
  host,
  apiKey,
});