const PLATFORMS = ['Amazon', 'Ebay', 'Etsy', 'Shopify'];
const STATUSES = ['active', 'inactive', 'draft'];
const TAGS = ['tech', 'fun', 'game', 'app', 'home', 'office'];
const CATEGORIES = [
  'Electronics',
  'Clothing',
  'Toys',
  'Books',
  'Home',
  'Beauty',
];

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomPrice(min = 10, max = 500): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function getRandomTags(): string[] {
  const count = Math.floor(Math.random() * 3) + 1; // 1-3 tags
  const shuffled = [...TAGS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function generateMockProduct(userId: string) {
  const randomId = Math.floor(Math.random() * 1000000); // for unique image url
  return {
    userId,
    imageUrl: `https://picsum.photos/seed/${randomId}/400/400`,
    platform: getRandom(PLATFORMS),
    title: `Sample Product ${randomId}`,
    description: `This is a sample description for product ${randomId}.`,
    tags: getRandomTags(),
    category: getRandom(CATEGORIES),
    price: getRandomPrice(),
    listingData: { extraInfo: `Extra info for product ${randomId}` },
    status: getRandom(STATUSES),
  };
}
