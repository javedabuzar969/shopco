import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true },
    productCount: { type: Number, default: 0 },
    status: { type: String, enum: ['Active', 'Archived'], default: 'Active' },
    description: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);
export default Category;
