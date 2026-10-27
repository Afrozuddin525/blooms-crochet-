import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatINR, buildCartOrderWhatsAppUrl, buildEmailOrderUrl } from '../utils/whatsapp';
import { CustomerOrderData } from '../types';
import { BRAND_INFO } from '../data/products';
import { X, MessageCircle, Mail, CheckCircle2, Gift, ShieldAlert, ArrowLeft } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    items,
    subtotal,
    shipping,
    total,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
    completedOrder,
    setCompletedOrder,
  } = useCart();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Telangana');
  const [pincode, setPincode] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isGiftWrap, setIsGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isCheckoutOpen) return null;

  const validateForm = () => {
    if (!fullName.trim()) return 'Please enter your full name.';
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10)
      return 'Please enter a valid 10-digit mobile number for delivery updates.';
    if (!address.trim()) return 'Please enter your full delivery address.';
    if (!city.trim()) return 'Please enter your city.';
    if (!pincode.trim() || pincode.trim().length < 6)
      return 'Please enter a valid 6-digit PIN code.';
    return '';
  };

  const createOrderObject = (): CustomerOrderData => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `BC-${randomNum}`;

    return {
      orderId,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      pincode: pincode.trim(),
      specialInstructions: specialInstructions.trim() || undefined,
      isGiftWrap,
      giftMessage: giftMessage.trim() || undefined,
      items: items.map((it) => ({
        name: it.product.name,
        quantity: it.quantity,
        color: it.selectedColor.name,
        variation: it.selectedVariation,
        price: it.itemPrice,
      })),
      subtotal,
      shipping,
      total,
      orderDate: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };
  };

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setErrorMsg(error);
      return;
    }
    setErrorMsg('');

    const newOrder = createOrderObject();
    setCompletedOrder(newOrder);

    // Build the WhatsApp message link and open directly
    const waUrl = buildCartOrderWhatsAppUrl(newOrder);
    window.open(waUrl, '_blank');
    clearCart();
  };

  const handleEmailCheckout = () => {
    const error = validateForm();
    if (error) {
      setErrorMsg(error);
      return;
    }
    setErrorMsg('');

    const newOrder = createOrderObject();
    setCompletedOrder(newOrder);

    const mailUrl = buildEmailOrderUrl(newOrder);
    window.location.href = mailUrl;
    clearCart();
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setCompletedOrder(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#EAE2D3] my-8 max-h-[92vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close checkout modal"
          className="absolute top-5 right-5 p-2 rounded-full text-[#6E655F] hover:text-[#2C2523] hover:bg-[#F4EFE6] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {completedOrder ? (
          /* Confirmation Screen */
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#E5ECE6] text-[#6F8A72] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#2C2523]">
              Order Request Transmitted!
            </h2>

            <div className="inline-block bg-[#FAF7F2] border border-[#EAE2D3] rounded-xl px-4 py-2 text-xs text-[#2C2523]">
              Reference ID: <strong className="font-mono text-[#CB536B]">{completedOrder.orderId}</strong>
            </div>

            <p className="text-sm text-[#6E655F] max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-[#2C2523]">{completedOrder.fullName}</strong>! Your order
              details have been pre-filled for Blooms Crochet.
            </p>

            {/* Transparent Note on Order Process */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE2D3] text-left text-xs text-[#6E655F] space-y-2 max-w-md mx-auto">
              <div className="font-medium text-[#2C2523] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#6F8A72]" />
                What happens next?
              </div>
              <p>
                1. If your WhatsApp chat didn't open automatically, click the button below to send your order.
              </p>
              <p>
                2. Our artisan will confirm the handmade schedule (usually 2–5 days) and provide UPI payment details (GPay, PhonePe, Paytm).
              </p>
              <p>
                3. Once woven with love, your parcel will be gift-boxed and shipped to your address in {completedOrder.city}.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
              <a
                href={buildCartOrderWhatsAppUrl(completedOrder)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-xs font-semibold bg-[#25D366] text-white hover:bg-[#20ba5a] transition-colors"
              >
                <MessageCircle className="w-4 h-4" /> Open Chat on WhatsApp
              </a>
              <button
                onClick={handleClose}
                className="w-full sm:w-auto inline-flex items-center justify-center py-3 px-6 rounded-xl text-xs font-medium bg-[#2C2523] text-white hover:bg-black transition-colors"
              >
                Done / Back to Store
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Order Form */
          <div>
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-[#6F8A72] font-semibold">
                Direct Artisan Checkout
              </span>
              <h2 className="font-serif text-2xl font-medium text-[#2C2523] mt-1">
                Delivery & Order Information
              </h2>
              <p className="text-xs text-[#6E655F] mt-1">
                Fill in your delivery address. Your order will be sent straight to our WhatsApp business chat
                for confirmation & payment.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleWhatsAppCheckout} className="space-y-4">
              {/* Customer Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[#2C2523] block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Sanya Sharma"
                    className="w-full text-xs p-2.5 rounded-xl border border-[#EAE2D3] bg-[#FAF7F2] text-[#2C2523] focus:border-[#CB536B] focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[#2C2523] block mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full text-xs p-2.5 rounded-xl border border-[#EAE2D3] bg-[#FAF7F2] text-[#2C2523] focus:border-[#CB536B] focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#2C2523] block mb-1">
                  Email Address <span className="text-[#6E655F] font-normal">(Optional, for receipt)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full text-xs p-2.5 rounded-xl border border-[#EAE2D3] bg-[#FAF7F2] text-[#2C2523] focus:border-[#CB536B] focus:bg-white focus:outline-hidden"
                />
              </div>

              {/* Delivery Address */}
              <div>
                <label className="text-xs font-medium text-[#2C2523] block mb-1">
                  Street Address & Flat / House No. *
                </label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Flat 302, Lavender Heights, Road No. 4, Banjara Hills"
                  className="w-full text-xs p-2.5 rounded-xl border border-[#EAE2D3] bg-[#FAF7F2] text-[#2C2523] focus:border-[#CB536B] focus:bg-white focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-medium text-[#2C2523] block mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Hyderabad"
                    className="w-full text-xs p-2.5 rounded-xl border border-[#EAE2D3] bg-[#FAF7F2] text-[#2C2523] focus:border-[#CB536B] focus:bg-white focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#2C2523] block mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Telangana"
                    className="w-full text-xs p-2.5 rounded-xl border border-[#EAE2D3] bg-[#FAF7F2] text-[#2C2523] focus:border-[#CB536B] focus:bg-white focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#2C2523] block mb-1">PIN Code *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="500034"
                    className="w-full text-xs p-2.5 rounded-xl border border-[#EAE2D3] bg-[#FAF7F2] text-[#2C2523] focus:border-[#CB536B] focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Special Instructions & Color Tweaks */}
              <div>
                <label className="text-xs font-medium text-[#2C2523] block mb-1">
                  Special Instructions / Custom Color Requests
                </label>
                <input
                  type="text"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g. Please make the tulip leaves slightly darker sage green"
                  className="w-full text-xs p-2.5 rounded-xl border border-[#EAE2D3] bg-[#FAF7F2] text-[#2C2523] focus:border-[#CB536B] focus:bg-white focus:outline-hidden"
                />
              </div>

              {/* Gift Wrapping & Note Checkbox */}
              <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EAE2D3] space-y-2.5">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-[#2C2523]">
                  <input
                    type="checkbox"
                    checked={isGiftWrap}
                    onChange={(e) => setIsGiftWrap(e.target.checked)}
                    className="w-4 h-4 rounded text-[#CB536B] focus:ring-[#CB536B]"
                  />
                  <Gift className="w-4 h-4 text-[#CB536B]" />
                  <span>Complimentary Kraft Gift Wrapping & Ribbon</span>
                </label>

                {isGiftWrap && (
                  <div className="pt-2">
                    <input
                      type="text"
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      placeholder="Write your handwritten note message here..."
                      className="w-full text-xs p-2 rounded-lg border border-[#EAE2D3] bg-white text-[#2C2523] focus:border-[#CB536B] focus:outline-hidden"
                    />
                  </div>
                )}
              </div>

              {/* Summary of Items */}
              <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EAE2D3] text-xs space-y-2">
                <div className="font-medium text-[#2C2523]">Items in this order:</div>
                <div className="max-h-28 overflow-y-auto space-y-1 divide-y divide-[#EAE2D3]/60 pr-1">
                  {items.map((it) => (
                    <div key={it.id} className="pt-1 first:pt-0 flex justify-between text-[#6E655F]">
                      <span className="truncate pr-2">
                        {it.product.name} ({it.selectedColor.name}) × {it.quantity}
                      </span>
                      <span className="font-semibold text-[#2C2523] tabular-nums shrink-0">
                        {formatINR(it.itemPrice * it.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-[#EAE2D3] flex justify-between font-semibold text-sm text-[#2C2523]">
                  <span>Total Amount (incl. shipping)</span>
                  <span className="text-[#CB536B] tabular-nums font-serif text-base">
                    {formatINR(total)}
                  </span>
                </div>
              </div>

              {/* Submission CTAs: WhatsApp Primary, Email Fallback */}
              <div className="pt-3 space-y-2.5">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-semibold bg-[#25D366] text-white hover:bg-[#20ba5a] transition-all shadow-sm cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Order via WhatsApp (+91 6281508874)</span>
                </button>

                <div className="flex items-center justify-center gap-3 text-xs text-[#6E655F]">
                  <span>Prefer email?</span>
                  <button
                    type="button"
                    onClick={handleEmailCheckout}
                    className="inline-flex items-center gap-1 text-[#2C2523] underline hover:text-[#CB536B] cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" /> Order via Email
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
