import React, { useState } from 'react';
import { BRAND_INFO } from '../data/products';
import { MessageCircle, Mail, MapPin, Instagram, Clock, ChevronDown, Send } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSendQuery = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `🌸 *Customer Inquiry — Blooms Crochet*
• Name: ${formName}
• Phone: ${formPhone}
• Message: ${formMsg}`;

    window.open(`${BRAND_INFO.whatsappUrl}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const faqs = [
    {
      q: 'How long does it take to make and deliver an order?',
      a: 'Since each item is hand-crocheted stitch by stitch, standard pieces take 2–4 days to craft. Custom large bouquets or bridal sets take 4–7 days. Shipping across India typically takes 3–5 business days via reputable express couriers.',
    },
    {
      q: 'Can I request custom colors or personalized letter initials?',
      a: 'Yes, absolutely! We love custom creations. You can customize the yarn colors for any bouquet, request specific flowers, or have monogram initials crocheted into blossoms.',
    },
    {
      q: 'How do payments work without an online card gateway?',
      a: 'To avoid transaction fees for our buyers, we accept simple and safe direct UPI transfers (Google Pay, PhonePe, Paytm, or direct bank transfer). Once your order details are confirmed on WhatsApp or email, we share our official business UPI details.',
    },
    {
      q: 'Do you offer gift wrapping and handwritten notes?',
      a: 'Yes! Every Blooms Crochet order is shipped in eco-friendly protective kraft boxes tied with a satin ribbon. You can request a complimentary handwritten note during checkout.',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-[#FAF7F2] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-[#6F8A72] font-semibold mb-2">
            Get In Touch
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#2C2523] tracking-tight">
            We’d Love to Hear From You
          </h2>
          <p className="mt-3 text-sm text-[#6E655F]">
            Have a question about a piece, want to check delivery dates, or discuss a custom vision?
            Reach out directly to our artisan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D3] shadow-xs space-y-6">
              <h3 className="font-serif text-xl font-medium text-[#2C2523]">
                Direct Contact Channels
              </h3>

              {/* Phone / WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#E8F8EE] text-[#25D366] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#6E655F]">Phone & WhatsApp</div>
                  <a
                    href={BRAND_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-sm text-[#2C2523] hover:text-[#25D366] transition-colors block mt-0.5"
                  >
                    {BRAND_INFO.phone}
                  </a>
                  <a
                    href={BRAND_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#25D366] font-semibold mt-1 hover:underline"
                  >
                    Chat on WhatsApp →
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 pt-4 border-t border-[#F4EFE6]">
                <div className="w-10 h-10 rounded-2xl bg-[#FCE8EB] text-[#CB536B] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#6E655F]">Email Inquiry</div>
                  <a
                    href={`mailto:${BRAND_INFO.email}`}
                    className="font-medium text-sm text-[#2C2523] hover:text-[#CB536B] transition-colors block mt-0.5"
                  >
                    {BRAND_INFO.email}
                  </a>
                  <a
                    href={`mailto:${BRAND_INFO.email}`}
                    className="inline-flex items-center gap-1 text-xs text-[#CB536B] font-semibold mt-1 hover:underline"
                  >
                    Email Us Directly →
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4 pt-4 border-t border-[#F4EFE6]">
                <div className="w-10 h-10 rounded-2xl bg-[#FAF7F2] text-[#6F8A72] flex items-center justify-center shrink-0 border border-[#EAE2D3]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#6E655F]">Studio Location</div>
                  <div className="font-medium text-sm text-[#2C2523] mt-0.5">
                    {BRAND_INFO.location}
                  </div>
                  <div className="text-xs text-[#6E655F] mt-0.5">
                    Shipping safely to every corner of India
                  </div>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-4 pt-4 border-t border-[#F4EFE6]">
                <div className="w-10 h-10 rounded-2xl bg-[#FAF7F2] text-[#6E655F] flex items-center justify-center shrink-0 border border-[#EAE2D3]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#6E655F]">Customer Service Hours</div>
                  <div className="font-medium text-sm text-[#2C2523] mt-0.5">
                    Monday – Saturday: 10:00 AM – 8:00 PM IST
                  </div>
                  <div className="text-xs text-[#6F8A72] mt-0.5">WhatsApp inquiries answered daily</div>
                </div>
              </div>
            </div>

            {/* Quick Send Message Form */}
            <div className="bg-white rounded-3xl p-6 border border-[#EAE2D3]">
              <h4 className="font-serif text-base font-medium text-[#2C2523] mb-3">
                Send a Quick WhatsApp Message
              </h4>
              <form onSubmit={handleSendQuery} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#EAE2D3] bg-[#FAF7F2] text-[#2C2523] focus:border-[#CB536B] focus:outline-hidden"
                />
                <input
                  type="tel"
                  required
                  placeholder="Your Phone Number"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#EAE2D3] bg-[#FAF7F2] text-[#2C2523] focus:border-[#CB536B] focus:outline-hidden"
                />
                <textarea
                  required
                  rows={2}
                  placeholder="How can we help you today?"
                  value={formMsg}
                  onChange={(e) => setFormMsg(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#EAE2D3] bg-[#FAF7F2] text-[#2C2523] focus:border-[#CB536B] focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#25D366] text-white hover:bg-[#20ba5a] transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" /> Send Message
                </button>
              </form>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D3] shadow-xs">
              <h3 className="font-serif text-xl font-medium text-[#2C2523] mb-6">
                Frequently Asked Questions
              </h3>

              <div className="divide-y divide-[#EAE2D3]">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div key={index} className="py-4 first:pt-0 last:pb-0">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full flex items-center justify-between text-left gap-4 font-serif text-base font-medium text-[#2C2523] hover:text-[#CB536B] transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#6E655F] shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-[#CB536B]' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <p className="mt-2.5 text-xs sm:text-sm text-[#6E655F] leading-relaxed animate-in fade-in">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
