import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, CustomerOrderData, Product, ProductColor } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (
    product: Product,
    color: ProductColor,
    variation?: string,
    quantity?: number,
    customNote?: string
  ) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  shipping: number;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isCustomOrderOpen: boolean;
  setIsCustomOrderOpen: (open: boolean) => void;
  completedOrder: CustomerOrderData | null;
  setCompletedOrder: (order: CustomerOrderData | null) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'blooms_crochet_cart_v1';
const FREE_SHIPPING_THRESHOLD = 1499;
const FLAT_SHIPPING = 80;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCustomOrderOpen, setIsCustomOrderOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<CustomerOrderData | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage quota errors
    }
  }, [items]);

  const addToCart = (
    product: Product,
    color: ProductColor,
    variation?: string,
    quantity = 1,
    customNote?: string
  ) => {
    // calculate base price + variation priceDelta
    let itemPrice = product.price;
    if (variation && product.variations) {
      const match = product.variations.find((v) => v.name === variation);
      if (match) {
        itemPrice += match.priceDelta;
      }
    }

    const itemId = `${product.id}-${color.name}-${variation || 'default'}`;

    setItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.id === itemId);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          quantity,
          selectedColor: color,
          selectedVariation: variation,
          itemPrice,
          customNote,
        },
      ];
    });

    // Auto open cart drawer with feedback
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce(
    (sum, item) => sum + item.itemPrice * item.quantity,
    0
  );

  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
  const total = subtotal + shipping;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        totalCount,
        subtotal,
        shipping,
        total,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isCustomOrderOpen,
        setIsCustomOrderOpen,
        completedOrder,
        setCompletedOrder,
        quickViewProduct,
        setQuickViewProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
