import React, { useState } from 'react';
import { Product, ProductColor } from '../types';
import { SmartImage } from './SmartImage';
import { MessageCircle, ShoppingBag, Eye, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { buildSingleProductWhatsAppUrl, formatINR } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setQuickViewProduct } = useCart();
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedVariation, setSelectedVariation] = useState<string | undefined>(
    product.variations ? product.variations[0].name : undefined
  );
  const [justAdded, setJustAdded] = useState(false);

  // Calculate current price based on selected variation delta
  const priceDelta =
    product.variations && selectedVariation
      ? product.variations.find((v) => v.name === selectedVariation)?.priceDelta || 0
      : 0;
  const currentPrice = product.price + priceDelta;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedColor, selectedVariation, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const handleOrderWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = buildSingleProductWhatsAppUrl(product, selectedColor, selectedVariation, 1);
    window.open(url, '_blank');
  };

  return (
    <div
      onClick={() => setQuickViewProduct(product)}
      className="group bg-white rounded-2xl overflow-hidden border border-[#EAE2D3] hover:border-[#E2788D]/60 transition-all duration-300 hover:shadow-md flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Product Image Container */}
        <div className="relative overflow-hidden aspect-4/3 w-full bg-[#F4EFE6]">
          <SmartImage
            src={product.image}
            alt={product.name}
            categoryLabel={product.categoryLabel}
            aspectRatioClass="aspect-4/3"
          />

          {/* Badge (Single subtle text marker, no candy pills) */}
          {product.badge && (
            <div className="absolute top-3 left-3 bg-[#FAF7F2]/90 backdrop-blur-xs text-[#AB3A51] text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md border border-[#EAE2D3] shadow-2xs">
              {product.badge}
            </div>
          )}

          {/* Quick View Floating Action */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            aria-label={`Quick preview for ${product.name}`}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-[#2C2523] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-[#FAF7F2] shadow-xs"
          >
            <Eye className="w-4 h-4 text-[#6E655F]" />
          </button>
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-5">
          {/* Category & Lead Time unboxed metadata */}
          <div className="flex items-center gap-2 text-xs text-[#6F8A72] mb-1.5 font-medium">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#6E655F]">{product.leadTime}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-lg font-medium text-[#2C2523] group-hover:text-[#CB536B] transition-colors leading-snug line-clamp-1">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="mt-1 text-xs text-[#6E655F] line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Price & Original Price */}
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-lg font-semibold text-[#2C2523] tabular-nums">
              {formatINR(currentPrice)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#6E655F]/70 line-through tabular-nums">
                {formatINR(product.originalPrice + priceDelta)}
              </span>
            )}
          </div>

          {/* Color Variation Swatches */}
          {product.colors.length > 1 && (
            <div className="mt-3 pt-3 border-t border-[#F4EFE6]" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between text-[11px] text-[#6E655F] mb-1.5">
                <span>Color: <strong className="text-[#2C2523] font-medium">{selectedColor.name}</strong></span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                    className={`w-5 h-5 rounded-full border transition-transform ${
                      selectedColor.name === color.name
                        ? 'ring-2 ring-[#CB536B] ring-offset-1 scale-110 border-transparent'
                        : 'border-[#D5C7B5] hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size / Variation selector if available */}
          {product.variations && (
            <div className="mt-2.5" onClick={(e) => e.stopPropagation()}>
              <select
                value={selectedVariation}
                onChange={(e) => setSelectedVariation(e.target.value)}
                className="w-full text-xs py-1.5 px-2.5 rounded-lg border border-[#EAE2D3] bg-[#FAF7F2] text-[#2C2523] focus:outline-hidden focus:border-[#CB536B]"
              >
                {product.variations.map((v) => (
                  <option key={v.name} value={v.name}>
                    {v.name} {v.priceDelta > 0 ? `(+₹${v.priceDelta})` : ''}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons: Add to Cart & WhatsApp Order Now */}
      <div className="p-4 sm:p-5 pt-0 grid grid-cols-2 gap-2 mt-auto">
        <button
          onClick={handleAddToCart}
          className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
            justAdded
              ? 'bg-[#6F8A72] text-white'
              : 'bg-[#FCE8EB] text-[#AB3A51] hover:bg-[#F8CFD7]'
          }`}
        >
          {justAdded ? (
            <>
              <Check className="w-3.5 h-3.5" /> Added
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
            </>
          )}
        </button>

        <button
          onClick={handleOrderWhatsApp}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-medium bg-[#25D366] text-white hover:bg-[#20ba5a] transition-colors cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5" /> Order Now
        </button>
      </div>
    </div>
  );
};
