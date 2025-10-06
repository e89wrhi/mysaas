import { User } from '@prisma/client';
import { Icons } from '@/components/shared/icons';

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  mailSupport: string;
  links: {
    twitter: string;
    github: string;
  };
}

export interface NavItem {
  title: string;
  href: string;
  badge?: number;
  disabled?: boolean;
  external?: boolean;
  authorizeOnly?: UserRole;
  icon?: keyof typeof Icons;
}

export type MainNavItem = NavItem;

export interface MarketingConfig {
  mainNav: MainNavItem[];
}

export interface SidebarNavItem {
  title: string;
  items: NavItem[];
  authorizeOnly?: UserRole;
  icon?: keyof typeof Icons;
}

export interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

// subcriptions
export interface SubscriptionPlan {
  title: string;
  description: string;
  benefits: string[];
  limitations: string[];
  prices: {
    monthly: number;
    yearly: number;
  };
  stripeIds: {
    monthly: string | null;
    yearly: string | null;
  };
}

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, 'stripeCustomerId' | 'stripeSubscriptionId' | 'stripePriceId'> & {
    stripeCurrentPeriodEnd: number;
    isPaid: boolean;
    interval: 'month' | 'year' | null;
    isCanceled?: boolean;
  };

// compare plans
export type ColumnType = string | boolean | null;
export type PlansRow = { feature: string; tooltip?: string } & Record<
  (typeof plansColumns)[number],
  ColumnType
>;

// landing sections
export interface InfoList {
  icon: keyof typeof Icons;
  title: string;
  description: string;
}

export interface InfoLdg {
  title: string;
  image: string;
  description: string;
  list: InfoList[];
}

export interface FeatureLdg {
  title: string;
  description: string;
  link: string;
  icon: keyof typeof Icons;
}

export interface TestimonialType {
  name: string;
  job: string;
  image: string;
  review: string;
}

// shop types

export interface CartProduct {
  id: string;
  handle: string;
  title: string;
  featuredImage: Image;
}

export interface CartItem {
  id: string | undefined;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: CartProduct;
  };
}

export type Collection = ShopCollection & {
  path: string;
};

export interface Image {
  url: string;
  altText: string;
  width: number;
  height: number;
}

export interface Menu {
  title: string;
  path: string;
}

export interface Money {
  amount: string;
  currencyCode: string;
}

export interface Page {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
}

export type Product = Omit<ShopProduct, 'variants' | 'images'> & {
  variants: ProductVariant[];
  images: Image[];
};

export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface ProductVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
}

export interface SEO {
  title: string;
  description: string;
}

export interface ShopCart {
  id: string | undefined;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: Connection<CartItem>;
  totalQuantity: number;
}

export interface ShopCollection {
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  updatedAt: string;
}

export interface ShopProduct {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  variants: Connection<ProductVariant>;
  featuredImage: Image;
  images: Connection<Image>;
  seo: SEO;
  tags: string[];
  updatedAt: string;
}

export interface ShopCartOperation {
  data: {
    cart: ShopCart;
  };
  variables: {
    cartId: string;
  };
}

export interface ShopCreateCartOperation {
  data: { cartCreate: { cart: ShopCart } };
}

export interface ShopAddToCartOperation {
  data: {
    cartLinesAdd: {
      cart: ShopCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      merchandiseId: string;
      quantity: number;
    }[];
  };
}

export interface ShopRemoveFromCartOperation {
  data: {
    cartLinesRemove: {
      cart: ShopCart;
    };
  };
  variables: {
    cartId: string;
    lineIds: string[];
  };
}

export interface ShopUpdateCartOperation {
  data: {
    cartLinesUpdate: {
      cart: ShopCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      id: string;
      merchandiseId: string;
      quantity: number;
    }[];
  };
}

export interface ShopCollectionOperation {
  data: {
    collection: ShopCollection;
  };
  variables: {
    handle: string;
  };
}

export interface ShopCollectionProductsOperation {
  data: {
    collection: {
      products: Connection<ShopProduct>;
    };
  };
  variables: {
    handle: string;
    reverse?: boolean;
    sortKey?: string;
  };
}

export interface ShopCollectionsOperation {
  data: {
    collections: Connection<ShopCollection>;
  };
}

export interface ShopMenuOperation {
  data: {
    menu?: {
      items: {
        title: string;
        url: string;
      }[];
    };
  };
  variables: {
    handle: string;
  };
}

export interface ShopPageOperation {
  data: { pageByHandle: Page };
  variables: { handle: string };
}

export interface ShopPagesOperation {
  data: {
    pages: Connection<Page>;
  };
}

export interface ShopProductOperation {
  data: { product: ShopProduct };
  variables: {
    handle: string;
  };
}

export interface ShopProductRecommendationsOperation {
  data: {
    productRecommendations: ShopProduct[];
  };
  variables: {
    productId: string;
  };
}

export interface ShopProductsOperation {
  data: {
    products: Connection<ShopProduct>;
  };
  variables: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
  };
}
