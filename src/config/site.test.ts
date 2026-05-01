import { describe, it, expect, vi } from 'vitest';
import { siteConfig, FooterLinks } from './site';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@/../env.mjs', () => ({
  env: {
    NEXT_PUBLIC_APP_URL: 'http://localhost:3000',
  },
}));

// Mock the image import
vi.mock('@/assets/lamp_icon.png', () => ({
  default: { src: '/mock-image.png' },
}));

describe('siteConfig', () => {
  it('should have correct basic information', () => {
    expect(siteConfig.name).toBe('Port');
    expect(siteConfig.url).toBe('http://localhost:3000');
  });
});

describe('FooterLinks', () => {
  it('should return correct structure', () => {
    const links = FooterLinks();
    expect(links).toBeDefined();
    expect(links.length).toBeGreaterThan(0);
    expect(links[0].title).toBe('footer.companyTitle');
  });
});
