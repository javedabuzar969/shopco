import { connectDB } from './db.js';
import Product from './models/Product.js';
import Category from './models/Category.js';
import Customer from './models/Customer.js';
import Activity from './models/Activity.js';
import Settings from './models/Settings.js';

const IMG_MAP = {
  "1": "photo-1661080561444-a0139edfc4f7",
  "2": "photo-1637069585336-827b298fe84a",
  "3": "photo-1626497764746-6dc36546b388",
  "4": "photo-1621198059871-0d5f9b449233",
  "5": "photo-1726509319379-dd068f59633d",
  "6": "photo-1675756235174-18396273b879",
  "7": "photo-1706565029674-cb233ea977e8",
  "8": "photo-1708523842501-1619478cea1f",
  "9": "photo-1662893992324-397132d77dbd",
  "11": "photo-1598529253026-dc278cc737b4",
  "12": "photo-1742740265356-eb2480afad8a",
  "13": "photo-1651002223348-3717f55cf6cd",
  "14": "photo-1670421102344-c19b30c471f0",
  "15": "photo-1603992015724-7c1fc1cc2c76",
};

function getImgUrl(key) {
  const photo = IMG_MAP[key] || IMG_MAP['1'];
  return `https://images.unsplash.com/${photo}?w=600&h=600&fit=crop&auto=format&q=80`;
}

const DESC = "This timeless piece combines exceptional comfort with effortless style. Crafted from premium materials, it drapes beautifully and moves with you throughout the day — perfect for casual outings or dressed-up occasions.";

const initialProducts = [
  { id: "h1",  sku: "TSH-001", imgKey: "1",  place: "home", homeType: "newarrival", style: "Casual", style2: "Party",  type: "T-shirts", category: "T-shirts", name: "T-shirt with Tape Details",        stars: 4.5, rating: 4.5, price: 120, cost: 120, discount: 0,  stock: 45, description: DESC, colors: ["10", "9", "4", "6"] },
  { id: "h2",  sku: "JEA-002", imgKey: "2",  place: "home", homeType: "newarrival", style: "Formal", style2: "Casual", type: "Jeans",    category: "Jeans",    name: "Skinny Fit Jeans",                 stars: 3.5, rating: 3.5, price: 240, cost: 240, discount: 20, stock: 30, description: DESC, colors: ["4", "9", "3", "2"] },
  { id: "h3",  sku: "SHI-003", imgKey: "3",  place: "home", homeType: "newarrival", style: "Formal", style2: "Party",  type: "Shirts",   category: "Shirts",   name: "Checkered Shirt",                  stars: 4.5, rating: 4.5, price: 180, cost: 180, discount: 0,  stock: 25, description: DESC, colors: ["10", "1", "9", "3"] },
  { id: "h4",  sku: "TSH-004", imgKey: "4",  place: "home", homeType: "newarrival", style: "Casual", style2: "Party",  type: "T-shirts", category: "T-shirts", name: "Sleeve Striped T-shirt",           stars: 4.5, rating: 4.5, price: 130, cost: 130, discount: 30, stock: 60, description: DESC, colors: ["10", "8", "7", "5"] },
  { id: "h5",  sku: "SHI-005", imgKey: "5",  place: "home", homeType: "topselling", style: "Formal", style2: "",       type: "Shirts",   category: "Shirts",   name: "Vertical Striped Shirt",           stars: 5.0, rating: 5.0, price: 212, cost: 212, discount: 20, stock: 40, description: DESC, colors: ["7", "10", "8", "3"] },
  { id: "h7",  sku: "TSH-006", imgKey: "6",  place: "home", homeType: "topselling", style: "Casual", style2: "Party",  type: "T-shirts", category: "T-shirts", name: "Courage Graphic T-shirt",          stars: 4.0, rating: 4.0, price: 145, cost: 145, discount: 0,  stock: 35, description: DESC, colors: ["9", "2", "11", "12"] },
  { id: "h8",  sku: "SHO-007", imgKey: "7",  place: "home", homeType: "topselling", style: "Party",  style2: "",       type: "Shorts",   category: "Shorts",   name: "Loose Fit Bermuda Shorts",         stars: 4.5, rating: 4.5, price: 240, cost: 240, discount: 20, stock: 20, description: DESC, colors: ["9", "4", "7"] },
  { id: "h9",  sku: "SHO-008", imgKey: "15", place: "home", homeType: "topselling", style: "Party",  style2: "",       type: "Shorts",   category: "Shorts",   name: "Relaxed Fit Twill Utility Shorts", stars: 5.0, rating: 5.0, price: 260, cost: 260, discount: 10, stock: 18, description: DESC, colors: ["1", "9", "10"] },
  { id: "h10", sku: "JEA-009", imgKey: "8",  place: "home", homeType: "topselling", style: "Formal", style2: "",       type: "Jeans",    category: "Jeans",    name: "Faded Skinny Jeans",               stars: 4.5, rating: 4.5, price: 210, cost: 210, discount: 0,  stock: 22, description: DESC, colors: ["4", "9"] },
  { id: "h11", sku: "TSH-010", imgKey: "9",  place: "home", homeType: "onsale",     style: "Casual", style2: "Party",  type: "T-shirts", category: "T-shirts", name: "One Life Graphic T-shirt",         stars: 4.5, rating: 4.5, price: 260, cost: 260, discount: 40, stock: 55, description: DESC, colors: ["11", "9", "6", "1"] },
  { id: "h12", sku: "TSH-011", imgKey: "11", place: "home", homeType: "onsale",     style: "Casual", style2: "",       type: "T-shirts", category: "T-shirts", name: "Polo with Contrast Trims",         stars: 4.0, rating: 4.0, price: 212, cost: 212, discount: 20, stock: 38, description: DESC, colors: ["10", "3", "4", "9"] },
  { id: "h15", sku: "TSH-012", imgKey: "14", place: "home", homeType: "onsale",     style: "Casual", style2: "",       type: "T-shirts", category: "T-shirts", name: "Black Striped T-shirt",            stars: 5.0, rating: 5.0, price: 120, cost: 120, discount: 30, stock: 50, description: DESC, colors: ["9", "10", "2", "4"] },
  { id: "s6",  sku: "TSH-013", imgKey: "12", place: "shop", style: "Casual", style2: "",       type: "T-shirts", category: "T-shirts", name: "Gradient Graphic T-shirt",         stars: 3.5, rating: 3.5, price: 145, cost: 145, discount: 0,  stock: 15, description: DESC, colors: ["12", "8", "6", "11"] },
  { id: "s7",  sku: "TSH-014", imgKey: "13", place: "shop", style: "Casual", style2: "",       type: "T-shirts", category: "T-shirts", name: "Polo with Tipping Details",        stars: 4.5, rating: 4.5, price: 180, cost: 180, discount: 0,  stock: 28, description: DESC, colors: ["10", "4", "9", "7"] },
];

const initialCategories = [
  { id: "cat-1", name: "T-shirts", slug: "t-shirts", productCount: 7, status: "Active" },
  { id: "cat-2", name: "Shirts", slug: "shirts", productCount: 2, status: "Active" },
  { id: "cat-3", name: "Jeans", slug: "jeans", productCount: 2, status: "Active" },
  { id: "cat-4", name: "Shorts", slug: "shorts", productCount: 2, status: "Active" },
  { id: "cat-5", name: "Hoodies", slug: "hoodies", productCount: 0, status: "Active" },
];

export async function seedDatabase() {
  await connectDB();
  console.log('[Seed] Seeding database...');

  // Upsert products
  for (const p of initialProducts) {
    const fullProduct = {
      ...p,
      image: getImgUrl(p.imgKey),
      status: p.stock > 10 ? 'In Stock' : p.stock > 0 ? 'Low Stock' : 'Out of Stock',
    };
    await Product.findOneAndUpdate({ id: p.id }, fullProduct, { upsert: true, new: true });
  }
  console.log(`[Seed] Seeded ${initialProducts.length} products`);

  // Upsert categories
  for (const c of initialCategories) {
    await Category.findOneAndUpdate({ id: c.id }, c, { upsert: true, new: true });
  }
  console.log(`[Seed] Seeded ${initialCategories.length} categories`);

  // Initial demo customer
  await Customer.findOneAndUpdate(
    { email: 'customer@shop.co' },
    {
      id: 'cust-demo',
      name: 'Ahmed Khan',
      email: 'customer@shop.co',
      phone: '+92 300 1234567',
      address: 'House #42, Street 7, F-10/2, Islamabad',
      city: 'Islamabad',
      ordersCount: 0,
      totalSpent: 0,
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0],
    },
    { upsert: true }
  );

  // Settings
  await Settings.findOneAndUpdate(
    {},
    {
      storeName: 'SHOP.CO',
      supportEmail: 'admin@shop.co',
      currency: 'PKR (Rs.)',
      timezone: 'UTC+05:00 (Pakistan Standard Time)',
      orderAlerts: true,
      lowStockAlerts: true,
      customerSignups: true,
      stripeEnabled: true,
      paypalEnabled: true,
      codEnabled: true,
    },
    { upsert: true }
  );

  // Initial Activity
  await Activity.findOneAndUpdate(
    { id: 'act-init' },
    {
      id: 'act-init',
      type: 'store',
      title: 'Store launched with MongoDB Atlas',
      description: 'Connected live database with full catalog & real-time sync',
      time: 'Just now',
    },
    { upsert: true }
  );

  console.log('[Seed] Database seeding completed successfully!');
}

if (process.argv[1]?.endsWith('seed.js')) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('[Seed Error]:', err);
      process.exit(1);
    });
}
