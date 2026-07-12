import { describe, it, expect } from 'vitest';
import { rankPosts } from './search.js';

describe('rankPosts', () => {
  const dateNew = new Date('2026-06-25T10:00:00Z');
  const dateOld = new Date('2026-06-20T10:00:00Z');

  it('ranks higher scores first', () => {
    const posts = [
      { post: { id: '1', createdAt: dateNew }, score: 5 },
      { post: { id: '2', createdAt: dateNew }, score: 10 },
    ];
    const ranked = rankPosts(posts);
    expect(ranked[0].post.id).toBe('2');
  });

  it('breaks ties using recency', () => {
    const posts = [
      { post: { id: '1', createdAt: dateOld }, score: 10 },
      { post: { id: '2', createdAt: dateNew }, score: 10 },
    ];
    const ranked = rankPosts(posts);
    expect(ranked[0].post.id).toBe('2');
  });

  it('breaks ties using ID if score and date are identical', () => {
    const posts = [
      { post: { id: 'b', createdAt: dateNew }, score: 10 },
      { post: { id: 'a', createdAt: dateNew }, score: 10 },
    ];
    const ranked = rankPosts(posts);
    expect(ranked[0].post.id).toBe('a');
  });

  it('does not mutate the original array', () => {
    const posts = [{ post: { id: '1', createdAt: dateNew }, score: 10 }];
    const original = [...posts];
    rankPosts(posts);
    expect(posts).toEqual(original);
  });
});