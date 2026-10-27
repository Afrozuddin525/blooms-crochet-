import { CustomerOrderData, CustomInquiry, Product, ProductColor } from '../types';
import { BRAND_INFO } from '../data/products';

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Creates pre-filled WhatsApp link for direct single-item order
 */
export function buildSingleProductWhatsAppUrl(
  product: Product,
  color: ProductColor,
  variation?: string,
  quantity = 1
): string {
  const text = `🌸 *Hello Blooms Crochet!*
I would love to order this handmade creation:

*Product:* ${product.name}
*Category:* ${product.categoryLabel}
*Price:* ₹${product.price}
*Quantity:* ${quantity}
*Selected Color:* ${color.name}
${variation ? `*Variation:* ${variation}\n` : ''}
*Estimated Lead Time:* ${product.leadTime}

Please let me know how to proceed with payment and delivery details. Thank you!`;

  return `${BRAND_INFO.whatsappUrl}?text=${encodeURIComponent(text)}`;
}

/**
 * Creates pre-filled WhatsApp link for complete cart checkout order
 */
export function buildCartOrderWhatsAppUrl(order: CustomerOrderData): string {
  const itemsText = order.items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.name}* (Qty: ${item.quantity})
   - Color: ${item.color}
   ${item.variation ? `- Type: ${item.variation}\n   ` : ''}- Price: ₹${item.price * item.quantity}`
    )
    .join('\n\n');

  const text = `🌸 *NEW ORDER REQUEST — BLOOMS CROCHET*
*Order Reference:* ${order.orderId}
*Date:* ${order.orderDate}

*CUSTOMER DETAILS:*
• *Name:* ${order.fullName}
• *Phone:* ${order.phone}
${order.email ? `• *Email:* ${order.email}\n` : ''}• *Delivery Address:*
  ${order.address}
  ${order.city}, ${order.state} - ${order.pincode}

*ITEMS ORDERED:*
${itemsText}

----------------------------
*Subtotal:* ₹${order.subtotal}
*Shipping:* ${order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}
*TOTAL AMOUNT:* ₹${order.total}
----------------------------
${order.isGiftWrap ? `🎁 *Gift Wrapping Requested:* Yes\n${order.giftMessage ? `💌 *Gift Note:* "${order.giftMessage}"\n` : ''}` : ''}
${order.specialInstructions ? `📝 *Special Instructions:* ${order.specialInstructions}\n` : ''}
Please confirm my order and share UPI / payment details to proceed. Thank you!`;

  return `${BRAND_INFO.whatsappUrl}?text=${encodeURIComponent(text)}`;
}

/**
 * Creates pre-filled WhatsApp link for custom crochet orders
 */
export function buildCustomOrderWhatsAppUrl(inquiry: CustomInquiry): string {
  const text = `🌸 *CUSTOM CROCHET ORDER INQUIRY*
Hello Blooms Crochet! I would like to request a bespoke handmade crochet piece:

• *My Name:* ${inquiry.fullName}
• *Phone:* ${inquiry.phone}
${inquiry.email ? `• *Email:* ${inquiry.email}\n` : ''}• *Item Type:* ${inquiry.itemType}
• *Desired Color Palette:* ${inquiry.colorScheme}
${inquiry.neededByDate ? `• *Needed By Date:* ${inquiry.neededByDate}\n` : ''}${inquiry.budget ? `• *Approx. Budget:* ${inquiry.budget}\n` : ''}
*Description / Vision:*
${inquiry.referenceNotes}

Could you please let me know if this is possible and share a quote? Excited to work with you!`;

  return `${BRAND_INFO.whatsappUrl}?text=${encodeURIComponent(text)}`;
}

/**
 * Creates pre-filled email mailto: link for order fallback
 */
export function buildEmailOrderUrl(order: CustomerOrderData): string {
  const subject = `Order Request ${order.orderId} - Blooms Crochet`;
  const body = `Hello Blooms Crochet,

I would like to place an order:

Order Reference: ${order.orderId}
Customer Name: ${order.fullName}
Phone: ${order.phone}
${order.email ? `Email: ${order.email}\n` : ''}
Delivery Address:
${order.address}
${order.city}, ${order.state} - ${order.pincode}

Items:
${order.items.map((it) => `- ${it.name} (Qty: ${it.quantity}, Color: ${it.color}) - ₹${it.price * it.quantity}`).join('\n')}

Subtotal: ₹${order.subtotal}
Shipping: ${order.shipping === 0 ? 'FREE' : `₹${order.shipping}`}
Total: ₹${order.total}

${order.isGiftWrap ? `Gift Wrapping: Yes\nGift Note: ${order.giftMessage || 'N/A'}\n` : ''}
Special Instructions: ${order.specialInstructions || 'None'}

Please reply with payment confirmation details.
Thank you!`;

  return `mailto:${BRAND_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
