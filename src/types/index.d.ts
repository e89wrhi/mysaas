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

export interface Product {
  id?: string; // Supabase auto-generated UUID
  user_id: string; // Clerk user ID
  image_url: string;
  platform: string;
  title?: string;
  description?: string;
  tags?: string[];
  category?: string;
  price?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listing_data?: any; // JSON or any extra data
  status: string;
  created_at: number;
  updated_at: number;
}
