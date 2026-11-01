import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    sku: { type: String, default: '' },
    category: { type: String, default: 'General' },
    price: { type: Number, required: true },
    cost: { type: Number }, // Mirror of price for website compatibility
    compareAtPrice: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    stock: { type: Number, default: 50 },
    status: {
      type: String,
      enum: ['In Stock', 'Low Stock', 'Out of Stock'],
      default: 'In Stock',
    },
    rating: { type: Number, default: 4.5 },
    stars: { type: Number, default: 4.5 }, // Mirror of rating
    reviewsCount: { type: Number, default: 0 },
    image: { type: String, default: '' },
    imgKey: { type: String, default: '1' },
    style: { type: String, default: 'Casual' },
    style2: { type: String, default: '' },
    type: { type: String, default: 'T-shirts' },
    place: { type: String, enum: ['shop', 'home', 'both'], default: 'both' },
    homeType: {
      type: String,
      default: 'newarrival',
    },
    description: { type: String, default: '' },
    colors: { type: [String], default: [] },
    sizes: { type: [String], default: ['Small', 'Medium', 'Large', 'X-Large'] },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to synchronize price/cost and stars/rating
productSchema.pre('save', function () {
  if (this.price !== undefined && this.cost === undefined) {
    this.cost = this.price;
  } else if (this.cost !== undefined && this.price === undefined) {
    this.price = this.cost;
  }

  if (this.rating !== undefined && this.stars === undefined) {
    this.stars = this.rating;
  } else if (this.stars !== undefined && this.rating === undefined) {
    this.rating = this.stars;
  }

  if (this.stock !== undefined) {
    if (this.stock === 0) this.status = 'Out of Stock';
    else if (this.stock <= 10) this.status = 'Low Stock';
    else this.status = 'In Stock';
  }
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
