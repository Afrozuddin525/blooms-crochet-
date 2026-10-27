import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { SmartImage } from './SmartImage';
import { formatINR, buildSingleProductWhatsAppUrl } from '../utils/whatsapp';
import { X, ShoppingBag, MessageCircle, Heart, Star, ShieldCheck, Sparkles, Check } from 'lucide-react';
import { ProductColor } from '../types';

export const ProductModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [selectedVariation, setSelectedVariation] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedColor(quickViewProduct.colors[0]);
      setSelectedVariation(
        quickViewProduct.variations ? quickViewProduct.variations[0].name : undefined
      );
      setQuantity(1);
      setJustAdded(false);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct || !selectedColor) return null;

  const priceDelta =
    quickViewProduct.variations && selectedVariation
      ? quickViewProduct.variations.find((v) => v.name === selectedVariation)?.priceDelta || 0
      : 0;
  const currentPrice = quickViewProduct.price + priceDelta;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedColor, selectedVariation, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      setQuickViewProduct(null);
    }, 1200);
  };

  const handleOrderWhatsApp = () => {
    const url = buildSingleProductWhatsAppUrl(
      quickViewProduct,
      selectedColor,
      selectedVariation,
      quantity
    );
    window.open(url, '_blank');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={() => setQuickViewProduct(null)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#EAE2D3] my-8"
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close product preview"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 text-[#2C2523] flex items-center justify-center hover:bg-[#F4EFE6] transition-colors shadow-xs cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Column */}
          <div className="relative bg-[#F4EFE6] flex items-center justify-center">
            <SmartImage
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              categoryLabel={quickViewProduct.categoryLabel}
              aspectRatioClass="aspect-square md:aspect-auto md:h-full w-full"
            />
            {quickViewProduct.badge && (
              <div className="absolute top-4 left-4 bg-white/95 text-[#AB3A51] text-xs font-semibold uppercase px-3 py-1 rounded-md border border-[#EAE2D3] shadow-xs">
                {quickViewProduct.badge}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & Lead time */}
              <div className="flex items-center gap-2 text-xs text-[#6F8A72] font-medium mb-1">
                <span>{quickViewProduct.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#6E655F]">{quickViewProduct.leadTime}</span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl font-medium text-[#2C2523] leading-snug">
                {quickViewProduct.name}
              </h2>

              {/* Rating */}
              <div className="mt-2 flex items-center gap-2 text-xs text-[#6E655F]">
                <div className="flex items-center text-[#E2788D]">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="ml-1 font-semibold text-[#2C2523]">{quickViewProduct.rating}</span>
                </div>
                <span>({quickViewProduct.reviewsCount} verified reviews)</span>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-serif text-2xl font-medium text-[#2C2523] tabular-nums">
                  {formatINR(currentPrice)}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-sm text-[#6E655F]/70 line-through tabular-nums">
                    {formatINR(quickViewProduct.originalPrice + priceDelta)}
                  </span>
                )}
                <span className="text-xs text-[#6F8A72] font-medium">Taxes included</span>
              </div>

              {/* Description */}
              <p className="mt-4 text-xs sm:text-sm text-[#6E655F] leading-relaxed">
                {quickViewProduct.description}
              </p>

              {/* Material & Specifications */}
              <div className="mt-4 p-3 rounded-xl bg-[#FAF7F2] border border-[#EAE2D3] space-y-1.5 text-xs text-[#6E655F]">
                <div>
                  <strong className="text-[#2C2523]">Yarn Material:</strong> {quickViewProduct.yarnMaterial}
                </div>
                {quickViewProduct.dimensions && (
                  <div>
                    <strong className="text-[#2C2523]">Dimensions:</strong> {quickViewProduct.dimensions}
                  </div>
                )}
                <div>
                  <strong className="text-[#2C2523]">Care:</strong> Gentle cold spot wash, air dry flat in shade.
                </div>
              </div>

              {/* Color Selection */}
              <div className="mt-5">
                <label className="text-xs font-semibold text-[#2C2523] block mb-2">
                  Select Shade: <span className="font-normal text-[#6E655F]">{selectedColor.name}</span>
                </label>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {quickViewProduct.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                        selectedColor.name === color.name
                          ? 'border-[#CB536B] bg-[#FCE8EB] text-[#AB3A51]'
                          : 'border-[#EAE2D3] bg-white text-[#6E655F] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Variation Selection */}
              {quickViewProduct.variations && (
                <div className="mt-4">
                  <label className="text-xs font-semibold text-[#2C2523] block mb-2">
                    Select Option / Size:
                  </label>
                  <div className="grid grid-cols-1 gap-1.5">
                    {quickViewProduct.variations.map((v) => (
                      <button
                        key={v.name}
                        onClick={() => setSelectedVariation(v.name)}
                        className={`text-left px-3.5 py-2 rounded-xl text-xs flex items-center justify-between border transition-all cursor-pointer ${
                          selectedVariation === v.name
                            ? 'border-[#CB536B] bg-[#FCE8EB]/60 text-[#AB3A51] font-medium'
                            : 'border-[#EAE2D3] bg-white text-[#6E655F] hover:bg-[#FAF7F2]'
                        }`}
                      >
                        <span>{v.name}</span>
                        <span className="font-semibold tabular-nums">
                          {formatINR(quickViewProduct.price + v.priceDelta)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              <div className="mt-4 flex items-center gap-3">
                <span className="text-xs font-semibold text-[#2C2523]">Quantity:</span>
                <div className="flex items-center border border-[#EAE2D3] rounded-lg bg-[#FAF7F2]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-sm hover:text-[#CB536B] cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-semibold text-[#2C2523] tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-sm hover:text-[#CB536B] cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-6 pt-5 border-t border-[#EAE2D3] grid grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  justAdded
                    ? 'bg-[#6F8A72] text-white'
                    : 'bg-[#CB536B] text-white hover:bg-[#AB3A51]'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Add to Cart (₹{currentPrice * quantity})
                  </>
                )}
              </button>

              <button
                onClick={handleOrderWhatsApp}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-medium bg-[#25D366] text-white hover:bg-[#20ba5a] transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" /> Order on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
