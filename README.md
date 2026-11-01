# SHOP.CO — Full E-Commerce Platform

A modern full-stack e-commerce store with real-time MongoDB Atlas integration, customer authentication, shopping cart, dynamic product catalog, and seamless order synchronization with the SHOP.CO Admin Dashboard.

---

## 🌟 Key Features

- **Live MongoDB Atlas Integration**: Products, customers, and orders stored in MongoDB Atlas cloud database.
- **Customer Authentication**: Customers can Register and Sign In before placing orders. Customer profiles are immediately synchronized to the Admin Dashboard.
- **Dynamic Products**: All products (New Arrivals, Top Selling, On Sale, Shop Catalog) are fetched live from MongoDB. Products created, updated, or deleted from the dashboard update here in real-time.
- **Smart Cart & Checkout**:
  - Add to cart with color and size selection.
  - Promo code discounts (`Moemen` for 20% off).
  - Secure checkout modal collecting shipping address, city, contact number, and payment method (Cash on Delivery or Card).
  - Orders immediately appear in the Admin Dashboard!
- **Dual Runtime Support**:
  - Run locally with Express backend + Vite frontend.
  - 1-click Serverless deployment to Vercel with `vercel.json` and `api/index.js`.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+ or v20+)
- npm or pnpm

### 2. Environment Setup
The project is already pre-configured to connect to MongoDB Atlas. You can also edit `.env`:
```env
MONGODB_URI=mongodb+srv://javedabuzar969_db_user:Bi3OVZk6Ck6TyyuC@cluster0.q6nn75c.mongodb.net/shopco?retryWrites=true&w=majority&appName=Cluster0
PORT=5000
VITE_API_URL=http://localhost:5000/api/v1
```

### 3. Installation
```bash
npm install
```

### 4. Seed the Database
Populate the initial catalog of 14+ products and categories into MongoDB Atlas:
```bash
npm run seed
```

### 5. Run Locally
Start the backend API server:
```bash
npm run server
```

In a second terminal, start the Vite frontend:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 Deploying to Vercel

1. Push this repository to GitHub: `https://github.com/javedabuzar969/shopco.git`.
2. Go to [Vercel](https://vercel.com) and click **Add New Project**.
3. Import the `shopco` repository.
4. Add the Environment Variable in Vercel Project Settings:
   - `MONGODB_URI` = `mongodb+srv://javedabuzar969_db_user:Bi3OVZk6Ck6TyyuC@cluster0.q6nn75c.mongodb.net/shopco?retryWrites=true&w=majority&appName=Cluster0`
5. Click **Deploy**. Vercel will deploy both the static frontend and the `/api` backend serverlessly on the same domain!

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons, React Router
- **Backend**: Node.js, Express.js, Mongoose, CORS, Dotenv
- **Database**: MongoDB Atlas Cluster