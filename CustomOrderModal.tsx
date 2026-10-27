import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CustomInquiry } from '../types';
import { buildCustomOrderWhatsAppUrl } from '../utils/whatsapp';
import { BRAND_INFO } from '../data/products';
import { X, Sparkles, MessageCircle, Mail, CheckCircle2, Heart } from 'lucide-react';

export const CustomOrderModal: React.FC = () => {
  const { isCustomOrderOpen, setIsCustomOrderOpen } = useCart();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [itemType, setItemType] = useState('Custom Bouquet');
  const [colorScheme, setColorScheme] = useState('Blush Pink, Cream & Sage Green');
  const [neededByDate, setNeededByDate] = useState('');
  const [referenceNotes, setReferenceNotes] = useState('');
  const [budget, setBudget] = useState('₹1000 - ₹2500');
  const [submitted, setSubmitted] = useState(false);

  if (!isCustomOrderOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const inquiry: CustomInquiry = {
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      itemType,
      colorScheme,
      neededByDate: neededByDate || undefined,
      referenceNotes: referenceNotes.trim(),
      budget,
    };

    const waUrl = buildCustomOrderWhatsAppUrl(inquiry);
    window.open(waUrl, '_blank');
    setSubmitted(true);
  };

  const handleClose = () => {
    setIsCustomOrderOpen(false);
    setSubmitted(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#EAE2D3] my-8 max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={handleClose}
          aria-label="Close custom order window"
          className="absolute top-5 right-5 p-2 rounded-full text-[#6E655F] hover:text-[#2C2523] hover:bg-[#F4EFE6] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#FCE8EB] text-[#CB536B] flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 fill-current" />
            </div>
            <h3 className="font-serif text-2xl font-medium text-[#2C2523]">
              Custom Order Request Sent!
            </h3>
            <p className="text-sm text-[#6E655F] max-w-sm mx-auto leading-relaxed">
              We received your custom vision for a <strong className="text-[#2C2523]">{itemType}</strong>.
              Our artisan will message you on WhatsApp to discuss yarn shades, timeline, and share sample stitches!
            </p>
            <div className="pt-2">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[#2C2523] text-white hover:bg-black transition-colors"
              >
                Return to Shop
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#CB536B] font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Bespoke Handmade Creations</span>
              </div>
              <h2 className="font-serif text-2xl font-medium text-[#2C2523]">
                Design Your Custom Crochet Piece
              </h2>
              <p className="text-xs text-[#6E655F] mt-1.5 leading-relaxed">
                Have a specific flower bouquet in mind, matching bridal hair colors, or a cherished
                amigurumi idea? Tell us your vision and we will hand-craft it for you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-medium text-[#2C2523] block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Radhika"
                    className="w-full text-xs p-2.5 rounded-xl border border-[#EAE2D3] bg-[#FAF7F2] text-[#2C2523] focus:border-[#CB536B] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#2C2523] block mb-1">WhatsApp Phone *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full text-xs p-2.5 rounded-xl border border-[#EAE2D3] bg-[#FAF7F2] text-[#2C2523] focus:border-[#CB536B] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-medium text-[#2C2523] block mb-1">Creation Type *</label>
                  <select
                    value={itemType}
                    onChange={(e) => setItemType(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#EAE2D3] bg-[#FAF7F2] text-[#2C2523] focus:border-[#CB536B] focus:outline-hidden"
                  >
                    <option value="Custom Bouquet">Custom Flower Bouquet</option>
                    <option value="Bridal Hair Gajra">Bridal / Festive Hair Gajra</option>
                    <option value="Custom Bandana">Custom Floral Bandana</option>
                    <option value="Amigurumi Keepsake">Amigurumi Doll or Dessert</option>
                    <option value="Personalized Bag">Granny Square Bag / Purse</option>
                    <option value="Baby Gift Set">Handmade Baby Headband / Set</option>
                    <option value="Other Bespoke Gift">Other Special Request</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-[#2C2523] block mb-1">
                    Target Date <span className="text-[#6E655F] font-normal">(if for event)</span>
                  </label>
                  <input
                    type="date"
                    value={neededByDate}
                    onChange={(e) => setNeededByDate(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#EAE2D3] bg-[#FAF7F2] text-[#2C2523] focus:border-[#CB536B] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#2C2523] block mb-1">
                  Desired Color Scheme & Palette *
                </label>
                <input
                  type="text"
                  required
                  value={colorScheme}
                  onChange={(e) => setColorScheme(e.target.value)}
                  placeholder="e.g. Lavender purple, buttercup cream, and olive leaves"
                  className="w-full text-xs p-2.5 rounded-xl border border-[#EAE2D3] bg-[#FAF7F2] text-[#2C2523] focus:border-[#CB536B] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#2C2523] block mb-1">
                  Describe Your Vision & Details *
                </label>
                <textarea
                  required
                  rows={3}
                  value={referenceNotes}
                  onChange={(e) => setReferenceNotes(e.target.value)}
                  placeholder="Tell us what flowers or motifs you love, any letter initials to incorporate, specific measurements, or special occasion context..."
                  className="w-full text-xs p-2.5 rounded-xl border border-[#EAE2D3] bg-[#FAF7F2] text-[#2C2523] focus:border-[#CB536B] focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#2C2523] block mb-1">
                  Estimated Budget Range
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#EAE2D3] bg-[#FAF7F2] text-[#2C2523] focus:border-[#CB536B] focus:outline-hidden"
                >
                  <option value="Under ₹800">Under ₹800 (Charms, Single Stems, Headbands)</option>
                  <option value="₹800 - ₹1500">₹800 - ₹1,500 (Gajras, 3-Stem Posies, Bandanas)</option>
                  <option value="₹1500 - ₹3000">₹1,500 - ₹3,000 (Grand Bouquets, Totes, Bridal Venis)</option>
                  <option value="Above ₹3000">Above ₹3,000 (Bulk Wedding Favors / Full Sets)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-semibold bg-[#25D366] text-white hover:bg-[#20ba5a] transition-all shadow-sm cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Submit Custom Request via WhatsApp</span>
                </button>
                <p className="mt-2 text-center text-[11px] text-[#6E655F]">
                  We typically respond within 2–4 hours with custom yarn swatches and estimates.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
