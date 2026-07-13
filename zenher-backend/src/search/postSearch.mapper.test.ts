import { describe, it, expect } from 'vitest';
import { toPostSearchDocument } from './postSearch.mapper.js';

describe('toPostSearchDocument', () => {
  it('maps a Prisma Post to a PostSearchDocument while stripping unnecessary fields', () => {
    const mockDate = new Date('2026-07-12T10:00:00Z');
    
    // Simulating a full Prisma object that might contain internal fields
    const prismaPost = {
      id: 'post-123',
      title: 'Understanding PCOS',
      content: 'Example content',
      category: 'HORMONAL_HEALTH',
      authorId: 'user-456', // Should be stripped
      createdAt: mockDate,
      updatedAt: mockDate // Should be stripped
    };

    const expected = {
      id: 'post-123',
      title: 'Understanding PCOS',
      content: 'Example content',
      category: 'HORMONAL_HEALTH',
      createdAt: mockDate.getTime(),
    };

    const mapped = toPostSearchDocument(prismaPost as any);
    expect(mapped).toEqual(expected);
  });
});