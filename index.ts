export type ProductCategory =
  | 'gajras'
  | 'flowers'
  | 'bandanas'
  | 'keychains'
  | 'bags'
  | 'headbands'
  | 'miniatures'
  | 'custom';

export interface ProductColor {
  name: string;
  hex: string;
  previewUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  shortDescription: string;
  description: string;
  leadTime: string;
  yarnMaterial: string;
  dimensions?: string;
  colors: ProductColor[];
  variations?: { name: string; priceDelta: number }[];
  image: string;
  secondaryImage?: string;
  badge?: 'Bestseller' | 'New' | 'Gift Favorite' | 'Handmade Special';
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  id: string; // unique item id composed of productId + color + variation
  product: Product;
  quantity: number;
  selectedColor: ProductColor;
  selectedVariation?: string;
  itemPrice: number;
  customNote?: string;
}

export interface CustomerOrderData {
  orderId: string;
  fullName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  specialInstructions?: string;
  isGiftWrap: boolean;
  giftMessage?: string;
  items: {
    name: string;
    quantity: number;
    color: string;
    variation?: string;
    price: number;
  }[];
  subtotal: number;
  shipping: number;
  total: number;
  orderDate: string;
}

export interface CustomInquiry {
  fullName: string;
  phone: string;
  email?: string;
  itemType: string;
  colorScheme: string;
  referenceNotes: string;
  neededByDate?: string;
  budget?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  city: string;
  rating: number;
  text: string;
  productPurchased: string;
  date: string;
}
