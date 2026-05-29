import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Order } from '@/types';
import { businessInfo } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';

export function buildReceipt(order: Order) {
  const doc = new jsPDF();
  addReceiptPage(doc, order, false);
  return doc;
}

function addReceiptPage(doc: jsPDF, order: Order, newPage: boolean) {
  if (newPage) doc.addPage();
  doc.setFontSize(18);
  doc.text('Charnish Cookies', 14, 18);
  doc.setFontSize(10);
  doc.text(`${businessInfo.address} | ${businessInfo.phone1}`, 14, 25);
  doc.text(`Order: ${order.orderNumber}`, 14, 36);
  doc.text(`Customer: ${order.customerName} (${order.customerPhone})`, 14, 43);
  doc.text(`Address: ${order.deliveryAddress}`, 14, 50);

  autoTable(doc, {
    startY: 60,
    head: [['Item', 'Qty', 'Price', 'Subtotal']],
    body: (order.items ?? []).map((item) => [item.name, item.quantity, formatCurrency(item.price), formatCurrency(item.price * item.quantity)])
  });

  doc.text(`Discount: ${formatCurrency(order.discount)}`, 14, 120);
  doc.text(`Grand Total: ${formatCurrency(order.total)}`, 14, 128);
  doc.text(`Payment: ${order.paymentMethod} | ${order.paymentStatus}`, 14, 136);
  doc.text(`Status: ${order.orderStatus}`, 14, 144);
  doc.text('Thank you for ordering from Charnish Cookies.', 14, 158);
}

export function buildReceipts(orders: Order[]) {
  const doc = new jsPDF();
  orders.forEach((order, index) => addReceiptPage(doc, order, index > 0));
  return doc;
}
