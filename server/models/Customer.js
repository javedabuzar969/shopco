import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String }, // optional simple hashed/stored password
    phone: { type: String, default: '' },
    avatar: {
      type: String,
      default:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&auto=format&q=80',
    },
    ordersCount: { type: Number, default: 0 },
    totalSpent: { type: Number, default: 0 },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    address: { type: String, default: '' },
    city: { type: String, default: '' },
    joinedDate: { type: String },
  },
  {
    timestamps: true,
  }
);

customerSchema.pre('save', function () {
  if (!this.joinedDate) {
    this.joinedDate = new Date().toISOString().split('T')[0];
  }
});

const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);
export default Customer;
