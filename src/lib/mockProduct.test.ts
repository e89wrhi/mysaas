import { describe, it, expect } from 'vitest';
import { generateMockProduct } from './mockProduct';

describe('mockProduct', () => {
  it('should generate a product with the correct userId', () => {
    const userId = 'user_123';
    const product = generateMockProduct(userId);
    expect(product.userId).toBe(userId);
  });

  it('should have all required fields', () => {
    const product = generateMockProduct('test');
    expect(product).toHaveProperty('imageUrl');
    expect(product).toHaveProperty('platform');
    expect(product).toHaveProperty('title');
    expect(product).toHaveProperty('description');
    expect(product).toHaveProperty('tags');
    expect(product).toHaveProperty('category');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('status');
  });

  it('should generate a valid price', () => {
    const product = generateMockProduct('test');
    expect(product.price).toBeGreaterThanOrEqual(10);
    expect(product.price).toBeLessThanOrEqual(500);
  });
});
