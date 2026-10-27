import React from 'react';
import { useCart } from '../context/CartContext';
import { SmartImage } from './SmartImage';
import { formatINR } from '../utils/whatsapp';
import { X, Trash2, ArrowRight, ShoppingBag, Sparkles, Truck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    shipping,
    total,
    setIsCheckoutOpen,
  } = useCart();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 1499;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in"
      onClick={() => setIsCartOpen(false)}
    >
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col justify-between border-l border-[#EAE2D3]"
        >
          {/* Header */}
          <div className="p-5 border-b border-[#EAE2D3] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#CB536B]" />
              <h2 className="font-serif text-lg font-medium text-[#2C2523]">
                Your Shopping Basket ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Close cart drawer"
              className="p-1.5 rounded-full text-[#6E655F] hover:text-[#2C2523] hover:bg-[#F4EFE6] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-[#FAF7F2] p-3.5 border-b border-[#EAE2D3]">
            <div className="flex items-center gap-2 text-xs text-[#2C2523] font-medium mb-1.5">
              <Truck className="w-3.5 h-3.5 text-[#6F8A72]" />
              {amountNeeded > 0 ? (
                <span>
                  Add <strong className="text-[#CB536B]">{formatINR(amountNeeded)}</strong> more for <strong>FREE Delivery</strong>
                </span>
              ) : (
                <span className="text-[#6F8A72] font-semibold">
                  🎉 You’ve unlocked FREE Pan-India Delivery!
                </span>
              )}
            </div>
            <div className="w-full bg-[#EAE2D3] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#6F8A72] h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-[#FCE8EB] text-[#CB536B] flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-medium text-[#2C2523]">
                  Your basket is empty
                </h3>
                <p className="mt-1.5 text-xs text-[#6E655F] max-w-xs mx-auto">
                  Browse our handcrafted crochet creations to add warmth, beauty, and love to your day.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-6 py-2.5 rounded-full text-xs font-medium bg-[#CB536B] text-white hover:bg-[#AB3A51] transition-colors cursor-pointer"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-3.5 border border-[#EAE2D3] flex gap-3.5 relative"
                >
                  {/* Item Image */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#F4EFE6] shrink-0">
                    <SmartImage
                      src={item.product.image}
                      alt={item.product.name}
                      aspectRatioClass="aspect-square"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm font-medium text-[#2C2523] truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id)}
                          aria-label={`Remove ${item.product.name}`}
                          className="text-[#6E655F] hover:text-[#CB536B] transition-colors p-1 -mr-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="mt-1 text-xs text-[#6E655F] space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span>{item.selectedColor.name}</span>
                        </div>
                        {item.selectedVariation && (
                          <div className="text-[11px] text-[#6F8A72] font-medium">
                            {item.selectedVariation}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quantity controls and price */}
                    <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-[#F4EFE6]">
                      <div className="flex items-center border border-[#EAE2D3] rounded-md bg-[#FAF7F2]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-[#6E655F] hover:text-[#CB536B]"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-semibold text-[#2C2523] tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-[#6E655F] hover:text-[#CB536B]"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-sm font-semibold text-[#2C2523] tabular-nums">
                        {formatINR(item.itemPrice * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Trigger */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#EAE2D3] bg-white space-y-3">
              <div className="space-y-1.5 text-xs text-[#6E655F]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#2C2523] tabular-nums">
                    {formatINR(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-medium text-[#2C2523]">
                    {shipping === 0 ? (
                      <span className="text-[#6F8A72]">FREE</span>
                    ) : (
                      formatINR(shipping)
                    )}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#EAE2D3] flex justify-between text-sm font-semibold text-[#2C2523]">
                  <span>Total Amount</span>
                  <span className="tabular-nums font-serif text-base text-[#CB536B]">
                    {formatINR(total)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-medium bg-[#CB536B] text-white hover:bg-[#AB3A51] transition-all shadow-sm cursor-pointer"
              >
                <span>Proceed to Order Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between text-[11px] text-[#6E655F]">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#6F8A72]" /> Handcrafted in Hyderabad
                </span>
                <button
                  onClick={clearCart}
                  className="underline hover:text-[#CB536B] transition-colors cursor-pointer"
                >
                  Clear basket
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
