import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 },
    color: { type: String, default: '' },
    size: { type: String, default: '' },
    imgKey: { type: String, default: '1' },
    image: { type: String, default: '' },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerAvatar: {
      type: String,
      default:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&auto=format&q=80',
    },
    customerId: { type: String },
    phone: { type: String, default: '' },
    date: { type: String },
    orderStatus: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
      default: 'Pending',
    },
    totalAmount: { type: Number, required: true },
    subtotal: { type: Number },
    discount: { type: Number, default: 0 },
    shippingFee: { type: Number, default: 15 },
    shippingAddress: { type: String, required: true },
    city: { type: String, default: '' },
    postalCode: { type: String, default: '' },
    paymentMethod: { type: String, default: 'Cash on Delivery' },
    trackingNumber: { type: String, default: '' },
    notes: { type: String, default: '' },
    products: [orderItemSchema],
  },
  {
    timestamps: true,
  }
);

orderSchema.pre('save', function () {
  if (!this.date) {
    this.date = new Date().toISOString().split('T')[0];
  }
  if (!this.trackingNumber) {
    this.trackingNumber = 'TRK-' + Math.floor(100000 + Math.random() * 900000);
  }
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;
