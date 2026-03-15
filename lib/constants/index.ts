// lib/constants/index.ts
export const ITEMS_PER_PAGE = 12;

export const SORT_OPTIONS = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Highest Rated" },
  { value: "title-asc", label: "Name: A to Z" },
] as const;

export const PAYMENT_METHODS = [
  { value: "credit-card", label: "Credit Card" },
  { value: "paypal", label: "PayPal" },
  { value: "bank-transfer", label: "Bank Transfer" },
] as const;

export const SHIPPING_COST = 9.99;
export const FREE_SHIPPING_THRESHOLD = 100;
